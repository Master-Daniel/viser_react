/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom'
import MasterLayout from '../../layout/MasterLayout'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setPageTitle } from '../../lib/redux/slices/global'

const DepositHistory = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle('Deposit'))
    }, [])
    
    return (
        <MasterLayout>
            <div className="header-nav flex-sm-nowrap mb-0">
                <form className="d-flex flex-wrap gap-2">
                    <div className="input-group w-auto flex-fill">
                        <input type="search" name="search" className="form-control bg--white" placeholder="TRX No." value="" />
                        <button className="btn btn--base" type="submit"><i className="la la-search"></i></button>
                    </div>
                </form>
                <Link className="btn btn--base" href="/dashboard/deposit"><i className="las la-plus"></i> Deposit Now</Link>
            </div>
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table--responsive--md">
                        <thead>
                            <tr>
                                <th>TRX No.</th>
                                <th>Amount</th>
                                <th>Charge</th>
                                <th>After Charge</th>
                                <th>Initiated At</th>
                                <th>Method</th>
                                <th>Status</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#YC7T7UENS9ZZ</td>
                                <td>$100.00</td>
                                <td>$4.00</td>
                                <td>$104.00</td>
                                <td><em>2024-10-05 11:35 AM</em></td>
                                <td>
                                    <span className="text-primary" title="Gateway Name">Bank Payment</span>
                                </td>
                                <td><span className="badge badge--warning">Pending</span></td>
                                <td>
                                    <Link href="/dashboard/deposit/details/YC7T7UENS9ZZ" className="btn btn--sm btn-outline--base"><i className="la la-desktop"></i> Details</Link>
                                </td>
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
                                <Link className="page-link" to="/dashboard/deposit/history?page=2" rel="next">›</Link>
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
                                <span className="fw-semibold">25</span>
                                results
                            </p>
                        </div>
                        <div>
                            <ul className="pagination">
                                <li className="page-item disabled" aria-disabled="true" aria-label="‹">
                                    <span className="page-link" aria-hidden="true">&lsaquo;</span>
                                </li>
                                <li className="page-item active" aria-current="page"><span className="page-link">1</span></li>
                                <li className="page-item"><a className="page-link" href="/dashboard/deposit/history?page=2">2</a></li>
                                <li className="page-item">
                                    <Link className="page-link" to="/dashboard/deposit/history?page=2" rel="next" aria-label="›">&rsaquo;</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </MasterLayout>
    )
}

export default DepositHistory