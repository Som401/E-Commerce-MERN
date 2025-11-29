import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Loader from '../Layouts/Loader';
import MetaData from '../Layouts/MetaData';
import MinCategory from '../Layouts/MinCategory';

const Account = () => {

    const { user, loading } = useSelector((state) => state.user);

    return (
        <>
            <MetaData title="My Profile | Flipkart" />

            {loading ? <Loader /> : (
                <>
                    <MinCategory />
                    <main className="w-full mt-12 sm:mt-0">

                        <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">

                            <Sidebar activeTab={"profile"} />

                            <div className="flex-1 overflow-hidden shadow bg-white">

                                <div className="flex flex-col gap-12 m-4 sm:mx-8 sm:my-6">

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

                                    <div className="flex items-center gap-8">
                                        <span className="font-medium text-lg">FAQs</span>
                                    </div>

                                    <div className="flex flex-col gap-3 text-sm">
                                        <p className="font-medium text-lg">What happens when I update my email address (or mobile number)?</p>
                                        <p className="text-gray-500 leading-5">Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>
                                    </div>

                                    <div className="flex flex-col gap-3 text-sm">
                                        <p className="font-medium text-lg">When will my Flipkart account be updated with the new email address (or mobile number)?</p>
                                        <p className="text-gray-500 leading-5">It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
                                    </div>

                                    <div className="flex flex-col gap-3 text-sm">
                                        <p className="font-medium text-lg">What happens to my existing Flipkart account when I update my email address (or mobile number)?</p>
                                        <p className="text-gray-500 leading-5">Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>
                                    </div>

                                    <div className="flex flex-col gap-3 text-sm">
                                        <p className="font-medium text-lg">Does my Seller account get affected when I update my email address?</p>
                                        <p className="text-gray-500 leading-5">Flipkart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <img draggable="false" className="w-full h-20 object-contain" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/myProfileFooter_4e9fe2.png" alt="Footer" />
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
