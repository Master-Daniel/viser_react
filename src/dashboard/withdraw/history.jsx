/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux"
import MasterLayout from "../../layout/MasterLayout"
import { useEffect, useState } from "react"
import { setPageTitle } from "../../lib/redux/slices/global"
import { Link } from "react-router-dom"
import { UserApi } from "../../lib/hooks/User"
import { useQuery } from "react-query"

const WithdrawHistory = () => {

    const dispatch = useDispatch()
    const [list, setList] = useState([])

    const { refetch } = useQuery('withdraw-history', UserApi.withdrawHistory, {
        onSuccess: ({ data }) => {
            console.log(data)
            if (data.status == 'success') {
                console.log(data.data.withdrawals)
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
                                <tr>
                                    <td>#DCWUDPJVPKX5</td>
                                    <td>$20.00</td>
                                    <td>$0.00</td>
                                    <td>$20.00</td>
                                    <td>
                                        <em>2023-04-17 09:25 PM </em>
                                    </td>
                                    <td>
                                        <span className="text--primary" title="Method Name">Mobile Money</span>
                                    </td>
                                    <td>
                                        <span className="badge badge--warning">Pending</span>
                                    </td>
                                    <td>
                                        <Link to="/dashboard/withdraw/details/DCWUDPJVPKX5" className="btn btn--sm btn-outline--base"><i className="la la-desktop"></i> Details</Link>
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

export default WithdrawHistory