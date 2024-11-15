/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom"
import MasterLayout from "../../layout/MasterLayout"
import Tab from "./Tab"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { setPageTitle } from "../../lib/redux/slices/global"
import { UserApi } from "../../lib/hooks/User"
import { useQuery } from "react-query"
import { formatDate } from "../../util/custom-functions"
import Pagination from "../../components/Pagination"

const TransfersList = () => {

    const dispatch = useDispatch()
    const [list, setList] = useState([])

    const { refetch } = useQuery('transfer-history', UserApi.transferHistory, {
        onSuccess: ({ data }) => {
            if (data.status == 'success') {
                setList(data.data.transfers)
            }
        },
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        refetch()
        dispatch(setPageTitle('Transfer History'))
    }, [])

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
                                    <th>Account No.</th>
                                    <th>Bank</th>
                                    <th>Amount</th>
                                    <th>Charge</th>
                                    <th>Paid Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list.data?.length > 0 && list.data.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <span className="text--dark fw-bold">#{item.trx}</span>
                                            </td>
                                            <td>
                                                <em>{formatDate(item.created_at)}</em>
                                            </td>
                                            <td>
                                                {item.account_number}
                                            </td>
                                            <td>
                                                <span className="text--warning fw-bold">Wire Transfer</span>
                                                <br />
                                                <button className="badge badge--info wire-transfer" data-id="213" type="button"> <i className="la la-eye"></i> Recipient Info</button>
                                            </td>
                                            <td>${Number(item.amount).toFixed(2)}</td>
                                            <td>${Number(item.charge).toFixed(2)}</td>
                                            <td>$51.00</td>
                                            <td>
                                                <span className={`badge badge--${item.status == 0 ? 'warning' : 'Approved'}`}>{item.status == 0 ? 'Pending' : 'Approved'}</span>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer">
                    {/* <Pagination /> */}
                </div>
            </div>
        </MasterLayout>
    )
}

export default TransfersList