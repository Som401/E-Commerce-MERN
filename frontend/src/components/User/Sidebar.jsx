import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import FolderIcon from '@mui/icons-material/Folder';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

const Sidebar = ({ activeTab }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleLogout = () => {
        dispatch(logoutUser());
        enqueueSnackbar("Logout Successfully", { variant: "success" });
        navigate("/login");
    }

    return (
        <aside className="sidebar w-1/4 px-1 hidden sm:flex flex-col gap-4 min-w-max">

            <div className="flex flex-col bg-white rounded-sm shadow">
                <div className="flex items-center gap-4 p-4 border-b">
                    <Avatar className="rounded-full" />
                    <span className="font-medium text-sm">Hello,</span>
                </div>

                <div className="flex flex-col w-full gap-0 my-2">
                    <Link to="/orders" className={`${activeTab === "orders" ? "bg-blue-50 text-primary-blue" : "hover:bg-gray-50"} flex items-center gap-5 px-4 py-4 border-b`}>
                        <span className="flex items-center gap-5 w-full">
                            <FolderIcon sx={{ fontSize: '18px' }} />
                            MY ORDERS
                        </span>
                        <ChevronRightIcon />
                    </Link>
                </div>

                <div className="flex flex-col w-full gap-0">
                    <div className={`${activeTab === "profile" ? "bg-blue-50 text-primary-blue" : "hover:bg-gray-50"} flex items-center gap-5 px-4 py-4 border-b cursor-pointer`}>
                        <span className="flex items-center gap-5 w-full">
                            <AccountCircleIcon sx={{ fontSize: '18px' }} />
                            ACCOUNT SETTINGS
                        </span>
                    </div>

                    <Link to="/account" className={`${activeTab === "profile" ? "bg-blue-50 text-primary-blue font-medium" : "hover:bg-gray-50"} flex items-center gap-5 px-11 py-3.5 border-b`}>
                        Profile Information
                    </Link>
                    <Link to="/account/update" className={`${activeTab === "profile" ? "hover:bg-gray-50" : "hover:bg-gray-50"} flex items-center gap-5 px-11 py-3.5 border-b`}>
                        Manage Addresses
                    </Link>
                    <Link to="/password/update" className={`${activeTab === "password" ? "bg-blue-50 text-primary-blue font-medium" : "hover:bg-gray-50"} flex items-center gap-3 px-11 py-3.5 border-b`}>
                        <LockIcon sx={{ fontSize: '16px' }} />
                        Change Password
                    </Link>
                    <Link to="/account/update" className={`${activeTab === "profile" ? "hover:bg-gray-50" : "hover:bg-gray-50"} flex items-center gap-5 px-11 py-3.5 border-b`}>
                        PAN Card Information
                    </Link>
                </div>

                <div className="flex flex-col w-full gap-0">
                    <div className={`${activeTab === "payments" ? "bg-blue-50 text-primary-blue" : "hover:bg-gray-50"} flex items-center gap-5 px-4 py-4 border-b cursor-pointer`}>
                        <span className="flex items-center gap-5 w-full">
                            <AccountBalanceWalletIcon sx={{ fontSize: '18px' }} />
                            PAYMENTS
                        </span>
                    </div>

                    <Link to="/giftcard" className={`${activeTab === "payments" ? "hover:bg-gray-50" : "hover:bg-gray-50"} flex items-center gap-5 px-11 py-3.5 border-b`}>
                        Gift Cards
                    </Link>
                    <Link to="/payment" className={`${activeTab === "payments" ? "hover:bg-gray-50" : "hover:bg-gray-50"} flex items-center gap-5 px-11 py-3.5 border-b`}>
                        Saved UPI
                    </Link>
                    <Link to="/payment" className={`${activeTab === "payments" ? "hover:bg-gray-50" : "hover:bg-gray-50"} flex items-center gap-5 px-11 py-3.5 border-b`}>
                        Saved Cards
                    </Link>
                </div>

                <div className="flex flex-col w-full gap-0">
                    <div className={`${activeTab === "stuff" ? "bg-blue-50 text-primary-blue" : "hover:bg-gray-50"} flex items-center gap-5 px-4 py-4 border-b cursor-pointer`}>
                        <span className="flex items-center gap-5 w-full">
                            <FolderSharedIcon sx={{ fontSize: '18px' }} />
                            MY STUFF
                        </span>
                    </div>

                    <Link to="/coupon" className={`${activeTab === "stuff" ? "hover:bg-gray-50" : "hover:bg-gray-50"} flex items-center gap-5 px-11 py-3.5 border-b`}>
                        My Coupons
                    </Link>
                    <Link to="/review" className={`${activeTab === "stuff" ? "hover:bg-gray-50" : "hover:bg-gray-50"} flex items-center gap-5 px-11 py-3.5 border-b`}>
                        My Reviews & Ratings
                    </Link>
                    <Link to="/notification" className={`${activeTab === "stuff" ? "hover:bg-gray-50" : "hover:bg-gray-50"} flex items-center gap-5 px-11 py-3.5 border-b`}>
                        All Notifications
                    </Link>
                    <Link to="/wishlist" className={`${activeTab === "wishlist" ? "bg-blue-50 text-primary-blue font-medium" : "hover:bg-gray-50"} flex items-center gap-5 px-11 py-3.5 border-b`}>
                        My Wishlist
                    </Link>
                </div>

                <div onClick={handleLogout} className="flex items-center gap-5 px-4 py-4 border-b hover:bg-gray-50 cursor-pointer">
                    <span className="flex items-center gap-5 w-full">
                        <PowerSettingsNewIcon sx={{ fontSize: '18px' }} />
                        Logout
                    </span>
                </div>

                <div className="flex items-center gap-5 px-4 py-4 border-b hover:bg-gray-50 cursor-pointer">
                    <span className="flex items-center gap-5 w-full text-sm">
                        <ChatIcon sx={{ fontSize: '18px' }} />
                        24x7 Customer Care
                    </span>
                </div>

            </div>

            <div className="flex flex-col bg-white rounded-sm shadow">
                <div className="flex items-center gap-3 px-4 py-3.5 border-b">
                    <FavoriteIcon sx={{ fontSize: '18px' }} />
                    <span className="font-medium text-sm">My Wishlist</span>
                </div>
            </div>

        </aside>
    );
};

const Avatar = ({ className }) => {
    return (
        <div className={`${className} w-12 h-12 rounded-full bg-primary-blue flex items-center justify-center text-white font-medium`}>
            <PersonIcon />
        </div>
    )
}

export default Sidebar;
