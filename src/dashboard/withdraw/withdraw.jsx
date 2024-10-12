import MasterLayout from "../../layout/MasterLayout"

const Withdraw = () => {
    return (
        <MasterLayout>
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <form method="post" className="withdraw-form">
                        <div className="gateway-card">
                            <div className="row justify-content-center gy-sm-4 gy-3">
                                <div className="col-xxl-4 col-xl-5">
                                    <div className="payment-system-list is-scrollable gateway-option-list">
                                        <label htmlFor="bank_wire" className="payment-item  gateway-option">
                                            <div className="payment-item__info">
                                                <span className="payment-item__check"></span>
                                                <span className="payment-item__name">Bank Wire</span>
                                            </div>
                                            <div className="payment-item__thumb">
                                                <img className="payment-item__thumb-img" src="assets/images/default.png" alt="payment-thumb" />
                                            </div>
                                            <input className="payment-item__radio gateway-input" id="bank_wire" hidden data-gateway='{"id":1,"form_id":2,"name":"Bank Wire","image":null,"min_limit":"1.00000000","max_limit":"1000.00000000","fixed_charge":"1.00000000","rate":"100.00000000","percent_charge":"2.00","currency":"PKR","description":"\u003Cspan style=\u0022color: rgb(33, 37, 41); font-family: Montserrat, sans-serif;\u0022\u003EPlease Provide The information Below:\u003C\/span\u003E\u003Cbr\u003E","status":1,"created_at":"2022-12-03T18:05:46.000000Z","updated_at":"2022-12-03T18:05:46.000000Z"}' type="radio" name="method_code" value="1" checked data-min-amount="$1.00" data-max-amount="$1,000.00" />
                                        </label>
                                        <label htmlFor="mobile_money" className="payment-item  gateway-option">
                                            <div className="payment-item__info">
                                                <span className="payment-item__check"></span>
                                                <span className="payment-item__name">Mobile Money</span>
                                            </div>
                                            <div className="payment-item__thumb">
                                                <img className="payment-item__thumb-img" src="assets/images/default.png" alt="payment-thumb" />
                                            </div>
                                            <input className="payment-item__radio gateway-input" id="mobile_money" hidden data-gateway='{"id":2,"form_id":3,"name":"Mobile Money","image":null,"min_limit":"10.00000000","max_limit":"1000.00000000","fixed_charge":"0.00000000","rate":"1.00000000","percent_charge":"0.01","currency":"USD","description":"\u003Cspan style=\u0022color: rgb(33, 37, 41); font-family: Montserrat, sans-serif;\u0022\u003EPlease Provide The Information Below:\u003C\/span\u003E\u003Cbr\u003E","status":1,"created_at":"2022-12-03T18:07:15.000000Z","updated_at":"2022-12-03T18:07:15.000000Z"}' type="radio" name="method_code" value="2" data-min-amount="$10.00" data-max-amount="$1,000.00" />
                                        </label>
                                        <label htmlFor="paypal" className="payment-item  gateway-option">
                                            <div className="payment-item__info">
                                                <span className="payment-item__check"></span>
                                                <span className="payment-item__name">PayPal</span>
                                            </div>
                                            <div className="payment-item__thumb">
                                                <img className="payment-item__thumb-img" src="assets/images/default.png" alt="payment-thumb" />
                                            </div>
                                            <input className="payment-item__radio gateway-input" id="paypal" hidden data-gateway='{"id":3,"form_id":16,"name":"PayPal","image":null,"min_limit":"500.00000000","max_limit":"59000.00000000","fixed_charge":"0.00000000","rate":"1.00000000","percent_charge":"0.01","currency":"USD","description":"\u003Cbr\u003E","status":1,"created_at":"2023-03-03T04:21:53.000000Z","updated_at":"2023-03-03T04:23:24.000000Z"}' type="radio" name="method_code" value="3" data-min-amount="$500.00" data-max-amount="$59,000.00" />
                                        </label>
                                    </div>
                                </div>
                                <div className="col-xxl-6 col-xl-7">
                                    <div className="card custom--card mb-3">
                                        <div className="card-body">
                                            <h6 className="mb-3 text-end">Current Balance: $61.80</h6>
                                            <div className="input-group">
                                                <span className="input-group-text">$</span>
                                                <input type="number" step="any" className="form-control form--control amount" name="amount" placeholder="Enter Amount" value="" autoComplete="off" />
                                            </div>
                                            <small className="text-muted"> Limit: <span className="gateway-limit">0.00</span></small>
                                        </div>
                                    </div>
                                    <div className="card custom--card mb-3">
                                        <div className="card-body">
                                            <div className="deposit-info">
                                                <span className="deposit-info__title">
                                                    Processing Charge <span data-bs-toggle="tooltip" title="Processing charge for withdraw method" className="proccessing-fee-info"><i className="las la-info-circle"></i> </span>
                                                </span>
                                                <div className="deposit-info__input">
                                                    $<span className="processing-fee">0.00</span> USD
                                                </div>
                                            </div>
                                            <div className="deposit-info pt-3">
                                                <div className="deposit-info__title">
                                                    <p className="text">Receivable</p>
                                                </div>
                                                <div className="deposit-info__input">
                                                    <p className="text">$<span className="final-amount">0.00</span>
                                                        USD
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="deposit-info gateway-conversion d-none pt-2">
                                                <div className="deposit-info__title">
                                                    <p className="text">Conversion</p>
                                                </div>
                                                <div className="deposit-info__input">
                                                    <p className="text"></p>
                                                </div>
                                            </div>
                                            <div className="deposit-info conversion-currency d-none pt-2">
                                                <div className="deposit-info__title">
                                                    <p className="text">
                                                        In <span className="gateway-currency"></span>
                                                    </p>
                                                </div>
                                                <div className="deposit-info__input">
                                                    <p className="text">
                                                        <span className="in-currency"></span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card custom--card">
                                        <div className="card-body">
                                            <div className="form-group mt-0">
                                                <label htmlFor="verification" className="form-label">Authorization Mode</label>
                                                <select name="auth_mode" id="verification" className="form--control select" required>
                                                    <option disabled selected value="">Select One</option>
                                                    <option value="email">Email</option>
                                                    <option value="sms">SMS</option>
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