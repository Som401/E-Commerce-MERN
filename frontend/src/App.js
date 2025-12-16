import WebFont from 'webfontloader';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/userAction';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Account from './components/User/Account';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ManageAddresses from './components/User/ManageAddresses';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import ProtectedRoute from './Routes/ProtectedRoute.jsx';
import PublicRoute from './Routes/PublicRoute';
import Home from './components/Home';
import Products from './components/Products/Products';
import ProductDetails from './components/ProductDetails/ProductDetails';
import NetworkStatus from './components/Layouts/NetworkStatus';
import Cart from './components/Cart/Cart';
import Wishlist from './components/Wishlist/Wishlist';
import DashboardPage from './components/Admin/DashboardPage';
import ProductTable from './components/Admin/ProductTable';
import OrderTable from './components/Admin/OrderTable';
import UserTable from './components/Admin/UserTable';
import NewProduct from './components/Admin/NewProduct';
import ReviewsTable from './components/Admin/ReviewsTable';
import UpdateOrder from './components/Admin/UpdateOrder';
import UpdateProduct from './components/Admin/UpdateProduct';
import Shipping from './components/Cart/Shipping';
import Payment from './components/Cart/Payment';
import OrderConfirm from './components/Cart/OrderConfirm';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';

function App() {

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto:300,400,500,600,700"]
      },
    });
  });

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname])

  window.addEventListener("contextmenu", (e) => e.preventDefault());
  window.addEventListener("keydown", (e) => {
    if (e.keyCode === 123) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
  });

  return (
    <>
      <NetworkStatus />
      <Routes>
        {/* Home & Product Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Cart Route */}
        <Route path="/cart" element={<Cart />} />

        {/* Wishlist Route */}
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Checkout Routes - Protected */}
        <Route path="/shipping" element={
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        } />
        <Route path="/payment" element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        } />
        <Route path="/order/confirm" element={
          <ProtectedRoute>
            <OrderConfirm />
          </ProtectedRoute>
        } />
        <Route path="/order/success" element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        } />

        {/* Order Viewing Routes - Protected */}
        <Route path="/orders" element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        } />
        <Route path="/order/:id" element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        } />

        {/* User Routes */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path="/password/forgot" element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        } />
        <Route path="/password/reset/:token" element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        } />

        <Route path="/account" element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        } />

        <Route path="/account/update" element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        } />

        <Route path="/password/update" element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        } />
        <Route path="/account/addresses" element={
          <ProtectedRoute>
            <ManageAddresses />
          </ProtectedRoute>
        } />

        {/* Admin Routes - Protection Temporarily Disabled */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/products" element={
          <ProtectedRoute>
            <ProductTable />
          </ProtectedRoute>
        } />
        <Route path="/admin/orders" element={
          <ProtectedRoute>
            <OrderTable />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute>
            <UserTable />
          </ProtectedRoute>
        } />
        <Route path="/admin/new_product" element={
          <ProtectedRoute>
            <NewProduct />
          </ProtectedRoute>
        } />
        <Route path="/admin/reviews" element={
          <ProtectedRoute>
            <ReviewsTable />
          </ProtectedRoute>
        } />
        <Route path="/admin/order/:id" element={
          <ProtectedRoute>
            <UpdateOrder />
          </ProtectedRoute>
        } />
        <Route path="/admin/product/:id" element={
          <ProtectedRoute>
            <UpdateProduct />
          </ProtectedRoute>
        } />

      </Routes>
    </>
  );
}

export default App;
