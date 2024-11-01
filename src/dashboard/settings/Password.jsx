/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux"
import MasterLayout from "../../layout/MasterLayout"
import { setPageTitle } from "../../lib/redux/slices/global"
import { useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from 'yup';
import { useMutation } from "react-query"
import { UserApi } from "../../lib/hooks/User"
import { CircularProgress } from "@mui/material";
import { notifyError, notifySuccess } from "../../util/custom-functions"

const Password = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle('Change Password'))
    }, [])

    const { mutate, isLoading } = useMutation("change-password", UserApi.changePassword);

    const passwordForm = useFormik({
        initialValues: {
            current_password: '',
            password: '',
            password_confirmation: '',
        },
        validationSchema: Yup.object().shape({
            current_password: Yup.string().required('Current Password is required'),
            password: Yup.string().required('New Password is required').min(8, 'Password must be at least 8 characters'),
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
                    } else {
                        data.message.success.forEach((message) => {
                            notifySuccess(message)
                        })
                    }
                },
            })
        }
    })

    return (
        <MasterLayout>
            <div className="row justify-content-center mt-4">
                <div className="col-md-8">
                    <div className="card custom--card">
                        <div className="card-body">
                            <form className="register" method="post" onSubmit={passwordForm.handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Current Password</label>
                                    <input
                                        onChange={passwordForm.handleChange}
                                        onBlur={passwordForm.handleBlur}
                                        value={passwordForm.values.current_password}
                                        className={`form--control form-control ${passwordForm.errors.current_password && passwordForm.touched.current_password ? 'border border-danger' : ''}`}
                                        name="current_password" type="password" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Password</label>
                                    <input
                                        onChange={passwordForm.handleChange}
                                        onBlur={passwordForm.handleBlur}
                                        value={passwordForm.values.password}
                                        className={`form--control form-control ${passwordForm.errors.password && passwordForm.touched.password ? 'border border-danger' : ''}`}
                                        name="password"
                                        type="password" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Confirm Password</label>
                                    <input
                                        onChange={passwordForm.handleChange}
                                        onBlur={passwordForm.handleBlur}
                                        value={passwordForm.values.password_confirmation}
                                        type="password"
                                        className={`form--control form-control ${passwordForm.errors.password_confirmation && passwordForm.touched.password_confirmation ? 'border border-danger' : ''}`}
                                        name="password_confirmation" />
                                </div>
                                <button className="btn btn--base w-100" type="submit" disabled={isLoading}>
                                    {
                                        isLoading ? <CircularProgress size={20} color="inherit" /> : 'Change Password'
                                    }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export default Password