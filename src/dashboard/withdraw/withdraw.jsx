/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "react-query";
import MasterLayout from "../../layout/MasterLayout"
import { UserApi } from "../../lib/hooks/User";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from 'yup';

const Withdraw = () => {

    const [methods, setMethods] = useState([])
    const { profile } = useSelector((state) => state.global)

    const { refetch } = useQuery('withdraw-methods', UserApi.withdrawMethods, {
        onSuccess: ({ data }) => {
            setMethods(data.data.withdraw_method)
        },
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        refetch()
    }, [])

    const withdrawForm = useFormik({
        initialValues: {
            amount: 0,
        }, 
        validationSchema: Yup.object().shape({
            amount: Yup.string().required('Amount is required')
        }),
        onSubmit: values => {
            console.log(values)
        }
    })

    return (
        <MasterLayout>
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <form method="post" className="withdraw-form" onSubmit={withdrawForm.handleSubmit}>
                        <div className="gateway-card">
                            <div className="row justify-content-center gy-sm-4 gy-3">
                                <div className="col-xxl-4 col-xl-5">
                                    <div className="payment-system-list is-scrollable gateway-option-list">
                                        {
                                            methods.map((method, index) => (
                                                <label key={index} htmlFor="bank_wire" className="payment-item  gateway-option">
                                                    <div className="payment-item__info">
                                                        <span className="payment-item__check"></span>
                                                        <span className="payment-item__name">{method.name}</span>
                                                    </div>
                                                    <div className="payment-item__thumb">
                                                        <img className="payment-item__thumb-img" src="assets/images/default.png" alt="payment-thumb" />
                                                    </div>
                                                    <input className="payment-item__radio gateway-input" id="bank_wire" hidden />
                                                </label>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="col-xxl-6 col-xl-7">
                                    <div className="card custom--card mb-3">
                                        <div className="card-body">
                                            <h6 className="mb-3 text-end">Current Balance: {profile.balance}</h6>
                                            <div className="input-group">
                                                <span className="input-group-text">$</span>
                                                <input type="number" className="form-control form--control amount" name="amount" placeholder="Enter Amount" value="" autoComplete="off" />
                                            </div>
                                            <small className="text-muted"> Limit: <span className="gateway-limit">0.00</span></small>
                                        </div>
                                    </div>
                                    <div className="card custom--card">
                                        <div className="card-body">
                                            <div className="form-group mt-0">
                                                <label htmlFor="verification" className="form-label">Authorization Mode</label>
                                                <select onChange={withdrawForm.handleChange} name="auth_mode" id="verification" className="form--control select" required>
                                                    <option value="">Select One</option>
                                                    <option value="0">Email</option>
                                                    <option value="1">SMS</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn--base w-100 mt-3" disabled>
                                        Confirm Withdraw
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </MasterLayout>
    )
}

export default Withdraw