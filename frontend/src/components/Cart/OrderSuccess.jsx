import { Link } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import Header from '../Layouts/Header/Header';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const OrderSuccess = () => {

    return (
        <>
            <MetaData title="Order Success" />
            <Header />
            <main className="w-full mt-20">

                <div className="flex flex-col gap-4 items-center justify-center min-h-screen p-4">

                    <CheckCircleIcon sx={{ fontSize: 80 }} className="text-primary-green" />

                    <h1 className="text-3xl font-medium text-gray-800">Order Placed Successfully!</h1>

                    <p className="text-lg text-gray-600 text-center max-w-md">
                        Thank you for your order. Your order has been placed and is being processed.
                    </p>

                    <div className="flex flex-col items-center gap-2 mt-4">
                        <p className="text-sm text-gray-500">Order Status: <span className="text-yellow-600 font-medium">Pending</span></p>
                        <p className="text-sm text-gray-500">You will receive order updates via email</p>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <Link
                            to="/orders"
                            className="bg-primary-blue text-white px-8 py-3 rounded-sm font-medium shadow hover:shadow-lg uppercase"
                        >
                            View Orders
                        </Link>
                        <Link
                            to="/products"
                            className="bg-white text-primary-blue border border-primary-blue px-8 py-3 rounded-sm font-medium shadow hover:shadow-lg uppercase"
                        >
                            Continue Shopping
                        </Link>
                    </div>

                </div>
            </main>
        </>
    );
};

export default OrderSuccess;
