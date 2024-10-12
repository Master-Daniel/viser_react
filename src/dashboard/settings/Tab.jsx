import { Link, useLocation } from "react-router-dom"

const Tab = () => {

    const location = useLocation();

    const menuActive = (path) => {
        return location.pathname.includes(path) ? 'active' : '';
    };

    return (
        <div className="col-12 order-lg-3 order-4">
            <div className="d-flex nav-buttons flex-align gap-md-3 gap-2">
                <Link to="/dashboard/settings/profile-setting" className={`btn btn-outline--base ${menuActive('profile-setting')}`}>Profile Setting</Link>
                <Link to="/dashboard/settings/change-password" className={`btn btn-outline--base ${menuActive('change-password')}`}>Change Password</Link>
                <Link to="/dashboard/settings/twofactor" className={`btn btn-outline--base ${menuActive('twofactor')}`}>2FA Security</Link>
            </div>
        </div>
    )
}

export default Tab