/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom'
import MasterLayout from '../../layout/MasterLayout'
import { useDispatch, useSelector } from 'react-redux';
import { setModalVisible, setPageTitle } from '../../lib/redux/slices/global';
import Tab from './Tab';
import { useEffect } from 'react';

const WithinTransfer = () => {

    const { isModalVisible } = useSelector((state) => state.global)
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(setModalVisible(true));
    };

    const handleClose = () => {
        dispatch(setModalVisible(false));
    };

    useEffect(() => {
        dispatch(setPageTitle('Transfer Money Within'))
    }, [])

    return (
        <MasterLayout>
            <Tab />
            <div className="card custom--card overflow-hidden">
                <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-2">
                    <h6 className="card-title mb-0">Beneficiaries</h6>
                    <div className="header-nav mb-0">
                        <Link className="btn btn-sm btn--dark" to="/dashboard/transfer/beneficiaries"> <i className="la la-users"></i> Manage Beneficiaries</Link>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table--responsive--md">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Account No.</th>
                                    <th>Account Name</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Jane</td>
                                    <td>VB21212846204262 </td>
                                    <td>testuser</td>
                                    <td>
                                        <button className="btn btn--sm btn-outline--base sendBtn" onClick={handleClick} data-id="1">
                                            <i className="las la-hand-holding-usd"></i> Transfer Money
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className={`modal fade custom--modal ${isModalVisible ? "show" : ""}`} id="sendModal" style={{ display: isModalVisible ? "block" : "none" }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Transfer Money</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                        </div>
                        <form method="post">
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label required">Amount</label>
                                    <div className="input-group custom-input-group">
                                        <input className="form-control form--control" name="amount" type="text" />
                                        <span className="input-group-text">USD</span>
                                    </div>
                                </div>
                                <div className="form-group mt-0">
                                    <label htmlFor="verification" className="form-label">Authorization Mode</label>
                                    <select name="auth_mode" id="verification" className="form--control select" required>
                                        <option disabled selected value="">Select One</option>
                                        <option value="email">Email</option>
                                        <option value="sms">SMS</option>
                                    </select>
                                </div>
                                <div className="my-4">
                                    <ul>
                                        <li className="pricing-card__list flex-between">
                                            <span className="fw-bold">Limit Per Transaction</span>
                                            <span>$1.00 (Min)</span>
                                        </li>
                                        <li className="pricing-card__list flex-between">
                                            <span className="fw-bold">Daily Limit</span>
                                            <span>$10,000.00 (Max)</span>
                                        </li>
                                        <li className="pricing-card__list flex-between">
                                            <span className="fw-bold">Monthly Limit</span>
                                            <span>$50,000.00 (Max)</span>
                                        </li>
                                        <li className="pricing-card__list flex-between">
                                            <span className="fw-bold">Charge Per Transaction</span>
                                            <span className="text--danger"> 1% + $1.00</span>
                                        </li>
                                    </ul>
                                </div>
                                <button className="btn btn--base w-100" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export default WithinTransfer