/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom"
import MasterLayout from "../../layout/MasterLayout"
import { useDispatch, useSelector } from "react-redux"
import { setModalVisible, setPageTitle } from "../../lib/redux/slices/global"
import { useEffect, useState } from "react"
import Tab from "./Tab"

const Others = () => {

    const { isModalVisible } = useSelector((state) => state.global)
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
    const [isTransferModalVisible, setIsTransferModalVisible] = useState(false);
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(setModalVisible(true));
        setIsTransferModalVisible(true)
    };

    const handleDetailsClick = () => {
        dispatch(setModalVisible(true));
        setIsDetailsModalVisible(true);
    };

    const handleClose = () => {
        dispatch(setModalVisible(false));
        setIsDetailsModalVisible(false)
        setIsTransferModalVisible(false)
    };

    useEffect(() => {
        dispatch(setPageTitle('Transfer Money to Other Bank'))
    }, [])

    return (
        <MasterLayout>
            <Tab />
            <div className="card custom--card overflow-hidden">
                <div className="card-header">
                    <div className="header-nav mb-0">
                        <Link className="btn btn-sm btn--dark" to="/dashboard/transfer/other-bank/beneficiaries"> <i className="la la-users"></i> Manage Beneficiaries</Link>
                    </div>
                </div>

                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table--responsive--md">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Account Name</th>
                                    <th>Account Number</th>
                                    <th>Bank</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>My Short Name</td>
                                    <td>My Account Name</td>
                                    <td>My Account Number</td>
                                    <td>BNR Bank</td>
                                    <td>
                                        <div className="d-flex gap-2 justify-content-end">
                                            <button className="btn btn--sm btn-outline--base seeDetails" data-id="2" onClick={handleDetailsClick}><i className="la la-desktop"></i> Details</button>
                                            <button className="btn btn--sm btn-outline--success sendBtn" onClick={handleClick} data-name="My Short Name" data-processing_time="30 Minutes" data-transfer_charge="2%" data-bank_name="BNR Bank" data-id="2" data-minimum_amount="$1.00" data-maximum_amount="$2,000.00" data-daily_limit="$20,000.00" data-monthly_limit="$200,000.00" data-daily_count="15" data-monthly_count="200" type="button">
                                                <i className="las la-hand-holding-usd"></i> Transfer
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className={`modal fade ${isDetailsModalVisible ? "show" : ""}`} id="detailsModal" style={{ display: isDetailsModalVisible ? "block" : "none" }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Benficiary Details</h5>
                            <span className="close" data-bs-dismiss="modal" type="button" aria-label="Close" onClick={handleClose}>
                                <i className="las la-times"></i>
                            </span>
                        </div>
                        <div className="modal-body">
                            <p className="loading d-none text-center"><i className="fa fa-spinner fa-spin"></i></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`modal fade custom--modal ${isModalVisible ? "show" : ""}`} id="sendModal" style={{ display: isTransferModalVisible ? "block" : "none" }}>
                <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Transfer Money</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                        </div>
                        <form method="post">
                            <div className="modal-body">
                                <div className="row  gx-5">
                                    <div className="col-xl-5 mb-3">
                                        <h6 className="mb-2 text-center">Transfer Limit</h6>
                                        <hr />
                                        <ul className="caption-list-two my-3 p-0">
                                            <li className="pricing-card__list flex-between">
                                                <span className="fw-bold">Minimum Per Transaction</span>
                                                <span className="minimum_amount"></span>
                                            </li>
                                            <li className="pricing-card__list flex-between">
                                                <span className="fw-bold">Maximum Per Transaction</span>
                                                <span className="maximum_amount"></span>
                                            </li>
                                            <li className="pricing-card__list flex-between">
                                                <span className="fw-bold">Daily Maximum</span>
                                                <span className="daily_limit"></span>
                                            </li>
                                            <li className="pricing-card__list flex-between">
                                                <span className="fw-bold">Monthly Maximum</span>
                                                <span className="monthly_limit"></span>
                                            </li>
                                            <li className="pricing-card__list flex-between">
                                                <span className="fw-bold">Daily Maximum Transaction</span>
                                                <span className="daily_count"></span>
                                            </li>
                                            <li className="pricing-card__list flex-between">
                                                <span className="fw-bold"> Monthly Maximum Transaction</span>
                                                <span className="monthly_count"></span>
                                            </li>
                                        </ul>
                                        <small className="text--danger">* Processing Time: <span className="processing_time"></span></small>
                                        <div className="transfer_charge"></div>
                                    </div>
                                    <div className="col-xl-7">
                                        <div className="form-group">
                                            <label className="required form-label">Bank</label>
                                            <input className="bank-name form--control" type="text" />
                                        </div>
                                        <div className="form-group">
                                            <label className="required form-label">Recipient</label>
                                            <input className="short-name form--control" type="text" />
                                        </div>
                                        <div className="form-group">
                                            <div className="d-flex justify-content-between flex-wrap gap-2">
                                                <label className="required form-label">Amount</label>
                                                <span className="text--info">Current Balance: $61.80</span>
                                            </div>

                                            <div className="input-group custom-input-group">
                                                <input className="form-control form--control" name="amount" type="number" step="any" placeholder="Enter an Amount" />
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
                                        <button className="btn w-100 btn--base" type="submit">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export default Others