import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myOrders, clearErrors } from '../../actions/orderAction';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import Header from '../Layouts/Header/Header';
import Loader from '../Layouts/Loader';
import { formatDate } from '../../utils/functions';

const statusColors = {
    'Pending': 'bg-yellow-500',
    'Shipped': 'bg-blue-500',
    'Approved': 'bg-green-500',
    'Declined': 'bg-red-500',
};

const MyOrders = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { loading, orders, error } = useSelector((state) => state.myOrders);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch, error, enqueueSnackbar]);

    return (
        <>
            <MetaData title="My Orders" />
            <Header />
            <main className="w-full mt-20 min-h-screen">

                <div className="flex flex-col gap-4 w-full sm:w-11/12 mt-4 m-auto mb-7">

                    <h1 className="text-2xl font-medium">My Orders</h1>

                    {loading ? (
                        <Loader />
                    ) : (
                        <>
                            {orders && orders.length === 0 ? (
                                <div className="flex flex-col items-center justify-center gap-4 bg-white shadow-sm rounded-sm p-8">
                                    <img
                                        draggable="false"
                                        className="w-1/2 h-44 object-contain"
                                        src="https://rukminim1.flixcart.com/www/100/100/promos/23/08/2021/c5f14d2a-2431-4a36-b6cb-8b5b5e283d4f.png"
                                        alt="Empty Orders"
                                    />
                                    <span className="text-lg font-medium">No Orders Yet</span>
                                    <p className="text-sm text-gray-500">You haven't placed any orders yet.</p>
                                    <Link to="/products" className="bg-primary-blue text-white px-8 py-2 rounded-sm uppercase shadow hover:shadow-lg">
                                        Shop Now
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {orders && orders.map((order) => {
                                        const { _id, orderStatus, orderItems, totalPrice, createdAt } = order;

                                        return (
                                            <div key={_id} className="flex flex-col sm:flex-row gap-4 bg-white shadow-sm rounded-sm p-4 sm:p-6">

                                                {/* Order Info */}
                                                <div className="flex flex-col gap-2 flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-gray-500">Order ID:</span>
                                                        <span className="font-medium text-sm">#{_id.substring(0, 8)}</span>
                                                        <span className={`${statusColors[orderStatus]} text-white text-xs px-2 py-1 rounded-sm ml-auto`}>
                                                            {orderStatus}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <span>Placed on:</span>
                                                        <span>{formatDate(createdAt)}</span>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-sm">
                                                        <span className="text-gray-600">{orderItems.length} item(s)</span>
                                                        <span className="text-gray-400">•</span>
                                                        <span className="font-medium text-lg">€{totalPrice.toLocaleString()}</span>
                                                    </div>

                                                    {/* Order Items Preview */}
                                                    <div className="flex gap-2 mt-2">
                                                        {orderItems.slice(0, 3).map((item, index) => (
                                                            <img
                                                                key={index}
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="w-16 h-16 object-contain border rounded"
                                                            />
                                                        ))}
                                                        {orderItems.length > 3 && (
                                                            <div className="w-16 h-16 border rounded flex items-center justify-center bg-gray-100">
                                                                <span className="text-sm text-gray-600">+{orderItems.length - 3}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex flex-col gap-2 justify-center">
                                                    <Link
                                                        to={`/order/${_id}`}
                                                        className="bg-primary-blue text-white text-center px-6 py-2 rounded-sm hover:shadow-lg uppercase text-sm font-medium"
                                                    >
                                                        View Details
                                                    </Link>
                                                </div>

                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    )}

                </div>
            </main>
        </>
    );
};

export default MyOrders;
