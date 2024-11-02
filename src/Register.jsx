import { useFormik } from "formik"
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AppLayout from "./layout/AppLayout";
import { useMutation } from "react-query";
import { AuthApi } from "./lib/hooks/Auth";
import { CircularProgress } from "@mui/material";
import { notifyError, notifySuccess } from "./util/custom-functions";
import countries from './assets/countries.json';
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setProfile } from "./lib/redux/slices/global";

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { mutate, error, isLoading } = useMutation("register", AuthApi.register);

    const registerFormik = useFormik({
        initialValues: {
            username: '',
            email: '',
            mobile: '',
            mobile_code: '',
            country: '',
            country_code: '',
            password: '',
            agree: false,
            password_confirmation: ''
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required('Username is required'),
            mobile: Yup.string().required('Phone number is required'),
            country: Yup.string().required('Country is required'),
            email: Yup.string().email('Please enter a valid email address').required('Email address is required'),
            agree: Yup.boolean().oneOf([true], 'Kindly accept out terms and conditions'),
            password: Yup.string().required('Password is required').min(8, 'Password must be at lease 8 characters'),
            password_confirmation: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required'),
        }),
        onSubmit: values => {
            mutate(values, {
                onSuccess: ({ data }) => {
                    if (data.status == 'error') {
                        data.message.error.forEach((error) => {
                            notifyError(error)
                        })
                    } else if (data.status == 'success') {
                        localStorage.setItem('token', data.data.access_token)
                        dispatch(setProfile(data.data.user));
                        dispatch(setIsLoggedIn(true));
                        data.message.success.forEach((message) => {
                            notifySuccess(message)
                        })
                        navigate('/dashboard/welcome');
                    }
                },
            })
        }
    })

    const handleSelectedCountry = (e) => {
        const selectedOption = e.target.selectedOptions[0];
        registerFormik.setFieldValue('country', e.target.value)
        registerFormik.setFieldValue('country_code', selectedOption.getAttribute('data-code'))
        registerFormik.setFieldValue('mobile_code', selectedOption.getAttribute('data-dial_code'))
    }

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
                                            <label className="form-label">Username</label>
                                            <input
                                                onChange={registerFormik.handleChange}
                                                onBlur={registerFormik.handleBlur}
                                                value={registerFormik.values.username}
                                                type="text"
                                                className={`form--control ${registerFormik.errors.username && registerFormik.touched.username ? 'border border-danger' : ''}`}
                                                id="username"
                                                name="username" />
                                        </div>
                                    </div>

                                    <div className="col-sm-6 col-xsm-6">
                                        <div className="form-group">
                                            <label className="form-label">Phone Number</label>
                                            <input
                                                onChange={registerFormik.handleChange}
                                                onBlur={registerFormik.handleBlur}
                                                value={registerFormik.values.mobile}
                                                id="mobile"
                                                type="text"
                                                className={`form--control ${registerFormik.errors.mobile && registerFormik.touched.mobile ? 'border border-danger' : ''}`}
                                                name="mobile" />
                                        </div>
                                    </div>

                                    <div className="col-sm-6 col-xsm-6">
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
                                            <label className="form-label" htmlFor="email">Country</label>
                                            <select
                                                onChange={(e) => handleSelectedCountry(e)}
                                                onBlur={registerFormik.handleBlur}
                                                name="country"
                                                id="country"
                                                className={`form--control checkUser ${registerFormik.errors.country && registerFormik.touched.country ? 'border border-danger' : ''}`}>
                                                <option>Select Country</option>
                                                {countries.map((country) => (
                                                    <option key={country.code} value={country.name} data-code={country.code} data-dial_code={country.dial_code}>
                                                        {country.name}
                                                    </option>
                                                ))}
                                            </select>
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
                                                value={registerFormik.values.password_confirmation}
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                type="password"
                                                className={`form--control ${registerFormik.errors.password_confirmation && registerFormik.touched.password_confirmation ? 'border border-danger' : ''}`} />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="d-flex form-group flex-wrap justify-content-between">
                                            <div className="form--check">
                                                <input onChange={registerFormik.handleChange} className={`form-check-input ${registerFormik.errors.agree && registerFormik.touched.agree ? 'border border-danger' : ''}`} type="checkbox" name="agree" id="agree" />
                                                <label className="form-check-label" htmlFor="agree">I agree with Company Policy , Privacy Policy , Terms of Service</label>
                                            </div>
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
