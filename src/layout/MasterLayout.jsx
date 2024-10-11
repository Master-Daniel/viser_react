import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import Navigation from '../components/Navigation';
import DashboardHeader from '../components/DashboardHeader';
import '../assets/css/main.css'
import { useSelector } from 'react-redux';

const MasterLayout = ({ children }) => {

    const { isModalVisible } = useSelector((state) => state.global)

    useEffect(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 5000)
        }
    }, []);

    return (
        <React.Fragment>
            <div className="preloader">
                <div className="loader-p"></div>
            </div>
            <div className="body-overlay"></div>
            <div className="sidebar-overlay"></div>
            <div className="dashboard position-relative">
                <div className="dashboard__inner flex-wrap">
                    <Navigation />
                    <div className="dashboard__right">
                        <DashboardHeader />
                        <div className="dashboard-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            {isModalVisible && <div className="modal-backdrop fade show"></div>}
        </React.Fragment>
    )
}

MasterLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MasterLayout