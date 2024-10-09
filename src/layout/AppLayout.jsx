import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import '../assets/css/_main.css'

const AppLayout = ({ children }) => {

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
                <div className="middle">
                    <div className="bar bar1"></div>
                    <div className="bar bar2"></div>
                    <div className="bar bar3"></div>
                    <div className="bar bar4"></div>
                    <div className="bar bar5"></div>
                    <div className="bar bar6"></div>
                    <div className="bar bar7"></div>
                    <div className="bar bar8"></div>
                </div>
            </div>
            <div className="body-overlay"></div>
            <div className="sidebar-overlay"></div>
            {children}
        </React.Fragment>
    )
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout