import { useFormik } from "formik"
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AppLayout from "./layout/AppLayout";
import { useMutation } from "react-query";
import { AuthApi } from "./lib/hooks/Auth";
import { CircularProgress } from "@mui/material";
import { notifyError } from "./util/custom-functions";

const Register = () => {

    const navigate = useNavigate();

    const { mutate, error, isLoading } = useMutation("register", AuthApi.register);

    const registerFormik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: ''
        },
        validationSchema: Yup.object().shape({
            first_name: Yup.string().required('First name is required'),
            last_name: Yup.string().required('Last name is required'),
            email: Yup.string().email('Please enter a valid email address').required('Email address is required'),
            password: Yup.string().required('Password is required').min(8, 'Password must be at lease 8 characters'),
            confirm_password: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required'),
        }),
        onSubmit: values => {
            mutate(values, {
                onSuccess: ({ data }) => {
                    navigate('/dashboard/welcome');
                },
                onError: (error) => {
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
                                <h6 className="section-heading__subtitle">Register</h6>
                                <h3 className="section-heading__title">Create New Account</h3>
                            </div>
                            <form method="POST" onSubmit={registerFormik.handleSubmit}>
                                <div className="row">
                                    <div className="col-sm-6 col-xsm-6">
                                        <div className="form-group">
                                            <label className="form-label">First Name</label>
                                            <input 
                                                onChange={registerFormik.handleChange}
                                                onBlur={registerFormik.handleBlur}
                                                value={registerFormik.values.first_name}
                                                type="text" 
                                                className={`form--control ${registerFormik.errors.first_name && registerFormik.touched.first_name ? 'border border-danger' : ''}`} 
                                                id="first_name"
                                                name="first_name" />
                                        </div>
                                    </div>

                                    <div className="col-sm-6 col-xsm-6">
                                        <div className="form-group">
                                            <label className="form-label">Last Name</label>
                                            <input 
                                                onChange={registerFormik.handleChange}
                                                onBlur={registerFormik.handleBlur}
                                                value={registerFormik.values.last_name}
                                                id="last_name"
                                                type="text" 
                                                className={`form--control ${registerFormik.errors.last_name && registerFormik.touched.last_name ? 'border border-danger' : ''}`} 
                                                name="last_name" />
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="email">Email Address</label>
                                            <input 
                                                onChange={registerFormik.handleChange}
                                                onBlur={registerFormik.handleBlur}
                                                value={registerFormik.values.email}
                                                type="email" 
                                                name="email" 
                                                id="email" 
                                                className={`form--control checkUser ${registerFormik.errors.email && registerFormik.touched.email ? 'border border-danger' : ''}`} />
                                        </div>
                                    </div>

                                    <div className="col-sm-6 col-xsm-6">
                                        <div className="form-group">
                                            <label htmlFor="yourPassword" className="form-label">Password</label>
                                            <input 
                                                onChange={registerFormik.handleChange}
                                                onBlur={registerFormik.handleBlur}
                                                value={registerFormik.values.password}
                                                name="password" 
                                                id="yourPassword" 
                                                type="password" 
                                                className={`form--control checkUser ${registerFormik.errors.password && registerFormik.touched.password ? 'border border-danger' : ''}`} />
                                        </div>
                                    </div>

                                    <div className="col-sm-6 col-xsm-6">
                                        <div className="form-group">
                                            <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
                                            <input 
                                                onChange={registerFormik.handleChange}
                                                onBlur={registerFormik.handleBlur}
                                                value={registerFormik.values.confirm_password}
                                                id="confirm_password" 
                                                name="confirm_password"
                                                type="password" 
                                                className={`form--control ${registerFormik.errors.confirm_password && registerFormik.touched.confirm_password ? 'border border-danger' : ''}`} />
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
                                            <p className="have-account__text">Already Have An Account?
                                                <Link to="/" className="have-account__link text--base">&nbsp;Login</Link>
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

export default Register
