import MasterLayout from "../../layout/MasterLayout"
import Tab from "./Tab"

const WireTransfer = () => {
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
                                    <span className="fw-bold">$1.00</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span>Maximum Per Transaction</span>
                                    <span className="fw-bold">$10,000.00</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span>Daily Maximum</span>
                                    <span className="fw-bold">$100,000.00</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span>Monthly Maximum</span>
                                    <span className="fw-bold">$100,000.00</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span>Daily Maximum Transaction</span>
                                    <span className="fw-bold">10</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span> Monthly Maximum Transaction</span>
                                    <span className="fw-bold">50</span>
                                </li>
                            </ul>
                            <small className="text--danger">* Charge 2%</small>
                        </div>
                    </div>

                    <div className="card custom--card mt-3">
                        <div className="card-body">
                            <h6 className="card-title text-center">Instruction</h6>
                            <p><div style="text-align: left;"><br /></div></p>
                        </div>
                    </div>
                </div>

                <div className="col-xl-8">
                    <div className="card custom--card">
                        <div className="card-body">
                            <div className="text-center">
                                <div style="text-align: left;"><br /></div> 
                            </div>
                            <form method="POST">
                                <div className="form-group">
                                    <label className="form-label">Amount</label>
                                    <div className="input-group custom-input-group">
                                        <input type="number" step="any" className="form-control form--control" name="amount" />
                                        <span className="input-group-text">USD</span>
                                    </div>
                                    <span className="fw-bold  text--info ">Current Balance: $61.80</span>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label form--label">Account Name   </label>
                                            <input type="text" className="form-control form--control" name="account_name" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label form--label">Account Number   </label>
                                            <input type="text" className="form-control form--control" name="account_number" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label form--label">Full Name   </label>
                                            <input type="text" className="form-control form--control" name="full_name" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label form--label">Phone Number   </label>
                                            <input type="text" className="form-control form--control" name="phone_number" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label form--label">SWIFT Code or IBAN Number   </label>
                                            <input type="text" className="form-control form--control" name="swift_code_or_iban_number" />
                                        </div>
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
                                <button type="submit" className="btn btn--base w-100 ">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export default WireTransfer