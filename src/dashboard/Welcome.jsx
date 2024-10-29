/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import DashboardCard from '../components/DashboardCard'
import MasterLayout from '../layout/MasterLayout'
import { notifyError, notifySuccess } from '../util/custom-functions';
import { useEffect, useState } from 'react';
import { setPageTitle, setProfile } from '../lib/redux/slices/global';
import { useQuery } from 'react-query';
import { UserApi } from '../lib/hooks/User';
import { Link } from 'react-router-dom';

const Welcome = () => {

    const dispatch = useDispatch()
    const [referralLink, setReferralLink] = useState('')
    const { profile } = useSelector((state) => state.global)

    const { refetch, error } = useQuery('user-profile', UserApi.getUserProfile, {
        onSuccess: ({ data }) => {
            dispatch(setProfile(data.data.user));
        },
        onError: notifyError(error.message.error),
        refetchOnWindowFocus: true,
    });
    
    const { refetch: refetchReferralLink, error: referralLinkError } = useQuery('referral-link', UserApi.getUserReferralLink, {
        onSuccess: ({ data }) => {
            setReferralLink(data.data.referral_link);
        },
        onError: notifyError(referralLinkError.message.error),
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        dispatch(setPageTitle('Dashboard'))
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
                    title="Pending Deposits"
                    icon="wallet"
                    amount="21000"
                />

                <DashboardCard
                    title="Pending Withdrawals"
                    icon="money-check"
                    amount="21000"
                />

                <DashboardCard
                    title="Today Transactions"
                    icon="exchange-alt"
                    amount="21000"
                />

                <DashboardCard
                    title="Running FDR"
                    icon="money-bill"
                    amount="21000"
                />

                <DashboardCard
                    title="Running DPS"
                    icon="box-open"
                    amount="21000"
                />

                <DashboardCard
                    title="Running Loan"
                    icon="hand-holding-usd"
                    amount="21000"
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
                                            {/* <th>Trx</th> */}
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>C69F8RX238KR</td>
                                            <td>08 Aug, 2024 12:08 PM</td>
                                            <td>$200.00</td>
                                            {/* <td className="fw-bold">
                                        {{ showAmount($credit->amount) }} {{ __($general->cur_text) }}
                                    </td> */}
                                        </tr>
                                        {/* <tr>
                                    <td colspan="100%" className="text-center">{{ __($emptyMessage) }}</td>
                                </tr> */}
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
                                            {/* <th>Trx</th> */}
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>C69F8RX238KR</td>
                                            <td>08 Aug, 2024 12:08 PM</td>
                                            <td>$200.00</td>
                                            {/* <td className="fw-bold">
                                        {{ showAmount($credit->amount) }} {{ __($general->cur_text) }}
                                    </td> */}
                                        </tr>
                                        {/* <tr>
                                    <td colspan="100%" className="text-center">{{ __($emptyMessage) }}</td>
                                </tr> */}
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