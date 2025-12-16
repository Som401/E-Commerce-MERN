import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Layouts/Loader';

const PublicRoute = ({ children }) => {

    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    if (loading) {
        return <Loader />;
    }

    if (isAuthenticated) {
        // Redirect based on user role
        if (user?.role === 'admin') {
            return <Navigate to="/admin/dashboard" />;
        }
        return <Navigate to="/" />;
    }

    return children;
};

export default PublicRoute;
