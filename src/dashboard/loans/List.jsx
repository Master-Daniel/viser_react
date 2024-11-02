/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom'
import MasterLayout from '../../layout/MasterLayout'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { setPageTitle } from '../../lib/redux/slices/global'
import Tab from './Tab'
import { useQuery } from 'react-query'
import { UserApi } from '../../lib/hooks/User'
import { formatDate } from '../../util/custom-functions'

const LoanList = () => {
    const dispatch = useDispatch()
    const [list, setList] = useState([])

    const { refetch } = useQuery('loan-list', UserApi.loanList, {
        onSuccess: ({ data }) => {
            if (data.status == 'success') {
                setList(data.data.loans)
            }
        },
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        dispatch(setPageTitle('Loan List'))
        refetch()
    }, [])

    useEffect(() => {
        console.log(list)
    }, [list])

    return (
        <MasterLayout>
            <Tab />
            <div className="card custom--card overflow-hidden">
                <div className="card-header">
                    <div className="header-nav mb-0">
                        <form className="d-flex flex-wrap gap-2">
                            <div className="input-group w-auto flex-fill">
                                <input type="search" name="search" className="form-control bg--white" placeholder="Loan No." />
                                <button className="btn btn--base" type="submit"><i className="la la-search"></i></button>
                            </div>
                            <div className="input-group w-auto flex-fill">
                                <input name="date" type="search" className="form-control bg--white pe-2 date-range" placeholder="Start Date - End Date" autoComplete="off" />
                                <button className="btn btn--base input-group-text" type="submit"><i className="la la-search"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table--responsive--md">
                            <thead>
                                <tr>
                                    <th>Loan No.</th>
                                    <th>Amount</th>
                                    <th>Installment</th>
                                    <th>Given</th>
                                    <th>Total</th>
                                    <th>Next Installment</th>
                                    <th>Total Payable</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list.data?.length > 0 && list?.data.map((item, index) => (
                                        <tr key={index}>
                                            <td>#{item.loan_number}</td>
                                            <td>{Number(item.amount).toFixed(2)}</td>
                                            <td>{Number(item.installment_interval).toFixed(2)}</td>
                                            <td>{Number(item.given_installment).toFixed(2)}</td>
                                            <td>{Number(item.total_installment).toFixed(2)}</td>
                                            <td></td>
                                            <td>$3,150.00</td>
                                            <td>
                                                <span className='badge badge--dark'>{item.status}</span></td>
                                            <td>
                                                <div className="dropdown">
                                                    <button aria-expanded="false" className="btn btn--sm btn--base" data-bs-toggle="dropdown" type="button">
                                                        <i className="las la-ellipsis-v m-0"></i>
                                                    </button>
                                                    <div className="dropdown-menu">
                                                        <Link to={`/dashboard/loan/details/${item.loan_number}`} className="dropdown-item">
                                                            <i className="las la-list"></i> Details
                                                        </Link>
                                                        <Link className="dropdown-item disabled" to={`/dashboard/loan/instalment/logs/${item.loan_number}`}>
                                                            <i className="las la-wallet"></i> Installments
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
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
                                    <Link className="page-link" to="/dashboard/loans?page=2" rel="next">›</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="d-none flex-sm-fill d-sm-flex align-items-sm-center justify-content-sm-between">
                            <div>
                                <p className="small text-muted">
                                    Showing
                                    <span className="fw-semibold"> 1</span>
                                    to
                                    <span className="fw-semibold"> 15</span>
                                    of
                                    <span className="fw-semibold">{list.total}</span>
                                    results
                                </p>
                            </div>
                            <div>
                                <ul className="pagination">
                                    <li className="page-item" aria-disabled="true" aria-label="‹">
                                        <Link to="" className="page-link" aria-hidden="true">&lsaquo;</Link>
                                    </li>
                                    <li className="page-item active" aria-current="page"><span className="page-link">1</span></li>
                                    <li className="page-item"><Link className="page-link" to="/dashboard/loans?page=2">2</Link></li>
                                    <li className="page-item">
                                        <Link className="page-link" to="/dashboard/loans?page=2" rel="next" aria-label="›">&rsaquo;</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </MasterLayout>
    )
}

export default LoanList