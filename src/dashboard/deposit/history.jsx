/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom'
import MasterLayout from '../../layout/MasterLayout'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { setPageTitle } from '../../lib/redux/slices/global'
import { useQuery } from 'react-query'
import { UserApi } from '../../lib/hooks/User'
import Pagination from '../../components/Pagination'
import { formatDate } from '../../util/custom-functions'

const DepositHistory = () => {

    const dispatch = useDispatch()
    const [list, setList] = useState([])

    const { refetch } = useQuery('deposit-history', UserApi.depositHistory, {
        onSuccess: ({ data }) => {
            console.log(data)
            if (data.status == 'success') {
                setList(data.data)
            }
        },
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        refetch()
        dispatch(setPageTitle('Deposit'))
    }, [])

    return (
        <MasterLayout>
            <div className="header-nav flex-sm-nowrap mb-0">
                <form className="d-flex flex-wrap gap-2">
                    <div className="input-group w-auto flex-fill">
                        <input type="search" name="search" className="form-control bg--white" placeholder="TRX No." value="" />
                        <button className="btn btn--base" type="submit"><i className="la la-search"></i></button>
                    </div>
                </form>
                <Link className="btn btn--base" to="/dashboard/deposit/"><i className="las la-plus"></i> Deposit Now</Link>
            </div>
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table--responsive--md">
                        <thead>
                            <tr>
                                <th>TRX No.</th>
                                <th>Amount</th>
                                <th>Charge</th>
                                {/* <th>After Charge</th> */}
                                <th>Initiated At</th>
                                <th>Method</th>
                                <th>Status</th>
                                {/* <th>Details</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list.deposits?.data?.length > 0 && list.deposits.data.map((item, index) => (
                                    <tr key={index}>
                                        <td>#{item.trx}</td>
                                        <td>${Number(item.amount).toFixed(2)}</td>
                                        <td>${Number(item.charge).toFixed(2)}</td>
                                        <td><em>{formatDate(item.created_at)}</em></td>
                                        <td>
                                            <span className="text-primary" title="Gateway Name">{item.gateway.name}</span>
                                        </td>
                                        <td><span className={`badge badge--${item?.status == 1 ? 'success' : 'warning' }`}>{item?.status == 1 ? 'Approved' : 'Pending'}</span></td>
                                        {/* <td>
                                            <Link href={`/dashboard/deposit/details/${item.trx}`} className="btn btn--sm btn-outline--base"><i className="la la-desktop"></i> Details</Link>
                                        </td> */}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card-footer">
                <Pagination 
                    current_page={list.deposits?.current_page} 
                    next_page_url={list.deposits?.next_page_url} 
                    from={list.deposits?.from} to={list.deposits?.to} 
                    total={list.deposits?.total} 
                    last_page={list.deposits?.last_page} 
                    last_page_url={list.deposit?.last_page_url}
                    links={list.deposits?.links}
                    prev_page_url={list.deposits?.prev_page_url}
                />
            </div>
        </MasterLayout>
    )
}

export default DepositHistory