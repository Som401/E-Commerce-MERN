import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Loader from '../Layouts/Loader';
import MetaData from '../Layouts/MetaData';
import Header from '../Layouts/Header/Header';

const Account = () => {

    const { user, loading } = useSelector((state) => state.user);

    return (
        <>
            <MetaData title="My Profile | Flipkart" />
            <Header />

            {loading ? <Loader /> : (
                <>
                    <main className="w-full mt-20 sm:mt-16">

                        <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">

                            <Sidebar activeTab={"profile"} />

                            <div className="flex-1 overflow-hidden shadow bg-white">

                                <div className="flex flex-col gap-12 m-4 sm:mx-8 sm:my-6">

                                    {/* Profile Avatar Section */}
                                    <div className="flex flex-col gap-5 items-start">
                                        <div className="flex items-center gap-6 w-full">
                                            <img
                                                draggable="false"
                                                className="w-24 h-24 rounded-full object-cover border-2 border-primary-blue"
                                                src={user.avatar?.url || "https://res.cloudinary.com/demo/image/upload/v1/avatar_placeholder.png"}
                                                alt={user.name}
                                            />
                                            <div className="flex flex-col gap-1">
                                                <span className="font-medium text-xl">{user.name}</span>
                                                <span className="text-sm text-gray-500">{user.email}</span>
                                                <Link to="/account/update" className="text-sm text-primary-blue font-medium mt-2">Edit Profile Picture</Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-5 items-start">

                                        <span className="font-medium text-lg">Personal Information</span>

                                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">

                                            <div className="flex flex-col gap-0.5 w-full sm:w-1/2 px-3 py-1.5 rounded-sm border inputs cursor-not-allowed bg-gray-100">
                                                <label className="text-xs text-gray-500">Name</label>
                                                <input type="text" value={user.name} className="text-sm outline-none border-none cursor-not-allowed" disabled />
                                            </div>

                                            <div className="flex flex-col gap-0.5 w-full sm:w-1/2 px-3 py-1.5 rounded-sm border inputs cursor-not-allowed bg-gray-100">
                                                <label className="text-xs text-gray-500">Gender</label>
                                                <input type="text" value={user.gender} className="text-sm outline-none border-none cursor-not-allowed" disabled />
                                            </div>

                                        </div>

                                    </div>

                                    <div className="flex flex-col gap-5 items-start">

                                        <span className="font-medium text-lg">Email Address</span>

                                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">

                                            <div className="flex flex-col gap-0.5 w-full sm:w-1/2 px-3 py-1.5 rounded-sm border inputs cursor-not-allowed bg-gray-100">
                                                <label className="text-xs text-gray-500">Email</label>
                                                <input type="email" value={user.email} className="text-sm outline-none border-none cursor-not-allowed" disabled />
                                            </div>
                                            <Link to="/account/update" className="ml-6 text-sm text-primary-blue font-medium">Edit</Link>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>

                    </main>
                </>
            )}
        </>
    );
};

export default Account;
