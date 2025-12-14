import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Searchbar from './Searchbar';
import logo from '../../../assets/images/logo.png';
import SecondaryDropDownMenu from './SecondaryDropDownMenu';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../../actions/userAction';

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { cartItems } = useSelector(state => state.cart);

  const [toggleSecondaryDropDown, setToggleSecondaryDropDown] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    enqueueSnackbar("Logout Successfully", { variant: "success" });
  }

  return (

    <header className="bg-primary-blue fixed top-0 py-2.5 w-full z-10">

      {/* <!-- navbar container --> */}
      <div className="w-full sm:w-9/12 px-1 sm:px-4 m-auto flex justify-between items-center relative">

        {/* <!-- logo & search container --> */}
        <div className="flex items-center flex-1">
          <Link className="h-7 mr-1 sm:mr-4" to="/">
            <img draggable="false" className="h-full w-full object-contain" src={logo} alt="Flipkart Logo" />
          </Link>

          <Searchbar />
        </div>
        {/* <!-- logo & search container --> */}

        {/* <!-- right navs --> */}
        <div className="flex items-center justify-between ml-4 sm:ml-7 gap-0.5 sm:gap-7 relative">

          {/* Cart - Always visible */}
          <Link to="/cart" className="flex items-center text-white font-medium gap-2 relative">
            <span><ShoppingCartIcon /></span>
            {cartItems.length > 0 &&
              <div className="w-5 h-5 p-2 bg-red-500 text-xs rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                {cartItems.length}
              </div>
            }
            Cart
          </Link>

          {isAuthenticated === false ? (
            <Link to="/login" className="px-3 sm:px-9 py-0.5 text-primary-blue bg-white border font-medium rounded-sm cursor-pointer">Login</Link>
          ) : (
            <>
              {/* More Dropdown */}
              <span className="moreDropDown flex items-center text-white font-medium gap-1 cursor-pointer" onClick={() => setToggleSecondaryDropDown(!toggleSecondaryDropDown)}>More
                <span>{toggleSecondaryDropDown ? <ExpandLessIcon sx={{ fontSize: "16px" }} /> : <ExpandMoreIcon sx={{ fontSize: "16px" }} />}</span>
              </span>

              {toggleSecondaryDropDown && <SecondaryDropDownMenu setToggleSecondaryDropDown={setToggleSecondaryDropDown} user={user} />}

              {/* Logout */}
              <div className="flex items-center text-white font-medium gap-2 cursor-pointer" onClick={handleLogout}>
                <span><PowerSettingsNewIcon sx={{ fontSize: "20px" }} /></span>
                Logout
              </div>
            </>
          )}
        </div>
        {/* <!-- right navs --> */}

      </div>
      {/* <!-- navbar container --> */}
    </header>
  )
};

export default Header;
