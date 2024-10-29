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

    const { mutate, error, isLoading } = useMutation("change-password", UserApi.changePassword);

    const passwordForm = useFormik({
        initialValues: {
            current_password: '',
            password: '',
            confirm_password: '',
        },
        validationSchema: Yup.object().shape({
            current_password: Yup.string().required('Current Password is required'),
            password: Yup.string().required('New Password is required').min(8, 'Password must be at least 8 characters'),
            confirm_password: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required'),
        }),
        onSubmit: values => {
            mutate(values, {
                onSuccess: ({ data }) => {
                    notifySuccess(data.message.success)
                },
                onError: () => {
                    notifyError(error.message.error)
                }
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
                                        value={passwordForm.values.confirm_password}
                                        type="password" 
                                        className={`form--control form-control ${passwordForm.errors.confirm_password && passwordForm.touched.confirm_password ? 'border border-danger' : ''}`}
                                        name="confirm_password"/>
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