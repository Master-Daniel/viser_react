import { useDispatch, useSelector } from "react-redux"
import { toggleMenu, setIsLoggedIn } from "../lib/redux/slices/global"
import { Link, useLocation } from "react-router-dom"
import { notifyError, notifySuccess } from "../util/custom-functions"
import { useMutation } from "react-query"
import { AuthApi } from "../lib/hooks/Auth"
import { useEffect } from "react"

const Navigation = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const { isMenuOpen } = useSelector((state) => state.global);
    
    const { mutate } = useMutation("logout", AuthApi.logout);;

    const logOut = () => {
        mutate({}, {
            onSuccess: ({ data }) => {
                notifySuccess(data.message.success)
                dispatch(setIsLoggedIn(false))
            },
            onError: (error) => {
                notifyError(error.message.error)
            }
        })
    }

    useEffect(() => {
        if (window.innerWidth >= 992) {
            dispatch(toggleMenu(true)); // Ensure sidebar opens on desktop
        }
    }, []);
    

    const menuActive = (path) => {
        return location.pathname.includes(path) ? 'active' : '';
    };

    const isDesktop = window.innerWidth >= 992;

    return (
        <div className={`sidebar-menu flex-between ${isMenuOpen || isDesktop ? "open" : "closed"} d-lg-block`}>
            <div className="sidebar-menu__inner">
                {/* Close button toggles menu */}
                <span className="sidebar-menu__close d-lg-none d-block flex-between" onClick={() => dispatch(toggleMenu())}>
                    <i className="fas fa-times"></i>
                </span>
                <div className="sidebar-logo">
                    <Link to="/dashboard/welcome" className="sidebar-logo__link">
                        <img src="/assets/images/blue-logo.png" alt="" />
                    </Link>
                </div>
                <ul className="sidebar-menu-list">
                    <li className="menu-title pt-0">MENU</li>

                    <li className={`sidebar-menu-list__item ${menuActive('welcome')}`}>
                        <Link to="/dashboard/welcome" className="sidebar-menu-list__link">
                            <span className="icon"><i className="las la-landmark"></i></span>
                            <span className="text">Dashboard</span>
                        </Link>
                    </li>

                    <li className={`sidebar-menu-list__item ${menuActive('deposit')}`}>
                        <Link to="/dashboard/deposit/history" className="sidebar-menu-list__link">
                            <span className="icon"><i className="las la-wallet"></i></span>
                            <span className="text">Deposit</span>
                        </Link>
                    </li>

                    <li className={`sidebar-menu-list__item ${menuActive('withdraw')}`}>
                        <Link to="/dashboard/withdraw/history" className="sidebar-menu-list__link">
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

                    {/* <li className={`sidebar-menu-list__item ${menuActive('dps')}`}>
                        <Link to="/dashboard/dps/list" className="sidebar-menu-list__link">
                            <span className="icon"><i className="las la-piggy-bank"></i></span>
                            <span className="text">DPS</span>
                        </Link>
                    </li> */}

                    <li className={`sidebar-menu-list__item ${menuActive('loan')}`}>
                        <Link to="/dashboard/loan/list" className="sidebar-menu-list__link">
                            <span className="icon"><i className="las la-hand-holding-usd"></i></span>
                            <span className="text">Loan</span>
                        </Link>
                    </li>

                    {/* <li className={`sidebar-menu-list__item ${menuActive('mobile-top-up')}`}>
                        <Link to="/dashboard/mobile-top-up" className="sidebar-menu-list__link">
                            <span className="icon"><i className="las la-mobile-alt"></i></span>
                            <span className="text">Airtime</span>
                        </Link>
                    </li> */}

                    <li className={`sidebar-menu-list__item ${menuActive('transfer')}`}>
                        <Link to="/dashboard/transfer/all" className="sidebar-menu-list__link">
                            <span className="icon"><i className="las la-exchange-alt"></i></span>
                            <span className="text">Transfer</span>
                        </Link>
                    </li>

                    <li className={`sidebar-menu-list__item ${menuActive('transactions')}`}>
                        <Link to="/dashboard/transactions" className="sidebar-menu-list__link">
                            <span className="icon"><i className="las la-sync"></i></span>
                            <span className="text">Transactions</span>
                        </Link>
                    </li>

                    {/* <li className="sidebar-menu-list__item {{ menuActive('user.referral.users') }}">
                        <Link to="" className="sidebar-menu-list__link">
                            <span className="icon"><i className="las la-user-friends"></i></span>
                            <span className="text">Referral</span>
                        </Link>
                    </li> */}

                    <li className={`sidebar-menu-list__item ${menuActive('support')}`}>
                        <Link to="/dashboard/support/list" className="sidebar-menu-list__link">
                            <span className="icon"><i className="las la-ticket-alt"></i></span>
                            <span className="text">Support Ticket</span>
                        </Link>
                    </li>

                    <li className={`sidebar-menu-list__item ${menuActive('settings')}`}>
                        <Link to="/dashboard/settings/profile-setting" className="sidebar-menu-list__link">
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