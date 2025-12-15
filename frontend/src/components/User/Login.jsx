import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginUser } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

    const { loading, isAuthenticated, error, user } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdminLogin, setIsAdminLogin] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
    }

    const redirect = location.search ? location.search.split("=")[1] : "account";

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            if (user?.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate(`/${redirect}`);
            }
        }
    }, [dispatch, error, isAuthenticated, redirect, navigate, enqueueSnackbar, user]);

    return (
        <>
            <MetaData title={isAdminLogin ? "Admin Login" : "Login | Flipkart"} />

            {loading && <BackdropLoader />}
            <main className="w-full mt-12 sm:pt-20 sm:mt-0">

                <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">
                    <div className={`loginSidebar p-10 pr-12 hidden sm:flex flex-col gap-4 w-2/5 ${isAdminLogin ? 'bg-gray-900' : 'bg-primary-blue'}`}>
                        <h1 className="font-medium text-white text-3xl">{isAdminLogin ? "Admin Login" : "Login"}</h1>
                        <p className="text-gray-200 text-lg">
                            {isAdminLogin 
                                ? "Access the administrative panel to manage products, orders, and users." 
                                : "Get access to your Orders, Wishlist and Recommendations"}
                        </p>
                    </div>

                    <div className="flex-1 overflow-hidden">

                        <div className="text-center py-10 px-4 sm:px-14">

                            <form onSubmit={handleLogin}>
                                <div className="flex flex-col w-full gap-4">

                                    <TextField
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />

                                    <div className="flex flex-col gap-2.5 mt-2 mb-32">
                                        <p className="text-xs text-primary-grey text-left">By continuing, you agree to Flipkart's <a href="https://www.flipkart.com/pages/terms" className="text-primary-blue"> Terms of Use</a> and <a href="https://www.flipkart.com/pages/privacypolicy" className="text-primary-blue"> Privacy Policy.</a></p>
                                        <button type="submit" className={`text-white py-3 w-full shadow hover:shadow-lg rounded-sm font-medium ${isAdminLogin ? 'bg-gray-900' : 'bg-primary-orange'}`}>
                                            {isAdminLogin ? "Login as Admin" : "Login"}
                                        </button>
                                        <Link to="/password/forgot" className="hover:bg-gray-50 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium">Forgot Password?</Link>
                                    </div>

                                </div>
                            </form>

                            <div className="flex flex-col gap-4">
                                {!isAdminLogin && (
                                    <Link to="/register" className="font-medium text-sm text-primary-blue">New to Flipkart? Create an account</Link>
                                )}
                                
                                <p 
                                    onClick={() => setIsAdminLogin(!isAdminLogin)}
                                    className="font-medium text-sm text-gray-500 cursor-pointer hover:text-gray-800"
                                >
                                    {isAdminLogin ? "Back to User Login" : "Admin Login"}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </main>
        </>
    );
};

export default Login;
