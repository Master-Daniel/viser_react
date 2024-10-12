import { Link, useLocation } from "react-router-dom"

const Tab = () => {

    const location = useLocation();

    const menuActive = (path) => {
        return location.pathname.includes(path) ? 'active' : '';
    };
    
    return (
        <div className="col-12 order-lg-3 order-4">
            <div className="d-flex nav-buttons flex-align gap-md-3 gap-2">
                <Link to="/dashboard/support/ticket/new" className={`btn btn-outline--base ${menuActive('/support/ticket/new')}`}>Open New Ticket</Link>
                <Link to="/dashboard/support/list" className={`btn btn-outline--base ${menuActive('/support/list')}`}>My Tickets</Link>
            </div>
        </div>
    )
}

export default Tab