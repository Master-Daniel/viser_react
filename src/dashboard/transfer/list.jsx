import { Link } from "react-router-dom"
import MasterLayout from "../../layout/MasterLayout"
import Tab from "./Tab"

const TransfersList = () => {
    return (
        <MasterLayout>
            <Tab />
            <div className="card custom--card overflow-hidden">
                <div className="card-header">
                    <div className="header-nav mb-0">
                        <form className="d-flex flex-wrap gap-2">
                            <div className="input-group w-auto flex-fill">
                                <input type="search" name="search" className="form-control bg--white" placeholder="TRX No." />
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
                                    <th>TRX No.</th>
                                    <th>Time</th>
                                    <th>Recipient</th>
                                    <th>Account No.</th>
                                    <th>Bank</th>
                                    <th>Amount</th>
                                    <th>Charge</th>
                                    <th>Paid Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <span className="text--dark fw-bold">#FWZ524ZTRJCG</span>
                                    </td>
                                    <td>
                                        <em>17 Apr, 2023 02:27 AM</em>
                                    </td>
                                    <td>
                                        <span className="text--base fw-bold">Calista Mills</span>
                                    </td>
                                    <td>
                                        4654654651544
                                    </td>
                                    <td>
                                        <span className="text--warning fw-bold">Wire Transfer</span>
                                        <br />
                                        <button className="badge badge--info wire-transfer" data-id="213" type="button"> <i className="la la-eye"></i> Recipient Info</button>
                                    </td>
                                    <td>$50.00</td>
                                    <td>$1.00</td>
                                    <td>$51.00</td>
                                    <td>
                                        <span className="badge badge--warning">Pending</span>
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
                                    <a className="page-link" href="/dashboard/transfer/all?page=2" rel="next">›</a>
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
                                    <span className="fw-semibold">29</span>
                                    results
                                </p>
                            </div>
                            <div>
                                <ul className="pagination">
                                    <li className="page-item disabled" aria-disabled="true" aria-label="‹">
                                        <span className="page-link" aria-hidden="true">&lsaquo;</span>
                                    </li>
                                    <li className="page-item active" aria-current="page"><span className="page-link">1</span></li>
                                    <li className="page-item"><Link className="page-link" to="/dashboard/transfer/all?page=2">2</Link></li>
                                    <li className="page-item">
                                        <Link className="page-link" to="/dashboard/transfer/all?page=2" rel="next" aria-label="›">&rsaquo;</Link>
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

export default TransfersList