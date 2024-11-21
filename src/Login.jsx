import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { setIsLoggedIn, setProfile } from "./lib/redux/slices/global"
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AppLayout from "./layout/AppLayout";
import { useMutation } from "react-query";
import { AuthApi } from "./lib/hooks/Auth";
import { CircularProgress } from "@mui/material";
import { notifyError, notifySuccess } from "./util/custom-functions";

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation("login", AuthApi.login);

  const loginForm = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Username or email is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: values => {
      mutate(values, {
        onSuccess: ({ data }) => {
          if (data.status == 'success') {
            data.message.success.forEach((message) => {
              notifySuccess(message)
            })
            localStorage.setItem('token', data.data.access_token)
            dispatch(setProfile(data.data.user));
            dispatch(setIsLoggedIn(true));
            navigate('/dashboard/welcome');
          } else if (data.status == 'error') {
            data.message.error.forEach((error) => {
              notifyError(error)
            })
          }
        },
        onError: (error) => {
          console.log(error)
          notifyError(error.message.error)
        }
      })
    }
  })

  return (
    <AppLayout>
      <section className="account">
        <div className="account__left flex-align auth-bg-img" data-background-image="assets/images/account-bg.png">
          <div className="account__thumb">
            <img className="" src="assets/images/64f85aa4e4c9a1693997732.png" alt="" />
          </div>
        </div>
        <div className="d-flex flex-wrap account__right flex-align">
          <div className="account__form">
            <div className="account-form">
              <div className="site-logo">
                <a href=""> <img src="" alt="" /></a>
              </div>
              <div className="section-heading style-left">
                <h6 className="section-heading__subtitle">Sign In</h6>
                <h3 className="section-heading__title">Welcome Back!</h3>
              </div>
              <form method="POST" className="verify-gcaptcha" onSubmit={loginForm.handleSubmit}>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="username" className="form--label">Username or Email</label>
                      <input
                        onChange={loginForm.handleChange}
                        onBlur={loginForm.handleBlur}
                        value={loginForm.values.username}
                        type="text"
                        name="username"
                        className={`form--control ${loginForm.errors.username && loginForm.touched.username ? 'border border-danger' : ''}`}
                        id="username" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="your-password" className="form--label">Password</label>
                      <input
                        onChange={loginForm.handleChange}
                        onBlur={loginForm.handleBlur}
                        value={loginForm.values.password}
                        id="your-password"
                        type="password"
                        className={`form--control ${loginForm.errors.password && loginForm.touched.password ? 'border border-danger' : ''}`}
                        name="password" />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="d-flex form-group flex-wrap justify-content-between">
                      <div className="form--check">
                        <input className="form-check-input" type="checkbox" name="remember" id="remember" />
                        <label className="form-check-label" htmlFor="remember">Remember me</label>
                      </div>
                      <Link to="/forgotten-password" className="forgot-password text--base">Forgot Password?</Link>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group">
                      <button type="submit" id="recaptcha" className="btn btn--base w-100" disabled={isLoading}> {
                        isLoading ? <CircularProgress size={20} color="inherit" /> : 'Sign In'}</button>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="have-account text-center">
                      <p className="have-account__text">Don&rsquo;t Have An Account?
                        <Link to="/register" className="have-account__link text--base">&nbsp;Create an Account</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  )
}

export default Login
