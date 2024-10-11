import { Link, useLocation } from "react-router-dom"

const Tab = () => {
    const location = useLocation();

    const menuActive = (path) => {
        return location.pathname.includes(path) ? 'active' : '';
    };

    return (
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
            <div className="d-flex nav-buttons flex-align gap-md-3 gap-2">
                <Link to="/dashboard/fdr/list" className={`btn btn-outline--base ${menuActive('/fdr/list')}`}>My FDR List</Link>
                <Link to="/dashboard/fdr/plans" className={`btn btn-outline--base ${menuActive('/fdr/plans')}`}>FDR Plans</Link>
            </div>
        </div>
    )
}

export default Tab