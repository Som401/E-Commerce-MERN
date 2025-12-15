import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Sidebar = () => {
  const location = useLocation();
  const [productsOpen, setProductsOpen] = useState(true);

  const isActive = (path) => {
    return location.pathname === path 
      ? "text-primary-blue bg-blue-50 border-r-4 border-primary-blue" 
      : "text-gray-600 hover:bg-gray-50 hover:text-primary-blue";
  };

  return (
    <div className="bg-white min-h-screen w-64 flex flex-col border-r border-gray-200 fixed left-0 top-0 z-10 shadow-lg">
      <Link to="/" className="h-16 flex items-center justify-center border-b border-gray-100 bg-primary-blue">
        <img 
          src={require("../../assets/images/logo.png")} 
          alt="Ecommerce" 
          className="h-8 object-contain filter brightness-0 invert"
        />
      </Link>

      <div className="flex flex-col py-4 overflow-y-auto">
        <Link 
          to="/admin/dashboard" 
          className={`flex items-center px-6 py-3 transition-all duration-200 ${isActive('/admin/dashboard')}`}
        >
          <DashboardIcon className="mr-3 text-xl" /> 
          <span className="font-medium">Dashboard</span>
        </Link>

        <div className="cursor-pointer">
          <div 
            onClick={() => setProductsOpen(!productsOpen)}
            className={`flex items-center justify-between px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary-blue transition-colors duration-200`}
          >
            <div className="flex items-center">
              <PostAddIcon className="mr-3 text-xl" />
              <span className="font-medium">Products</span>
            </div>
            {productsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>

          {productsOpen && (
            <div className="bg-gray-50 py-1">
              <Link 
                to="/admin/products" 
                className={`flex items-center pl-12 pr-6 py-2 transition-all duration-200 ${isActive('/admin/products')}`}
              >
                <PostAddIcon className="mr-3 text-sm" style={{ fontSize: '1.1rem' }} />
                <span className="text-sm">All Products</span>
              </Link>
              <Link 
                to="/admin/product/new" 
                className={`flex items-center pl-12 pr-6 py-2 transition-all duration-200 ${isActive('/admin/product/new')}`}
              >
                <AddIcon className="mr-3 text-sm" style={{ fontSize: '1.1rem' }} />
                <span className="text-sm">Create Product</span>
              </Link>
            </div>
          )}
        </div>

        <Link 
          to="/admin/orders" 
          className={`flex items-center px-6 py-3 transition-all duration-200 ${isActive('/admin/orders')}`}
        >
          <ListAltIcon className="mr-3 text-xl" />
          <span className="font-medium">Orders</span>
        </Link>

        <Link 
          to="/admin/users" 
          className={`flex items-center px-6 py-3 transition-all duration-200 ${isActive('/admin/users')}`}
        >
          <PeopleIcon className="mr-3 text-xl" />
          <span className="font-medium">Users</span>
        </Link>

        <Link 
          to="/admin/reviews" 
          className={`flex items-center px-6 py-3 transition-all duration-200 ${isActive('/admin/reviews')}`}
        >
          <RateReviewIcon className="mr-3 text-xl" />
          <span className="font-medium">Reviews</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
