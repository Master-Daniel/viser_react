import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types'; // Import prop-types

const PublicRoute = ({ children }) => {
    const { isLoggedIn } = useSelector((state) => state.global);

    return !isLoggedIn ? children : <Navigate to="/dashboard" />;
};

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PublicRoute;
