import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Layouts/Loader';

const PublicRoute = ({ children }) => {

    const { loading, isAuthenticated } = useSelector((state) => state.user);

    if (loading) {
        return <Loader />;
    }

    if (isAuthenticated) {
        return <Navigate to="/account" />;
    }

    return children;
};

export default PublicRoute;
