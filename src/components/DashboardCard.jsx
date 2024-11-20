import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

const DashboardCard = ({ title, amount, icon }) => {
    return (
        <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-xsm-6">
            <Link to="#" className="d-block">
                <div className="dashboard-widget">
                    <div className="dashboard-widget__content flex-align">
                        <span className="dashboard-widget__icon flex-center">
                            <i className={`las la-${icon}`}></i>
                        </span>
                        <span className="dashboard-widget__text">{title}</span>
                    </div>
                    <h4 className="dashboard-widget__number">{amount}</h4>
                </div>
            </Link>
        </div>
    )
}

DashboardCard.propTypes = {
    title: PropTypes.node.isRequired,
    amount: PropTypes.node.isRequired,
    icon: PropTypes.node.isRequired,
};

export default DashboardCard