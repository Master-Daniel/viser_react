import { useDispatch } from "react-redux"
import { setIsLoggedIn } from "../lib/redux/slices/global"
import { Link, useLocation } from "react-router-dom"
import { notifySuccess } from "../util/custom-functions"

const Navigation = () => {

    const dispatch = useDispatch()
    const location = useLocation();

    const logOut = () => {
        dispatch(setIsLoggedIn(false))
        notifySuccess("Logged out successfully");
    }

    const menuActive = (path) => {
        return location.pathname.includes(path) ? 'active' : '';
    };

    return (
        <div className="sidebar-menu flex-between">
            <div className="sidebar-menu__inner">
                <span className="sidebar-menu__close d-lg-none d-block flex-between"><i className="fas fa-times"></i></span>
                <div className="sidebar-logo">
                    <Link to="/dashboard" className="sidebar-logo__link"><img src="" alt="" /></Link>
                </div>
                <ul className="sidebar-menu-list">
                    <li className="menu-title pt-0">MENU</li>

                    <li className={`sidebar-menu-list__item ${menuActive('/welcome')}`}>
                        <Link to="/dashboard/welcome" className="sidebar-menu-list__link">
                            <span className="icon"><i className="las la-landmark"></i></span>
                            <span className="text">Dashboard</span>
                        </Link>
                    </li>

                    <li className={`sidebar-menu-list__item ${menuActive('deposit')}`}>
                        <Link to="/dashboard/deposit" className="sidebar-menu-list__link">
                            <span className="icon"><i className="las la-wallet"></i></span>
                            <span className="text">Deposit</span>
                        </Link>
                    </li>

                    <li className={`sidebar-menu-list__item ${menuActive('/dashboard/withdraw')}`}>
                        <Link to="/dashboard/withdraw" className="sidebar-menu-list__link">
                            <span className="icon"><i className="las la-money-bill"></i></span>
                            <span className="text">Withdraw</span>
                        </Link>
                    </li>

                    <li className={`sidebar-menu-list__item ${menuActive('fdr')}`}>
                        <Link to="/dashboard/fdr/list" className="sidebar-menu-list__link">
                            <span className="icon"><i className="las la-file-invoice-dollar"></i></span>
                            <span className="text">FDR</span>
                        </Link>
                    </li>

                    <li className={`sidebar-menu-list__item ${menuActive('dps')}`}>
                        <Link to="/dashboard/dps/list" className="sidebar-menu-list__link">
                            <span className="icon"><i className="las la-piggy-bank"></i></span>
                            <span className="text">DPS</span>
                        </Link>
                    </li>

                    <li className={`sidebar-menu-list__item ${menuActive('loan')}`}>
                        <Link to="/dashboard/loan/list" className="sidebar-menu-list__link">
                            <span className="icon"><i className="las la-hand-holding-usd"></i></span>
                            <span className="text">Loan</span>
                        </Link>
                    </li>

                    <li className={`sidebar-menu-list__item ${menuActive('mobile-top-up')}`}>
                        <Link to="/dashboard/mobile-top-up" className="sidebar-menu-list__link">
                            <span className="icon"><i className="las la-mobile-alt"></i></span>
                            <span className="text">Airtime</span>
                        </Link>
                    </li>

                    <li className={`sidebar-menu-list__item ${menuActive('transfer')}`}>
                        <Link to="/dashboard/transfer/all" className="sidebar-menu-list__link">
                            <span className="icon"><i className="las la-exchange-alt"></i></span>
                            <span className="text">Transfer</span>
                        </Link>
                    </li>

                    <li className="sidebar-menu-list__item {{ menuActive('user.transaction.history') }}">
                        <Link to="" className="sidebar-menu-list__link">
                            <span className="icon"><i className="las la-sync"></i></span>
                            <span className="text">Transactions</span>
                        </Link>
                    </li>

                    <li className="sidebar-menu-list__item {{ menuActive('user.referral.users') }}">
                        <Link to="" className="sidebar-menu-list__link">
                            <span className="icon"><i className="las la-user-friends"></i></span>
                            <span className="text">Referral</span>
                        </Link>
                    </li>

                    <li className="sidebar-menu-list__item {{ menuActive('ticket.*') }}">
                        <Link to="" className="sidebar-menu-list__link">
                            <span className="icon"><i className="las la-ticket-alt"></i></span>
                            <span className="text">Support Ticket</span>
                        </Link>
                    </li>

                    <li className="sidebar-menu-list__item {{ menuActive(['user.profile.setting', 'user.change.password', 'user.twofactor']) }}">
                        <Link to="" className="sidebar-menu-list__link">
                            <span className="icon"><i className="las la-cog"></i></span>
                            <span className="text">Setting</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="user-logout">
                <div className="sidebar-menu-list__item w-100">
                    <Link to="#" onClick={logOut} className="sidebar-menu-list__link logout logout-btn">
                        <span className="icon"><i className="las la-sign-out-alt"></i></span>
                        <span className="text">Log Out</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navigation