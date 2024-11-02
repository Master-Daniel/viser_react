import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModalVisible } from '../lib/redux/slices/global';
import { useMutation } from 'react-query';
import { UserApi } from '../lib/hooks/User';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { CircularProgress } from "@mui/material";
import { notifyError, notifySuccess } from '../util/custom-functions';

const FDRPlans = ({ id, title, percentage, duration, returnDays, minimum, maximum }) => {
    const [modalData, setModalData] = useState({
        id: "",
        minimum: "",
        maximum: "",
        actionUrl: "",
    });
    const { isModalVisible } = useSelector((state) => state.global)
    const dispatch = useDispatch()

    const handleClick = (e) => {
        const { id, minimum, maximum } = e.currentTarget.dataset;
        setModalData({
            id,
            minimum,
            maximum,
            actionUrl: `/fdr/apply/${id}`,
        });
        dispatch(setModalVisible(true));
    };

    const handleClose = () => {
        dispatch(setModalVisible(false));
    };

    const { mutate, isLoading } = useMutation('fdr-apply', UserApi.fdrApply)

    const fdrForm = useFormik({
        initialValues: {
            amount: 0,
            auth_mode: ''
        },
        validationSchema: Yup.object().shape({
            amount: Yup.number().required('Amount is required'),
            auth_mode: Yup.string().required('Auth mode is required')
        }),
        onSubmit: values => {
            mutate({url: modalData.actionUrl, data: values}, {
                onSuccess: ({ data }) => {
                    if (data.status == 'error') {
                        data.message.error.forEach((error) => {
                            notifyError(error)
                        })
                    } else if (data.status == 'success') {
                        data.message.success.forEach((message) => {
                            notifySuccess(message)
                        })
                    }
                }
            })
        }
    })

    const handleSelectedAuthMode = (e) => {
        fdrForm.setFieldValue('auth_mode', e.target.value);
    }

    return (
        <>
            <div className="col-xxl-4 col-sm-6">
                <div className="pricing-card text-center rounded">
                    <div className="pricing-card__header">
                        <div className="pricing-card__overlay"></div>
                        <p className="pricing-card__title">{title}</p>
                        <h2 className="pricing-card__price">
                            {percentage}%
                            <span className="text-small">&nbsp;/ {returnDays} Days</span>
                        </h2>
                    </div>
                    <div className="pricing-card__content">
                        <ul>
                            <li className="pricing-card__list flex-align">
                                <span className="pricing-card__icon text-stat">
                                    <i className="la la-check"></i>
                                </span>
                                <p className="pricing-card__name">Lock in Period</p>
                                <p className="pricing-card_value fs-18 ms-auto">
                                    {duration} Days
                                </p>
                            </li>

                            <li className="pricing-card__list flex-align">
                                <span className="pricing-card__icon text-stat">
                                    <i className="la la-check"></i>
                                </span>
                                <p className="pricing-card__name">Get Profit Every</p>
                                <p className="pricing-card_value fs-18 ms-auto">{returnDays} Days</p>
                            </li>
                            <li className="pricing-card__list flex-align">
                                <span className="pricing-card__icon text-stat">
                                    <i className="la la-check"></i>
                                </span>
                                <p className="pricing-card__name">Minimum </p>
                                <p className="pricing-card_value fs-18 ms-auto">{minimum}</p>
                            </li>
                            <li className="pricing-card__list flex-align">
                                <span className="pricing-card__icon text-stat">
                                    <i className="la la-check"></i>
                                </span>
                                <p className="pricing-card__name">Maximum</p>
                                <p className="pricing-card_value fs-18 ms-auto">{maximum}</p>
                            </li>
                        </ul>
                        <button type="button" data-id={id} data-minimum={minimum} data-maximum={maximum} className="btn btn--base" onClick={handleClick}>Apply Now</button>
                    </div>
                </div>
            </div>
            <div className={`modal fade custom--modal ${isModalVisible ? "show" : ""}`} id="fdrModal" style={{ display: isModalVisible ? "block" : "none" }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <form onSubmit={fdrForm.handleSubmit} method="post">
                            <div className="modal-header">
                                <h5 className="modal-title method-name">Apply to Open an FDR</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group mt-0">
                                    <label className="form-label">Amount</label>
                                    <div className="input-group">
                                        <input 
                                            onChange={fdrForm.handleChange}
                                            onBlur={fdrForm.handleBlur}
                                            value={fdrForm.values.amount}
                                            type="number" 
                                            step="any" 
                                            name="amount" 
                                            className={`form-control form--control ${fdrForm.errors.amount && fdrForm.touched.amount ? 'border border-danger' : ''}`}
                                            placeholder="Enter An Amount" />
                                        <span className="input-group-text"> USD </span>
                                    </div>
                                    <p><small className="text--danger min-limit mt-2">Minimum Amount {modalData.minimum}</small></p>
                                    <p><small className="text--danger max-limit">Maximum Amount {modalData.maximum}</small></p>
                                </div>
                                <div className="form-group mt-0">
                                    <label htmlFor="auth_mode" className="form-label">Authorization Mode</label>
                                    <select 
                                        onChange={(e) => handleSelectedAuthMode(e)}
                                        onBlur={fdrForm.handleBlur}
                                        name="auth_mode" 
                                        id="auth_mode" 
                                        className="form--control select">
                                        <option value="">Select One</option>
                                        <option value="email">Email</option>
                                        <option value="sms">SMS</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-md btn--base w-100" disabled={isLoading}>
                                    {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

FDRPlans.propTypes = {
    id: PropTypes.node.isRequired,
    title: PropTypes.node.isRequired,
    percentage: PropTypes.node.isRequired,
    duration: PropTypes.node.isRequired,
    returnDays: PropTypes.node.isRequired,
    minimum: PropTypes.node.isRequired,
    maximum: PropTypes.node.isRequired,
};

export default FDRPlans