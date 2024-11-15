/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import DashboardCard from '../components/DashboardCard'
import MasterLayout from '../layout/MasterLayout'
import { formatDate, notifyError, notifySuccess } from '../util/custom-functions';
import { useEffect, useState } from 'react';
import { setPageTitle, setProfile } from '../lib/redux/slices/global';
import { useQuery } from 'react-query';
import { UserApi } from '../lib/hooks/User';
import { Link } from 'react-router-dom';

const Welcome = () => {

    const dispatch = useDispatch()
    const [referralLink, setReferralLink] = useState('')
    const [dashboardData, setDahsboardData] = useState([])
    const { profile } = useSelector((state) => state.global)

    const { refetch } = useQuery('user-profile', UserApi.getUserProfile, {
        onSuccess: ({ data }) => {
            dispatch(setProfile(data.data.user));
        },
        refetchOnWindowFocus: true,
    });

    const { refetch: dashboard } = useQuery('dashboard', UserApi.getDashboardData, {
        onSuccess: ({ data }) => {
            setDahsboardData(data)
        },
        refetchOnWindowFocus: true,
    });

    const { refetch: refetchReferralLink } = useQuery('referral-link', UserApi.getUserReferralLink, {
        onSuccess: ({ data }) => {
            setReferralLink(data.data.referral_link);
        },
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        dispatch(setPageTitle('Dashboard'))
        dashboard()
        refetch()
        refetchReferralLink()
    }, [])

    const copyToClipboard = () => {
        const urlText = document.getElementById('ref').innerText;
        navigator.clipboard.writeText(urlText).then(() => {
            notifySuccess(`Copied - ${urlText}`);
        })
    };

    return (
        <MasterLayout>
            <div className="row gy-lg-4 gy-md-3 gy-3 align-items-center">

                <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                    <Link to="/dashboard/transactions" className="d-block">
                        <div className="dashboard-widget ballance">
                            <div className="dashboard-widget__content">
                                <span className="dashboard-widget__text">Balance</span>
                                <h3 className="dashboard-widget__number">{profile.balance}</h3>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-xl-8 col-lg-12 col-md-8 order-xl-0 order-lg-first order-md-0 order-sm-first">
                    <div className="dashboard-widget refer">
                        <div className="custom-border flex-align flex-between">
                            <div className="refer__content">
                                <h5 className="refer__title">My Referral Link:</h5>
                                <h5 className="refer__link" id="ref">{referralLink}</h5>
                            </div>
                            <span className="refer__icon dashboard-widget__icon flex-center copy-icon copyBtn" onClick={copyToClipboard}>
                                <i className="icon-copy"></i>
                            </span>
                        </div>
                    </div>
                </div>

                <DashboardCard
                    title="Total Deposits"
                    icon="wallet"
                    amount={dashboardData?.data?.dashboard_data?.total_deposit}
                />

                <DashboardCard
                    title="Total Withdrawals"
                    icon="money-check"
                    amount={dashboardData?.data?.dashboard_data?.total_withdraw}
                />

                <DashboardCard
                    title="Today Transactions"
                    icon="exchange-alt"
                    amount={dashboardData?.data?.dashboard_data?.total_trx}
                />

                <DashboardCard
                    title="Running FDR"
                    icon="money-bill"
                    amount={dashboardData?.data?.dashboard_data?.total_fdr}
                />

                <DashboardCard
                    title="Running DPS"
                    icon="box-open"
                    amount={dashboardData?.data?.dashboard_data?.total_dps}
                />

                <DashboardCard
                    title="Running Loan"
                    icon="hand-holding-usd"
                    amount={dashboardData?.data?.dashboard_data?.total_loan}
                />

                <div className="pt-60">
                    <div className="row gy-4 justify-content-center">
                        <div className="col-xxl-6">
                            <div className="dashboard-table">
                                <h5 className="dashboard-table__title card-header__title text-dark">
                                    Latest Credits
                                </h5>
                                <table className="table table--responsive--md">
                                    <thead>
                                        <tr>
                                            <th>S.N.</th>
                                            <th>Date</th>
                                            <th>Trx</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dashboardData?.latest_credits?.data?.length > 0 && dashboardData?.latest_credits?.data.map((credit, index) => (
                                                <tr key={index}>
                                                    <td>{credit.id}</td>
                                                    <td>{formatDate(credit.created_at)}</td>
                                                    <td>{credit.trx}</td>
                                                    <td>${Number(credit.amount).toFixed(2)}</td>
                                                    <td className="fw-bold"></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-xxl-6">
                            <div className="dashboard-table">
                                <h5 className="dashboard-table__title card-header__title text-dark">
                                    Latest Debits
                                </h5>
                                <table className="table table--responsive--md">
                                    <thead>
                                        <tr>
                                            <th>S.N.</th>
                                            <th>Date</th>
                                            <th>Trx</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dashboardData?.latest_debits?.data?.length > 0 && dashboardData?.latest_credits?.data.map((debits, index) => (
                                                <tr key={index}>
                                                    <td>{debits.id}</td>
                                                    <td>{formatDate(debits.created_at)}</td>
                                                    <td>{debits.trx}</td>
                                                    <td>${Number(debits.amount).toFixed(2)}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export default Welcome