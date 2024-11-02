/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom"
import MasterLayout from "../../layout/MasterLayout"
import { useDispatch } from "react-redux"
import { setPageTitle } from "../../lib/redux/slices/global"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { UserApi } from "../../lib/hooks/User"
import { formatDate } from "../../util/custom-functions"

const SupportTicket = () => {

    const dispatch = useDispatch()
    const [tickets, setTickets] = useState([])

    const { refetch } = useQuery('support-tickets', UserApi.supportTickets, {
        onSuccess: ({ data }) => {
            if (data.status == 'success') {
                setTickets(data.data.tickets)
            }
        }
    })

    useEffect(() => {
        refetch()
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
                                {
                                    tickets.data?.length > 0 && tickets.data.map((ticket, index) => (
                                        <tr key={index}>
                                            <td>#</td>
                                            <td>{ticket.subject}</td>
                                            <td><span className="badge badge--dark">{ticket.status}</span></td>
                                            <td><span className="badge badge--danger">{ticket.priority}</span></td>
                                            <td>{formatDate(ticket.last_reply)}</td>
                                            <td>
                                                <Link className="btn btn-outline--base btn--sm" to={`/dashboard/support/ticket/view/${ticket.id}`}>
                                                    <i className="la la-desktop"></i> View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export default SupportTicket