import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoanPlan, setModalVisible } from '../lib/redux/slices/global';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { UserApi } from '../lib/hooks/User';
import { notifyError } from '../util/custom-functions';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoanPlans = ({ id, title, percentage, duration, minimum, maximum, totalDuration }) => {

    const [modalData, setModalData] = useState({
        id: "",
        minimum: "",
        maximum: "",
        actionUrl: "",
    });
    const { isModalVisible } = useSelector((state) => state.global)
    const dispatch = useDispatch()
    const navigation = useNavigate()

    const handleClick = (e) => {
        const { id, minimum, maximum } = e.currentTarget.dataset;
        setModalData({
            id,
            minimum,
            maximum,
        });
        dispatch(setModalVisible(true));
    };

    const handleClose = () => {
        dispatch(setModalVisible(false));
    };

    const { mutate, isLoading } = useMutation('loan-application', UserApi.loanApplication)

    const loanForm = useFormik({
        initialValues: {
            amount: 0,
        },
        validationSchema: Yup.object().shape({
            amount: Yup.number().required('Amount is required'),
        }),
        onSubmit: values => {
            mutate({ url: `/loan/apply/${modalData.id}`, data: values }, {
                onSuccess: ({ data }) => {
                    if (data.status == 'error') {
                        data.message.error.forEach((error) => {
                            notifyError(error)
                        })
                    } else if (data.status == 'success') {
                        dispatch(setLoanPlan(data.data))
                        handleClose()
                        navigation('/dashboard/loan/application-preview')
                    }
                }
            })
        }
    })

    return (
        <>
            <div className="col-xxl-4 col-sm-6">
                <div className="pricing-card text-center rounded">
                    <div className="pricing-card__header">
                        <div className="pricing-card__overlay"></div>
                        <p className="pricing-card__title">{title}</p>
                        <h2 className="pricing-card__price">
                            {Number(percentage).toFixed(1)}%
                            <span className="text-small">&nbsp;/ {duration} Days</span>
                        </h2>
                    </div>
                    <div className="pricing-card__content">
                        <ul>
                            <li className="pricing-card__list flex-align">
                                <span className="pricing-card__icon text-stat">
                                    <i className="la la-check"></i>
                                </span>
                                <p className="pricing-card__name">Take Minimum</p>
                                <p className="pricing-card_value fs-18 ms-auto">${Number(minimum).toFixed(2)}</p>
                            </li>

                            <li className="pricing-card__list flex-align">
                                <span className="pricing-card__icon text-stat">
                                    <i className="la la-check"></i>
                                </span>
                                <p className="pricing-card__name">Take Maximum</p>
                                <p className="pricing-card_value fs-18 ms-auto">${Number(maximum).toFixed(2)}</p>
                            </li>

                            <li className="pricing-card__list flex-align">
                                <span className="pricing-card__icon text-stat">
                                    <i className="la la-check"></i>
                                </span>
                                <p className="pricing-card__name">Per Installment</p>
                                <p className="pricing-card_value fs-18 ms-auto">{Number(percentage).toFixed(1)}%</p>
                            </li>
                            <li className="pricing-card__list flex-align">
                                <span className="pricing-card__icon text-stat">
                                    <i className="la la-check"></i>
                                </span>
                                <p className="pricing-card__name">Installment Interval</p>
                                <p className="pricing-card_value fs-18 ms-auto">{duration} Days</p>
                            </li>
                            <li className="pricing-card__list flex-align">
                                <span className="pricing-card__icon text-stat">
                                    <i className="la la-check"></i>
                                </span>
                                <p className="pricing-card__name"> Total Installment</p>
                                <p className="pricing-card_value fs-18 ms-auto">{totalDuration}</p>
                            </li>
                        </ul>
                        <button type="button" data-id={id} data-minimum={minimum} data-maximum={maximum} className="btn btn--base loanBtn" onClick={handleClick}>Apply Now</button>
                    </div>
                </div>
            </div>
            <div className={`modal fade custom--modal ${isModalVisible ? "show" : ""}`} id="loanModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: isModalVisible ? "block" : "none" }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <form onSubmit={loanForm.handleSubmit} method="post">
                            <div className="modal-header">
                                <h5 className="modal-title method-name" id="exampleModalLabel">Apply for Loan</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="" className="required">Amount</label>
                                    <div className="input-group custom-input-group">
                                        <input
                                            onChange={loanForm.handleChange}
                                            onBlur={loanForm.handleBlur}
                                            value={loanForm.values.amount}
                                            type="number"
                                            step="any"
                                            name="amount"
                                            className={`form-control form--control ${loanForm.errors.amount && loanForm.touched.amount ? 'border border-danger' : ''}`}
                                            placeholder="Enter An Amount" />
                                        <span className="input-group-text"> USD </span>
                                    </div>
                                    <p><small className="text--danger min-limit">Minimum Amount  ${Number(modalData.minimum).toFixed(2)}</small></p>
                                    <p><small className="text--danger max-limit">Maximum Amount  ${Number(modalData.maximum).toFixed(2)}</small></p>
                                </div>
                                <button type="submit" className="btn btn--base w-100" disabled={isLoading}>
                                    {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Confirm'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

LoanPlans.propTypes = {
    id: PropTypes.node.isRequired,
    title: PropTypes.node.isRequired,
    percentage: PropTypes.node.isRequired,
    duration: PropTypes.node.isRequired,
    totalDuration: PropTypes.node.isRequired,
    minimum: PropTypes.node.isRequired,
    maximum: PropTypes.node.isRequired,
};

export default LoanPlans