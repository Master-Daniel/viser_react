/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom'
import MasterLayout from '../../layout/MasterLayout'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setPageTitle } from '../../lib/redux/slices/global'
import Tab from './Tab'

const FDRList = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle('My FDR List'))
    }, [])

    return (
        <MasterLayout>
            <Tab />
            <div className="card custom--card overflow-hidden">
                <div className="card-header">
                    <div className="header-nav mb-0">
                        <form className="d-flex flex-wrap gap-2">
                            <div className="input-group w-auto flex-fill">
                                <input type="search" name="search" className="form-control bg--white" placeholder="FDR No." />
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
                                    <th>FDR No.</th>
                                    <th>Rate</th>
                                    <th>Amount</th>
                                    <th>Installment</th>
                                    <th>Next Installment</th>
                                    <th>Lock In Period</th>
                                    <th>Status</th>
                                    <th>Opened At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        #JHQJA3PQP3CF
                                    </td>
                                    <td>5%</td>
                                    <td>
                                        <span className="fw-semibold">$40.00</span>
                                    </td>
                                    <td>$2.00 /30 Days</td>
                                    <td>N/A</td>
                                    <td>
                                        15 Apr, 2024
                                    </td>
                                    <td><span className="badge badge--dark">Closed</span></td>
                                    <td>
                                        17 Apr, 2023 11:59 PM
                                    </td>
                                    <td>
                                        <div className="dropdown">
                                            <button aria-expanded="false" className="btn btn--sm btn--base" data-bs-toggle="dropdown" type="button">
                                                <i className="las la-ellipsis-v m-0"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <Link to="dashboard/fdr/details/JHQJA3PQP3CF" className="dropdown-item">
                                                    <i className="las la-list"></i> Details
                                                </Link>
                                                <Link to="dashboard/fdr/installments/JHQJA3PQP3CF" className="dropdown-item">
                                                    <i className="las la-wallet"></i> Installments
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export default FDRList