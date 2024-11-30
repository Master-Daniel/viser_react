import React, { useState } from 'react'
import AppLayout from './layout/AppLayout'
import { CircularProgress } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from 'react-query'
import { UserApi } from './lib/hooks/User'
import { notifyError, notifySuccess } from './util/custom-functions'

const ForgottenPassword = () => {
    const [state, setState] = useState(0)
    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    const { mutate, isLoading } = useMutation('forgotten-password', UserApi.forgottenPassword)
    const { mutate: otpMutate, isLoading: otpIsLoading } = useMutation('forgotten-password', UserApi.passwordOtp)
    const { mutate: resetMutate, isLoading: resetIsLoading } = useMutation('forgotten-password', UserApi.resetPassword)

    const passwordForm = useFormik({
        initialValues: {
            value: ''
        },
        validationSchema: Yup.object().shape({
            value: Yup.string().required()
        }),
        onSubmit: values => {
            mutate(values, {
                onSuccess: ({ data }) => {
                    if (data.status == 'success') {
                        data.message.success.forEach((message) => {
                            notifySuccess(message)
                        })
                        setEmail(data.data.email)
                        setState(1)
                    } else if (data.status == 'error') {
                        data.message.error.forEach((error) => {
                            notifyError(error)
                        })
                    }
                }
            })
        }
    })

    const otpForm = useFormik({
        initialValues: {
            email: '',
            code: ''
        },
        validationSchema: Yup.object().shape({
            code: Yup.string().required()
        }),
        onSubmit: values => {
            values.email = email
            otpMutate(values, {
                onSuccess: ({ data }) => {
                    if (data.status == 'success') {
                        data.message.success.forEach((message) => {
                            notifySuccess(message)
                        })
                        setState(2)
                        setToken(values.code)
                    } else if (data.status == 'error') {
                        data.message.error.forEach((error) => {
                            notifyError(error)
                        })
                    }
                }
            })
        }
    })

    const resetForm = useFormik({
        initialValues: {
            email: '',
            password: '',
            password_confirmation: ''
        },
        validationSchema: Yup.object().shape({
            password: Yup.string().min(8, 'Password must be at least 8 characters').required(),
            password_confirmation: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required')
        }),
        onSubmit: values => {
            values.email = email
            values.token = token
            resetMutate(values, {
                onSuccess: ({ data }) => {
                    if (data.status == 'success') {
                        data.message.success.forEach((message) => {
                            notifySuccess(message)
                        })
                        navigate('/')
                    } else if (data.status == 'error') {
                        data.message.error.forEach((error) => {
                            notifyError(error)
                        })
                    }
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
                                <h6 className="section-heading__subtitle">{state == 0 ? 'Forgotten Password' : state == 1 ? 'Enter OTP' : 'Reset Password'}</h6>
                                <h3 className="section-heading__title">{state == 0 ? 'Request Reset' : state == 1 ? 'Verify Email' : 'Create New Password'}</h3>
                            </div>
                            <form method="POST" className="verify-gcaptcha" onSubmit={
                                state == 0 ? passwordForm.handleSubmit : state == 1 ? otpForm.handleSubmit : resetForm.handleSubmit
                            }>
                                <div className="row">
                                    <div className="col-12">
                                        {
                                            state == 0 ? <div className="form-group">
                                                <label htmlFor="value" className="form--label">Email</label>
                                                <input
                                                    onChange={passwordForm.handleChange}
                                                    onBlur={passwordForm.handleBlur}
                                                    value={passwordForm.values.value}
                                                    type="text"
                                                    name="value"
                                                    className={`form--control ${passwordForm.errors.value && passwordForm.touched.value ? 'border border-danger' : ''}`}
                                                    id="value" />
                                            </div> : state == 1 ? <div className="form-group">
                                                <label htmlFor="code" className="form--label">Enter OTP</label>
                                                <input
                                                    onChange={otpForm.handleChange}
                                                    onBlur={otpForm.handleBlur}
                                                    value={otpForm.values.code}
                                                    type="text"
                                                    name="code"
                                                    className={`form--control ${otpForm.errors.code && otpForm.touched.code ? 'border border-danger' : ''}`}
                                                    id="value" />
                                            </div> : <>
                                                <div className="form-group">
                                                    <label htmlFor="password" className="form--label">New Password</label>
                                                    <input
                                                        onChange={resetForm.handleChange}
                                                        onBlur={resetForm.handleBlur}
                                                        value={resetForm.values.password}
                                                        type="password"
                                                        name="password"
                                                        className={`form--control ${resetForm.errors.password && resetForm.touched.password ? 'border border-danger' : ''}`}
                                                        id="password" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password_confirmation" className="form--label">Confirm Password</label>
                                                    <input
                                                        onChange={resetForm.handleChange}
                                                        onBlur={resetForm.handleBlur}
                                                        value={resetForm.values.password_confirmation}
                                                        type="password"
                                                        name="password_confirmation"
                                                        className={`form--control ${resetForm.errors.password_confirmation && resetForm.touched.password_confirmation ? 'border border-danger' : ''}`}
                                                        id="password_confirmation" />
                                                </div>
                                            </>
                                        }
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <button
                                                type="submit"
                                                id="recaptcha"
                                                className="btn btn--base w-100"
                                                disabled={isLoading || resetIsLoading || otpIsLoading}
                                            >
                                                {
                                                    isLoading ? <CircularProgress size={20} color="inherit" /> :
                                                        resetIsLoading ? <CircularProgress size={20} color="inherit" /> :
                                                        otpIsLoading ? <CircularProgress size={20} color="inherit" /> :
                                                        <>
                                                            { state == 0 ? 'Reset Password' : state == 1 ? 'Verify Email' : 'Create New Password'}
                                                        </>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="have-account text-center">
                                            <p className="have-account__text">Back to
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

export default ForgottenPassword