import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Loader from '../Layouts/Loader';
import MetaData from '../Layouts/MetaData';
import Header from '../Layouts/Header/Header';
import AddressBook from './AddressBook';

const ManageAddresses = () => {

    const { loading } = useSelector((state) => state.user);

    return (
        <>
            <MetaData title="Manage Addresses | Flipkart" />
            <Header />

            {loading ? <Loader /> : (
                <main className="w-full mt-20 sm:mt-16">
                    <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
                        <Sidebar activeTab={"addresses"} />
                        <div className="flex-1 overflow-hidden shadow bg-white">
                            <div className="m-4 sm:mx-8 sm:my-6">
                                <AddressBook />
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
};

export default ManageAddresses;
