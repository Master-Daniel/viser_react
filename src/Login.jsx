import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { setIsLoggedIn } from "./lib/redux/slices/global"
import { useNavigate } from 'react-router-dom';
import AppLayout from "./layout/AppLayout";

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      console.log(values)
      dispatch(setIsLoggedIn(true));
      navigate('/dashboard/welcome');
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
              <form method="POST" className="verify-gcaptcha" onSubmit={loginFormik.handleSubmit}>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="username" className="form--label">Username or Email</label>
                      <input type="text" name="username" className="form--control" id="username" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="your-password" className="form--label">Password</label>
                      <input id="your-password" type="password" className="form--control" name="password" />
                    </div>
                  </div>

                  {/* <x-captcha /> */}

                  <div className="col-12">
                    <div className="d-flex form-group flex-wrap justify-content-between">
                      <div className="form--check">
                        <input className="form-check-input" type="checkbox" name="remember" id="remember" />
                        <label className="form-check-label" htmlFor="remember">Remember me</label>
                      </div>
                      <a href="{{ route('user.password.request') }}" className="forgot-password text--base">Forgot Password?</a>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group">
                      <button type="submit" id="recaptcha" className="btn btn--base w-100">Sign In</button>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="have-account text-center">
                      <p className="have-account__text">Don&rsquo;t Have An Account?
                        <a href="" className="have-account__link text--base">Create an Account</a>
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
