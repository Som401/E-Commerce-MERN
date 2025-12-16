import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Layouts/Loader';

const ProtectedRoute = ({ isAdmin, children }) => {

    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    if (loading === undefined || loading) {
        return <Loader />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Only check for admin role if isAdmin prop is true
    if (isAdmin && user?.role !== "admin") {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
