/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom"
import MasterLayout from "../layout/MasterLayout"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { setPageTitle } from "../lib/redux/slices/global"

const Transactions = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle('Transactions'))
    }, [])
    return (
        <MasterLayout>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="show-filter mb-3 text-end">
                        <button className="btn btn--base showFilterBtn btn-sm" type="button"><i className="las la-filter"></i> Filter</button>
                    </div>
                    <div className="card custom--card responsive-filter-card mb-4">
                        <div className="card-body">
                            <form action="">
                                <div className="d-flex flex-wrap gap-4">
                                    <div className="flex-grow-1">
                                        <label className="form-label">Date</label>
                                        <input name="date" type="search" className="form-control bg--white pe-2 date-range form--control" placeholder="Start Date - End Date" autoComplete="off" />
                                    </div>
                                    <div className="flex-grow-1">
                                        <label className="form-label">Type</label>
                                        <select className="form-select form--control" name="trx_type">
                                            <option value="">All</option>
                                            <option value="+" >Plus</option>
                                            <option value="-" >Minus</option>
                                        </select>
                                    </div>
                                    <div className="flex-grow-1">
                                        <label className="form-label">Remark</label>
                                        <select className="form-select form--control" name="remark">
                                            <option value="">Any</option>
                                            <option value="" selected></option>
                                            <option value="balance_add" >Balance add</option>
                                            <option value="balance_subtract" >Balance subtract</option>
                                            <option value="deposit" >Deposit</option>
                                            <option value="dps_installment" >Dps installment</option>
                                            <option value="fdr_closed" >Fdr closed</option>
                                            <option value="fdr_installment" >Fdr installment</option>
                                            <option value="fdr_open" >Fdr open</option>
                                            <option value="other_bank_transfer" >Other bank transfer</option>
                                            <option value="own_bank_transfer" >Own bank transfer</option>
                                            <option value="received_money" >Received money</option>
                                            <option value="referral_commission" >Referral commission</option>
                                            <option value="top_up" >Top up</option>
                                            <option value="wire_transfer" >Wire transfer</option>
                                            <option value="withdraw" >Withdraw</option>
                                        </select>
                                    </div>
                                    <div className="align-self-end">
                                        <button className="btn btn--base w-100"><i className="las la-filter"></i> Apply Filter</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="card custom--card">
                        <div className="card-header d-flex justify-content-end">
                            <form method="GET">
                                <div className="input-group">
                                    <input className="form-control form--control" placeholder="TRX No." name="search" type="text" />
                                    <button type="submit" className="input-group-text"><i className="la la-search"></i></button>
                                </div>
                            </form>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table--responsive--md has-search-form">
                                    <thead>
                                        <tr>
                                            <th>TRX No.</th>
                                            <th>Time</th>
                                            <th>Amount</th>
                                            <th>Post Balance</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                #B7OTTUNJT4JO
                                            </td>
                                            <td>
                                                2024-08-08 12:10 PM
                                            </td>
                                            <td>
                                                <span className=" text--danger ">
                                                    - $80.00
                                                </span>
                                            </td>
                                            <td>
                                                $61.80
                                            </td>
                                            <td>DPS installment paid</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                #7D1UOKVF8JSO
                                            </td>
                                            <td>
                                                2024-08-08 12:10 PM
                                            </td>
                                            <td>
                                                <span className=" text--danger ">- $80.00</span>
                                            </td>
                                            <td>
                                                $141.80
                                            </td>
                                            <td>DPS installment paid</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="card-footer">
                            <nav className="d-flex justify-items-center justify-content-between">
                                <div className="d-flex justify-content-between flex-fill d-sm-none">
                                    <ul className="pagination">
                                        <li className="page-item disabled" aria-disabled="true">
                                            <span className="page-link">‹</span>
                                        </li>
                                        <li className="page-item">
                                            <Link className="page-link" to="/dashboard/transactions?page=2" rel="next">›</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="d-none flex-sm-fill d-sm-flex align-items-sm-center justify-content-sm-between">
                                    <div>
                                        <p className="small text-muted">
                                            Showing
                                            <span className="fw-semibold">1</span>
                                            to
                                            <span className="fw-semibold">15</span>
                                            of
                                            <span className="fw-semibold">716</span>
                                            results
                                        </p>
                                    </div>
                                    <div>
                                        <ul className="pagination">
                                            <li className="page-item disabled" aria-disabled="true" aria-label="‹">
                                                <span className="page-link" aria-hidden="true">&lsaquo;</span>
                                            </li>
                                            <li className="page-item active" aria-current="page"><span className="page-link">1</span></li>
                                            <li className="page-item"><Link className="page-link" to="/dashboard/transactions?page=2">2</Link></li>
                                            <li className="page-item"><Link className="page-link" to="/dashboard/transactions?page=3">3</Link></li>
                                            <li className="page-item disabled" aria-disabled="true"><span className="page-link">...</span></li>
                                            <li className="page-item"><Link className="page-link" to="/dashboard/transactions?page=4">4</Link></li>
                                            <li className="page-item">
                                                <Link className="page-link" to="/dashboard/transactions?page=2" rel="next" aria-label="›">&rsaquo;</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export default Transactions