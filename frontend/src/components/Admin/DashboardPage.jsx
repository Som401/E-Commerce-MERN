import Dashboard from './Dashboard';
import MainData from './MainData';
import MetaData from '../Layouts/MetaData';
import Header from '../Layouts/Header/Header';

const DashboardPage = () => {
    return (
        <>
            <MetaData title="Admin Dashboard" />
            <Header />
            <Dashboard activeTab={0}>
                <MainData />
            </Dashboard>
        </>
    );
};

export default DashboardPage;
