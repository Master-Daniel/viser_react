/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from 'react-redux'
import MasterLayout from '../../layout/MasterLayout'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { setPageTitle } from '../../lib/redux/slices/global'
import Tab from './Tab'

const Installments = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle('FDR Installments'))
    }, [])

    return (
        <MasterLayout>
        <Tab />
            <div className="row justify-content-center">
                <div className="col-xl-7 col-lg-12">
                    <div className="custom--card">
                        <div className="card-body">
                            <div className="text-end">
                                <span className="badge badge--dark">Closed</span>
                            </div>
                            <ul className="caption-list-two mt-3 p-0">
                                <li>
                                    <span className="caption">FDR No.</span>
                                    <span className="value fw-bold">#JHQJA3PQP3CF</span>
                                </li>
                                <li>
                                    <span className="caption">Plan</span>
                                    <span className="value fw-bold">Starter</span>
                                </li>
                                <li>
                                    <span className="caption">Profit Rate</span>
                                    <span className="value fw-bold">5%</span>
                                </li>
                                <li>
                                    <span className="caption">Opened On</span>
                                    <span className="value">April 17, 2023</span>
                                </li>
                                <li>
                                    <span className="caption">Lock In Period</span>
                                    <span className="value">April 15, 2024</span>
                                </li>
                                <li>
                                    <span className="caption">Installment Interval</span>
                                    <span className="value fw-bold">30 Days</span>
                                </li>
                                <li>
                                    <span className="caption">Per Installment</span>
                                    <span className="value fw-bold">$2.00</span>
                                </li>
                                <li>
                                    <span className="caption">FDR Amount</span>
                                    <span className="value fw-bold">$40.00</span>
                                </li>
                                <li>
                                    <span className="caption">Profit Received</span>
                                    <span className="value fw-bold">$30.00</span>
                                </li>
                            </ul>
                            <div className="d-flex justify-content-end mt-3 gap-2">
                                <Link to="dashboard/fdr/details/JHQJA3PQP3CF?download" type="button" className="btn btn--base btn-sm"><i className="las la-file-download"></i> Download</Link>
                            </div>
                        </div>
                    </div>
                    <div className="alert alert-info mt-3 d-flex align-items-center gap-2" role="alert">
                        <i className="la la-info-circle la-2x"></i> The option to close this FDR will only be available after the lock-in period.
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export default Installments