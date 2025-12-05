import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SecondaryDropDownMenu = ({ setToggleSecondaryDropDown, user }) => {

    const { wishlistItems } = useSelector((state) => state.wishlist);

    const navs = [
        {
            title: "My Profile",
            icon: <AccountCircleIcon sx={{ fontSize: "18px" }} />,
            redirect: "/account",
        },
        {
            title: "Orders",
            icon: <ShoppingBagIcon sx={{ fontSize: "18px" }} />,
            redirect: "/orders",
        },
        {
            title: "Wishlist",
            icon: <FavoriteIcon sx={{ fontSize: "18px" }} />,
            redirect: "/wishlist",
        },
    ]

    return (
        <div className="absolute w-60 -right-2 top-9 bg-white shadow-2xl rounded flex-col text-sm">

            {navs.map((item, i) => {

                const { title, icon, redirect } = item;

                return (
                    <>
                        {title === "Wishlist" ? (
                            <Link className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50" to={redirect} key={i} onClick={() => setToggleSecondaryDropDown(false)}>
                                <span className="text-primary-blue">{icon}</span>
                                {title}
                                <span className="ml-auto mr-3 bg-gray-100 p-0.5 px-2 text-gray-600 rounded">
                                    {wishlistItems.length}
                                </span>
                            </Link>
                        ) : (
                            <Link className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t" to={redirect} key={i} onClick={() => setToggleSecondaryDropDown(false)}>
                                <span className="text-primary-blue">{icon}</span>
                                {title}
                            </Link>
                        )}
                    </>
                )
            })}

            <div className="absolute right-1/2 -top-2.5">
                <div className="arrow_down"></div>
            </div>
        </div>
    );
};

export default SecondaryDropDownMenu;
