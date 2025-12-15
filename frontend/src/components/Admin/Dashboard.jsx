import React, { useEffect } from 'react';
import Sidebar from './Sidebar.jsx';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProducts } from '../../actions/productAction';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Dashboard = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);

    let outOfStock = 0;

    products &&
        products.forEach((item) => {
            if (item.Stock === 0) {
                outOfStock += 1;
            }
        });

    useEffect(() => {
        dispatch(getAdminProducts());
    }, [dispatch]);

    let totalAmount = 0;
    // Mocking total amount from orders since we don't have getAllOrders yet
    // In a real scenario, we would fetch orders and sum up totalPrice

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["#4B0082"],
                hoverBackgroundColor: ["#36005e"],
                data: [0, 4000], // Mock data
            },
        ],
    };

    const doughnutState = {
        labels: ["Out of Stock", "In Stock"],
        datasets: [
            {
                backgroundColor: ["#FF6E00", "#4B0082"],
                hoverBackgroundColor: ["#cc5800", "#36005e"],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 ml-64 p-8">
                <Typography component="h1" className="text-3xl font-bold text-gray-700 mb-8 text-center">Dashboard</Typography>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-primary-blue text-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
                        <p className="text-lg font-medium mb-2">Total Amount</p>
                        <p className="text-3xl font-bold">€{totalAmount}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 md:col-span-2">
                        <div className="grid grid-cols-3 gap-4">
                            <Link to="/admin/products" className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow text-gray-700 no-underline">
                                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-3 text-primary-orange">
                                    <span className="text-2xl font-bold">{products && products.length}</span>
                                </div>
                                <p className="font-medium">Products</p>
                            </Link>
                            
                            <Link to="/admin/orders" className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow text-gray-700 no-underline">
                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3 text-primary-blue">
                                    <span className="text-2xl font-bold">0</span>
                                </div>
                                <p className="font-medium">Orders</p>
                            </Link>
                            
                            <Link to="/admin/users" className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow text-gray-700 no-underline">
                                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3 text-green-600">
                                    <span className="text-2xl font-bold">0</span>
                                </div>
                                <p className="font-medium">Users</p>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <Line data={lineState} />
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm flex justify-center">
                        <div className="w-3/4">
                            <Doughnut data={doughnutState} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
