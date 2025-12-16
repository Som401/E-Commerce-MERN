import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Layouts/Loader';

const ProtectedRoute = ({ children }) => {

    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    if (loading === undefined || loading) {
        return <Loader />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (user?.role !== "admin") {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
