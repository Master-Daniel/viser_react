/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux"
import MasterLayout from "../../layout/MasterLayout"
import { useEffect, useState } from "react"
import { setPageTitle } from "../../lib/redux/slices/global"
import { Link } from "react-router-dom"
import { UserApi } from "../../lib/hooks/User"
import { useQuery } from "react-query"
import { formatDate } from "../../util/custom-functions"

const WithdrawHistory = () => {

    const dispatch = useDispatch()
    const [list, setList] = useState([])

    const { refetch } = useQuery('withdraw-history', UserApi.withdrawHistory, {
        onSuccess: ({ data }) => {
            console.log(data)
            if (data.status == 'success') {
                setList(data.data.withdrawals)
            }
        },
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        refetch()
        dispatch(setPageTitle('Withdraw'))
    }, [])

    return (
        <MasterLayout>
            <div className="card custom--card overflow-hidden">
                <div className="card-header">
                    <div className="header-nav flex-sm-nowrap mb-0">
                        <form className="d-flex flex-wrap gap-2">
                            <div className="input-group w-auto flex-fill">
                                <input type="search" name="search" className="form-control bg--white" placeholder="TRX No." />
                                <button className="btn btn--base" type="submit"><i className="la la-search"></i></button>
                            </div>
                        </form>
                        <Link className="btn btn--base" to="/dashboard/withdraw">
                            <i className="las la-wallet"></i> Withdraw Money
                        </Link>
                    </div>
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
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list.data?.length > 0 && list.data.map((item, index) => (
                                        <tr key={index}>
                                            <td>#{item.trx}</td>
                                            <td>${Number(item.amount).toFixed(2)}</td>
                                            <td>${Number(item.charge).toFixed(2)}</td>
                                            <td>${Number(item.after_charge).toFixed(2)}</td>
                                            <td>
                                                <em>{formatDate(item.created_at)}</em>
                                            </td>
                                            <td>
                                                <span className="text--primary" title="Method Name">{item.method.name}</span>
                                            </td>
                                            <td>
                                                <span className={`badge badge--${item.status == 2 ? 'warning' : 'success'}`}>{item.status == 2 ? 'Pending' : 'Approved'}</span>
                                            </td>
                                            <td>
                                                <Link to={`/dashboard/withdraw/details/${item.trx}`} className="btn btn--sm btn-outline--base"><i className="la la-desktop"></i> Details</Link>
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

export default WithdrawHistory