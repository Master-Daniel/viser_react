/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom"
import MasterLayout from "../../layout/MasterLayout"
import { useDispatch } from "react-redux"
import { setPageTitle } from "../../lib/redux/slices/global"
import { useEffect } from "react"

const SupportTicket = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle('Support Tickets'))
    }, [])

    return (
        <MasterLayout>
            <div className="card custom--card overflow-hidden">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table--responsive--md">
                            <thead>
                                <tr>
                                    <th>Ticket ID</th>
                                    <th>Subject</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Last Reply</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        #477754
                                    </td>
                                    <td>
                                        test
                                    </td>
                                    <td><span className="badge badge--warning">Customer Reply</span></td>
                                    <td>
                                        <span className="badge badge--danger">High</span>
                                    </td>
                                    <td>1 month ago </td>
                                    <td>
                                        <a className="btn btn-outline--base btn--sm" href="/dashboard/support/ticket/view/477754">
                                            <i className="la la-desktop"></i> View
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        #643948
                                    </td>
                                    <td>
                                        vgg
                                    </td>
                                    <td><span className="badge badge--warning">Customer Reply</span></td>
                                    <td>
                                        <span className="badge badge--dark">Low</span>
                                    </td>
                                    <td>1 month ago </td>
                                    <td>
                                        <a className="btn btn-outline--base btn--sm" href="/dashboard/support/ticket/view/643948">
                                            <i className="la la-desktop"></i> View
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        #346996
                                    </td>
                                    <td>
                                        &lt;script&gt;alert&#039;hello...
                                    </td>
                                    <td><span className="badge badge--success">Open</span></td>
                                    <td>
                                        <span className="badge badge--danger">High</span>
                                    </td>
                                    <td>1 month ago </td>
                                    <td>
                                        <a className="btn btn-outline--base btn--sm" href="/dashboard/support/ticket/view/346996">
                                            <i className="la la-desktop"></i> View
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        #450578
                                    </td>
                                    <td>
                                        babi je
                                    </td>
                                    <td><span className="badge badge--success">Open</span></td>
                                    <td>
                                        <span className="badge badge--danger">High</span></td>
                                    <td>4 months ago </td>
                                    <td>
                                        <a className="btn btn-outline--base btn--sm" href="/dashboard/support/ticket/view/450578">
                                            <i className="la la-desktop"></i>View
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        #564152
                                    </td>
                                    <td>
                                        Ea iste perspiciatis
                                    </td>
                                    <td><span className="badge badge--dark">Closed</span></td>
                                    <td>
                                        <span className="badge badge--danger">High</span></td>
                                    <td>1 year ago </td>
                                    <td>
                                        <Link className="btn btn-outline--base btn--sm" to="/dashboard/support/ticket/view/564152">
                                            <i className="la la-desktop"></i> View
                                        </Link>
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

export default SupportTicket