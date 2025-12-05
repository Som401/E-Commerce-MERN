import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import PersonIcon from '@mui/icons-material/Person';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import FolderIcon from '@mui/icons-material/Folder';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const Sidebar = ({ activeTab }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        enqueueSnackbar("Logout Successfully", { variant: "success" });
        navigate("/login");
    }

    return (
        <aside className="sidebar w-1/4 px-1 hidden sm:flex flex-col gap-4 min-w-max">

            <div className="flex flex-col bg-white rounded-sm shadow">
                {/* User Info Header */}
                <div className="flex items-center gap-4 p-4 border-b">
                    <img
                        draggable="false"
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary-blue"
                        src={user?.avatar?.url || "https://res.cloudinary.com/demo/image/upload/v1/avatar_placeholder.png"}
                        alt={user?.name || "User"}
                    />
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Hello,</span>
                        <span className="font-medium text-sm">{user?.name || "Guest"}</span>
                    </div>
                </div>

                {/* Personal Information Section */}
                <div className="flex flex-col w-full gap-0">
                    <div className={`${activeTab === "profile" ? "bg-purple-50 text-primary-blue" : "hover:bg-gray-50"} flex items-center gap-5 px-4 py-4 border-b cursor-pointer`}>
                        <span className="flex items-center gap-5 w-full">
                            <AccountCircleIcon sx={{ fontSize: '18px' }} />
                            PERSONAL INFORMATION
                        </span>
                    </div>

                    <Link to="/account" className={`${activeTab === "profile" ? "bg-purple-50 text-primary-blue font-medium" : "hover:bg-gray-50"} flex items-center gap-5 px-11 py-3.5 border-b`}>
                        Profile Information
                    </Link>
                    <Link to="/account/update" className={`${activeTab === "addresses" ? "bg-purple-50 text-primary-blue font-medium" : "hover:bg-gray-50"} flex items-center gap-3 px-11 py-3.5 border-b`}>
                        <LocationOnIcon sx={{ fontSize: '16px' }} />
                        Manage Addresses
                    </Link>
                    <Link to="/password/update" className={`${activeTab === "password" ? "bg-purple-50 text-primary-blue font-medium" : "hover:bg-gray-50"} flex items-center gap-3 px-11 py-3.5 border-b`}>
                        <LockIcon sx={{ fontSize: '16px' }} />
                        Change Password
                    </Link>
                    <Link to="/payment/methods" className={`${activeTab === "payments" ? "bg-purple-50 text-primary-blue font-medium" : "hover:bg-gray-50"} flex items-center gap-3 px-11 py-3.5 border-b`}>
                        <CreditCardIcon sx={{ fontSize: '16px' }} />
                        Payment Methods
                    </Link>
                </div>

                {/* My Orders Section */}
                <div className="flex flex-col w-full gap-0">
                    <Link to="/orders" className={`${activeTab === "orders" ? "bg-purple-50 text-primary-blue font-medium" : "hover:bg-gray-50"} flex items-center gap-5 px-4 py-4 border-b`}>
                        <span className="flex items-center gap-5 w-full">
                            <FolderIcon sx={{ fontSize: '18px' }} />
                            MY ORDERS
                        </span>
                        <ChevronRightIcon />
                    </Link>
                </div>

                {/* My Wishlist Section */}
                <div className="flex flex-col w-full gap-0">
                    <Link to="/wishlist" className={`${activeTab === "wishlist" ? "bg-purple-50 text-primary-blue font-medium" : "hover:bg-gray-50"} flex items-center gap-5 px-4 py-4 border-b`}>
                        <span className="flex items-center gap-5 w-full">
                            <FavoriteIcon sx={{ fontSize: '18px' }} />
                            MY WISHLIST
                        </span>
                        <ChevronRightIcon />
                    </Link>
                </div>

                {/* Logout */}
                <div onClick={handleLogout} className="flex items-center gap-5 px-4 py-4 hover:bg-gray-50 cursor-pointer">
                    <span className="flex items-center gap-5 w-full">
                        <PowerSettingsNewIcon sx={{ fontSize: '18px' }} />
                        Logout
                    </span>
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
