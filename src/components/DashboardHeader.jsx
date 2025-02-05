import { useLocation } from "react-router-dom";
import Tab from "../dashboard/settings/Tab";
import DSPTab from "../dashboard/dps/Tab";
import SupportTab from "../dashboard/support/Tab";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../lib/redux/slices/global";

const DashboardHeader = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { pageTitle } = useSelector((state) => state.global);

    const isSettingsPage = location.pathname.includes('settings');
    const isDSPPage = location.pathname.includes('dsp');
    const isSupportPage = location.pathname.includes('support');

    return (
        <div className="dashboard-header">
            <div className="row gy-3 gy-lg-4">
                <div className="col-6 d-lg-none d-inline order-1">
                    {/* Toggle menu on click */}
                    <span className="dashboard-body__bar-icon" onClick={() => dispatch(toggleMenu())}>
                        <i className="fas fa-bars"></i>
                    </span>
                </div>

                <div className="col-lg-9 col-7 order-lg-2 order-3">
                    <div className="dashboard-header__details order-lg-fast order-0">
                        <h4 className="dashboard-header__title mb-0">{pageTitle}</h4>
                    </div>
                </div>
                
                {isSettingsPage && <Tab />}
                {isDSPPage && <DSPTab />}
                {isSupportPage && <SupportTab />}
            </div>
        </div>
    );
};

export default DashboardHeader;
