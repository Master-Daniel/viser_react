import { Link, useLocation } from "react-router-dom"

const Tab = () => {

    const location = useLocation();

    const menuActive = (path) => {
        return location.pathname.includes(path) ? 'active' : '';
    };

    return (
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
            <div className="d-flex nav-buttons flex-align gap-md-3 gap-2">
                <Link to="/dashboard/transfer/all" className={`btn btn-outline--base ${menuActive('/transfer/all')}`}>
                    Transfer History
                </Link>
                <Link to="/dashboard/transfer/with-in" className={`btn btn-outline--base ${menuActive('/transfer/with-in')}`}>
                    Transfer Within ViserBank
                </Link>
                <Link to="/dashboard/transfer/others" className={`btn btn-outline--base ${menuActive('/transfer/others')}`}>
                    Transfer to Other Bank
                </Link>
                <Link to="/dashboard/transfer/wire" className={`btn btn-outline--base ${menuActive('/transfer/wire')}`}>
                    Wire Transfer
                </Link>
            </div>
            <div className="header-nav mb-0 flex-grow-1">
            </div>
        </div>
    )
}

export default Tab