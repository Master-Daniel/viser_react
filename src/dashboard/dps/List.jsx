import { Link } from 'react-router-dom'
import MasterLayout from '../../layout/MasterLayout'

const DPSList = () => {
    return (
        <MasterLayout>
            <div className="card custom--card overflow-hidden">
                <div className="card-header">
                    <div className="header-nav mb-0">
                        <form className="d-flex flex-wrap gap-2">
                            <div className="input-group w-auto flex-fill">
                                <input type="search" name="search" className="form-control bg--white" placeholder="DPS No." />
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
                                    <th>DPS No.</th>
                                    <th>Rate</th>
                                    <th>Per Installment</th>
                                    <th>Total</th>
                                    <th>Given</th>
                                    <th>Next Installment</th>
                                    <th>DPS Amount</th>
                                    <th>Maturity Amount</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        #B7OTTUNJT4JO
                                    </td>
                                    <td>4%</td>
                                    <td>$80.00 /30 Days</td>
                                    <td>50</td>
                                    <td>17</td>
                                    <td>07 Sep, 2024</td>
                                    <td>$4,000.00</td>
                                    <td>$4,160.00</td>
                                    <td><span className='badge badge--success'>Running</span></td>
                                    <td>
                                        <div className="dropdown">
                                            <button aria-expanded="false" className="btn btn--sm btn--base" data-bs-toggle="dropdown" type="button">
                                                <i className="las la-ellipsis-v m-0"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <Link to="dashboard/dps/details" className="dropdown-item">
                                                    <i className="las la-list"></i> Details
                                                </Link>
                                                <Link className="dropdown-item" to="dashboard/dps/installments/logs">
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

export default DPSList