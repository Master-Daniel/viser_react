/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import MasterLayout from '../../layout/MasterLayout'
import Tab from './Tab'
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../lib/redux/slices/global';
import { useMutation } from 'react-query';
import { UserApi } from '../../lib/hooks/User';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { notifyError, notifySuccess } from '../../util/custom-functions';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoanPreview = () => {

    const dispatch = useDispatch()
    const navigation = useNavigate()
    const { loanPlan } = useSelector((state) => state.global)

    useEffect(() => {
        console.log(loanPlan)
        dispatch(setPageTitle('Apply for loan'))
    }, []);

    const { mutate, isLoading } = useMutation('loan-confirm', UserApi.loanConfirm)

    const loanForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            amount: loanPlan.amount
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is required'),
            email: Yup.string().required('Email is required')
        }),
        onSubmit: values => {
            mutate({url: `/loan/confirm/${loanPlan.plan.id}`, data: values}, {
                onSuccess: ({ data }) => {
                    if (data.status == 'error') {
                        data.message.error.forEach((error) => {
                            notifyError(error)
                        })
                    } else if (data.status == 'success') {
                        data.message.success.forEach((message) => {
                            notifySuccess(message)
                            navigation('/dashboard/loan/list')
                        })
                    }
                }
            })
        }
    })
    
    return (
        <MasterLayout>
            <Tab />
            <div className="row gy-4">
                <div className="col-xl-4">
                    <div className="card custom--card">
                        <div className="card-body">
                            <h5 className="text-center">You are applying to take loan</h5>
                            <p className="text-center text--danger">(Be Sure Before Confirm)</p>
                            <ul>
                                <li className="pricing-card__list flex-between">
                                    <span className="fw-bold">Plan Name</span>
                                    <span>{loanPlan.plan.name}</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span className="fw-bold">Loan Amount</span>
                                    <span>${Number(loanPlan.amount).toFixed(2)}</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span className="fw-bold">Total Installment</span>
                                    <span>{loanPlan.plan.total_installment}</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span className="fw-bold">Per Installment</span>
                                    <span>${Number(loanPlan.plan.per_installment).toFixed(2)}</span>
                                </li>
                                <li className="pricing-card__list flex-between text--danger">
                                    <span className="fw-bold">You Need To Pay</span>
                                    <span className="fw-bold">${Number(loanPlan.plan.fixed_charge)}</span>
                                </li>
                            </ul>
                            <p className="p-2">
                                <small className="text--danger">*If an installment is delayed for <span className="fw-bold">1</span> or more days then, an amount of, <span className="fw-bold">$5.00</span> will be applied for each day.                            </small>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-8">
                    <div className="card custom--card">
                        <div className="card-header">
                            <h5 className="card-title">Application Form</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={loanForm.handleSubmit} method="post" encType="multipart/form-data">
                                <div className="form-group">
                                    <p className="rounded p-3">
                                        <span style={{ color: 'rgb(33, 37, 41)', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bolder' }}>
                                            <font size="5">Please follow the below instruction</font>
                                        </span>
                                        <span style={{ color: 'rgb(33, 37, 41)', fontFamily: 'Montserrat, sans-serif', }}>:</span>
                                        <br />
                                    </p>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label form--label">Name</label>
                                            <input 
                                                onChange={loanForm.handleChange}
                                                onBlur={loanForm.handleBlur}
                                                value={loanForm.values.name}
                                                type="text" 
                                                className={`form-control form--control ${loanForm.errors.name && loanForm.touched.name ? 'border border-danger' : ''}`} 
                                                name="name" 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label form--label">Email</label>
                                            <input
                                                onChange={loanForm.handleChange}
                                                onBlur={loanForm.handleBlur}
                                                value={loanForm.values.email} 
                                                type="email" 
                                                className={`form-control form--control ${loanForm.errors.email && loanForm.touched.email ? 'border border-danger' : ''}`} 
                                                name="email"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn--base w-100">
                                    {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Apply'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export default LoanPreview