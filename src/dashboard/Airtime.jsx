import MasterLayout from '../layout/MasterLayout'

const Airtime = () => {
    return (
        <MasterLayout>
            <div className="row justify-content-center">
                <div className="col-lg-8">

                    <form method="POST">
                        <div className="card custom--card topup-card">
                            <div className="card-body">
                                <h6 className="text-center mb-0">Current Balance: $61.80</h6>
                                <div className="form-group">
                                    <label className="form-label">Country</label>
                                    <select name="country_id" className="form--control" required>
                                        <option value="" selected disabled>Select One</option>
                                        <option value="13" data-calling_codes="[&quot;+880&quot;]" >Bangladesh</option>
                                        <option value="26" data-calling_codes="[&quot;+1&quot;]" >Canada</option>
                                        <option value="129" data-calling_codes="[&quot;+971&quot;]" >United Arab Emirates</option>
                                        <option value="131" data-calling_codes="[&quot;+1&quot;]" >United States</option>
                                    </select>
                                </div>
                                <div className="form-group operatorDiv d-none">
                                    <label className="required form-label">Operator</label>
                                    <div className="operator-wrapper"></div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Mobile Number</label>
                                    <div className="input--group">
                                        <span className="input--group-text">
                                            <select name="calling_code" id="" className="form--control p-0 h-auto"></select>
                                        </span>
                                        <input type="tel" className="form-control form--control mobileNumber" name="mobile_number" value="" />
                                        <div className="input--group-border"></div>
                                    </div>
                                </div>
                                <div className="form-group amount-wrapper d-none">
                                    <label className="form-label">Amount <span className="topupLimit text--info d-none"></span></label>
                                    <div className="input-group">
                                        <input type="number" step="any" className="form-control form--control amount" name="amount" value="" />
                                        <span className="input-group-text">USD</span>
                                    </div>
                                </div>
                                <div className="form-group fixed-amounts-wrapper d-none">
                                    <label className="form-label">Amount</label>
                                    <div className="fixed-amount-input-wrapper"></div>
                                </div>
                                <div className="form-group mt-0">
                                    <label htmlFor="verification" className="form-label">Authorization Mode</label>
                                    <select name="auth_mode" id="verification" className="form--control select" required>
                                        <option disabled selected value="">Select One</option>
                                        <option value="email">Email</option>
                                        <option value="sms">SMS</option>
                                    </select>
                                </div>
                                <div className="form-group suggested-amounts-wrapper d-none">
                                    <label className="form-label">Suggested Amounts</label>
                                    <div className="suggested-amounts"></div>
                                </div>
                                <button type="submit" className="btn btn--base w-100">Top Up</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </MasterLayout>
    )
}

export default Airtime