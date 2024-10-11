import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModalVisible } from '../lib/redux/slices/global';

const LoanPlans = ({ id, title, percentage, duration, minimum, maximum, totalDuration }) => {

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
        });
        dispatch(setModalVisible(true));
    };

    const handleClose = () => {
        dispatch(setModalVisible(false));
    };

    return (
        <>
            <div className="col-xxl-4 col-sm-6">
                <div className="pricing-card text-center rounded">
                    <div className="pricing-card__header">
                        <div className="pricing-card__overlay"></div>
                        <p className="pricing-card__title">{title}</p>
                        <h2 className="pricing-card__price">
                            {percentage}%
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
                                <p className="pricing-card_value fs-18 ms-auto">{minimum}</p>
                            </li>

                            <li className="pricing-card__list flex-align">
                                <span className="pricing-card__icon text-stat">
                                    <i className="la la-check"></i>
                                </span>
                                <p className="pricing-card__name">Take Maximum</p>
                                <p className="pricing-card_value fs-18 ms-auto">{maximum}</p>
                            </li>

                            <li className="pricing-card__list flex-align">
                                <span className="pricing-card__icon text-stat">
                                    <i className="la la-check"></i>
                                </span>
                                <p className="pricing-card__name">Per Installment</p>
                                <p className="pricing-card_value fs-18 ms-auto">{percentage}%</p>
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
                        <form action="" method="post">
                            <div className="modal-header">
                                <h5 className="modal-title method-name" id="exampleModalLabel">Apply for Loan</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="" className="required">Amount</label>
                                    <div className="input-group custom-input-group">
                                        <input type="number" step="any" name="amount" className="form-control form--control" placeholder="Enter An Amount" />
                                        <span className="input-group-text"> USD </span>
                                    </div>
                                    <p><small className="text--danger min-limit"></small></p>
                                    <p><small className="text--danger max-limit"></small></p>
                                </div>
                                <button type="submit" className="btn btn--base w-100">Confirm</button>
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