/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import MasterLayout from "../../layout/MasterLayout"
import Tab from "./Tab"
import { setPageTitle } from "../../lib/redux/slices/global"
import { useEffect, useState } from "react"
import { UserApi } from "../../lib/hooks/User"
import { useMutation, useQuery } from "react-query"
import { useFormik } from "formik"
import * as Yup from 'yup';
import { notifyError, notifySuccess } from "../../util/custom-functions"
import { CircularProgress } from "@mui/material"
import { useNavigate } from "react-router-dom"

const WireTransfer = () => {

    const dispatch = useDispatch()
    const [wireData, setWireData] = useState([])
    const { profile } = useSelector((state) => state.global)
    const navigate = useNavigate()

    const { refetch } = useQuery('fetch-wire-form', UserApi.fetchWireTransferData, {
        onSuccess: ({ data }) => {
            if (data.status == 'success') {
                setWireData(data.data.setting)
            }
        }
    })

    useEffect(() => {
        refetch()
        dispatch(setPageTitle('Wire Transfer'))
    }, [])

    const { mutate, isLoading } = useMutation("wire-transfer", UserApi.wireTransfer);

    const wireForm = useFormik({
        initialValues: {
            amount: '',
            account_name: '',
            account_number: '',
            bank_name: '',
            auth_mode: '',
        },
        onSubmit: values => {
            mutate(values, {
                onSuccess: ({ data }) => {
                    console.log(data)
                    if (data.status == 'error') {
                        data.message.error.forEach((error) => {
                            notifyError(error)
                        })
                    } else {
                        data.message.success.forEach((message) => {
                            notifySuccess(message)
                            wireForm.resetForm()
                        })
                        navigate(`/otp-verification/${data.data.otpId}/wire-transfer/confirm`)
                    }
                }
            })
        }
    })

    return (
        <MasterLayout>
            <Tab />
            <div className="row gy-4 justify-content-center">
                <div className="col-xl-4">
                    <div className="card custom--card">
                        <div className="card-body">
                            <h6 className="card-title text-center">Transfer Limit</h6>
                            <ul>
                                <li className="pricing-card__list flex-between">
                                    <span>Minimum Per Transaction</span>
                                    <span className="fw-bold">${Number(wireData.minimum_limit).toFixed(2)}</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span>Maximum Per Transaction</span>
                                    <span className="fw-bold">${Number(wireData.maximum_limit).toFixed(2)}</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span>Daily Maximum</span>
                                    <span className="fw-bold">${Number(wireData.daily_maximum_limit).toFixed(2)}</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span>Monthly Maximum</span>
                                    <span className="fw-bold">${Number(wireData.monthly_maximum_limit).toFixed(2)}</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span>Daily Maximum Transaction</span>
                                    <span className="fw-bold">{wireData.daily_total_transaction}</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span> Monthly Maximum Transaction</span>
                                    <span className="fw-bold">{wireData.monthly_total_transaction}</span>
                                </li>
                            </ul>
                            <small className="text--danger">* Charge {wireData.percent_charge}%</small>
                        </div>
                    </div>

                    <div className="card custom--card mt-3">
                        <div className="card-body">
                            <h6 className="card-title text-center">Instruction</h6>
                            <p><div style={{ textAlign: 'left' }}><br />{wireData.instruction}</div></p>
                        </div>
                    </div>
                </div>

                <div className="col-xl-8">
                    <div className="card custom--card">
                        <div className="card-body">
                            <div className="text-center">
                                <div style={{ textAlign: 'left' }}><br /></div>
                            </div>
                            <form method="POST" onSubmit={wireForm.handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Amount</label>
                                    <div className="input-group custom-input-group">
                                        <input
                                            type="number"
                                            step="any"
                                            onChange={wireForm.handleChange}
                                            onBlur={wireForm.handleBlur}
                                            value={wireForm.values.amount}
                                            className={`form--control form-control ${wireForm.errors.amount && wireForm.touched.amount ? 'border border-danger' : ''}`}
                                            name="amount" />
                                        <span className="input-group-text">USD</span>
                                    </div>
                                    <span className="fw-bold  text--info ">Current Balance: {profile.balance}</span>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label form--label">Account Name   </label>
                                            <input
                                                type="text"
                                                onChange={wireForm.handleChange}
                                                onBlur={wireForm.handleBlur}
                                                value={wireForm.values.account_name}
                                                className={`form--control form-control ${wireForm.errors.account_name && wireForm.touched.account_name ? 'border border-danger' : ''}`}
                                                name="account_name" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label form--label">Account Number   </label>
                                            <input
                                                type="text"
                                                onChange={wireForm.handleChange}
                                                onBlur={wireForm.handleBlur}
                                                value={wireForm.values.account_number}
                                                className={`form--control form-control ${wireForm.errors.account_number && wireForm.touched.account_number ? 'border border-danger' : ''}`}
                                                name="account_number" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label form--label">Bank Name</label>
                                            <input
                                                type="text"
                                                onChange={wireForm.handleChange}
                                                onBlur={wireForm.handleBlur}
                                                value={wireForm.values.bank}
                                                className={`form--control form-control ${wireForm.errors.bank && wireForm.touched.bank ? 'border border-danger' : ''}`}
                                                name="bank" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mt-0">
                                    <label htmlFor="verification" className="form-label">Authorization Mode</label>
                                    <select
                                        name="auth_mode"
                                        id="verification"
                                        onChange={wireForm.handleChange}
                                        onBlur={wireForm.handleBlur}
                                        value={wireForm.values.auth_mode}
                                        className={`form--control form-control ${wireForm.errors.auth_mode && wireForm.touched.auth_mode ? 'border border-danger' : ''}`}>
                                        <option value="">Select One</option>
                                        <option value="email">Email</option>
                                        <option value="sms">SMS</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn--base w-100" disabled={isLoading}>
                                    {
                                        isLoading ? <CircularProgress size={20} color="inherit" /> : 'Submit'
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

export default WireTransfer