import MasterLayout from '../../layout/MasterLayout'
import Tab from './Tab'

const LoanPreview = () => {
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
                                    <span>Agriculture Loan</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span className="fw-bold">Loan Amount</span>
                                    <span>$200,000.00</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span className="fw-bold">Total Installment</span>
                                    <span>12</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span className="fw-bold">Per Installment</span>
                                    <span>$20,000.00</span>
                                </li>
                                <li className="pricing-card__list flex-between text--danger">
                                    <span className="fw-bold">You Need To Pay</span>
                                    <span className="fw-bold">$240,000.00</span>
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
                            <form action="https://script.viserlab.com/viserbank/demo/user/loan/apply-confirm" method="post" encType="multipart/form-data">
                                <div className="form-group">
                                    <p className="rounded p-3">
                                        <span style="color: rgb(33, 37, 41); font-family: Montserrat, sans-serif; font-weight: bolder;">
                                            <font size="5">Please follow the below instruction</font>
                                        </span>
                                        <span style="color: rgb(33, 37, 41); font-family: Montserrat, sans-serif;">:</span>
                                        <br />
                                    </p>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label form--label">Name of Father   </label>
                                            <input type="text" className="form-control form--control" name="name_of_father" value="" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label form--label">NID of Father   </label>
                                            <input type="text" className="form-control form--control" name="nid_of_father" value="" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label form--label">Name of Mother   </label>
                                            <input type="text" className="form-control form--control" name="name_of_mother" value="" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label form--label">NID of Mother   </label>
                                            <input type="text" className="form-control form--control" name="nid_of_mother" value="" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label form--label">Occupation   </label>
                                            <input type="text" className="form-control form--control" name="occupation" value="" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label form--label">Monthly Salary   </label>
                                            <input type="text" className="form-control form--control" name="monthly_salary" value="" />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn--base w-100">Apply</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export default LoanPreview