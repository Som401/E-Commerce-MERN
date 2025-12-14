import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, clearErrors } from '../../actions/orderAction';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import Header from '../Layouts/Header/Header';
import Loader from '../Layouts/Loader';
import OrderItem from './OrderItem';
import { formatDate } from '../../utils/functions';

const statusColors = {
    'Pending': 'bg-yellow-500',
    'Shipped': 'bg-blue-500',
    'Approved': 'bg-green-500',
    'Declined': 'bg-red-500',
};

const OrderDetails = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const { loading, order, error } = useSelector((state) => state.orderDetails);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(params.id));
    }, [dispatch, error, params.id, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Order Details" />
            <Header />
            <main className="w-full mt-20 min-h-screen">

                {loading ? (
                    <Loader />
                ) : (
                    <>
                        {order && order._id ? (
                            <div className="flex flex-col gap-4 w-full sm:w-11/12 mt-4 m-auto mb-7">

                                {/* Order Header */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-white shadow-sm rounded-sm p-6">
                                    <div className="flex flex-col gap-1">
                                        <h1 className="text-2xl font-medium">Order Details</h1>
                                        <p className="text-sm text-gray-600">Order ID: #{order._id}</p>
                                        <p className="text-sm text-gray-600">Placed on: {formatDate(order.createdAt)}</p>
                                    </div>
                                    <span className={`${statusColors[order.orderStatus]} text-white px-4 py-2 rounded-sm font-medium`}>
                                        {order.orderStatus}
                                    </span>
                                </div>

                                <div className="flex flex-col lg:flex-row gap-4">

                                    {/* Left Column - Order Items & Info */}
                                    <div className="flex-1 flex flex-col gap-4">

                                        {/* Shipping Address */}
                                        <div className="bg-white shadow-sm rounded-sm p-6">
                                            <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
                                            <div className="flex flex-col gap-1 text-sm">
                                                <p className="font-medium">{order.shippingInfo?.name}</p>
                                                <p className="text-gray-600">{order.shippingInfo?.address}</p>
                                                <p className="text-gray-600">{order.shippingInfo?.city}, {order.shippingInfo?.state}</p>
                                                <p className="text-gray-600">{order.shippingInfo?.country} - {order.shippingInfo?.pinCode}</p>
                                                <p className="text-gray-600">Phone: {order.shippingInfo?.phoneNo}</p>
                                            </div>
                                        </div>

                                        {/* Payment Info */}
                                        <div className="bg-white shadow-sm rounded-sm p-6">
                                            <h2 className="text-lg font-medium mb-4">Payment Information</h2>
                                            <div className="flex flex-col gap-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Payment Method:</span>
                                                    <span className="font-medium">{order.paymentMethod?.details}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Payment Status:</span>
                                                    <span className={`font-medium ${order.paymentInfo?.status === 'Success' ? 'text-green-600' : 'text-yellow-600'}`}>
                                                        {order.paymentInfo?.status || 'Pending'}
                                                    </span>
                                                </div>
                                                {order.paidAt && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Paid At:</span>
                                                        <span>{formatDate(order.paidAt)}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Order Items */}
                                        <div className="bg-white shadow-sm rounded-sm p-6">
                                            <h2 className="text-lg font-medium mb-4">Order Items ({order.orderItems?.length})</h2>
                                            <div className="flex flex-col gap-4">
                                                {order.orderItems && order.orderItems.map((item) => (
                                                    <OrderItem key={item.product} {...item} />
                                                ))}
                                            </div>
                                        </div>

                                    </div>

                                    {/* Right Column - Price Summary */}
                                    <div className="lg:w-1/3">
                                        <div className="bg-white shadow-sm rounded-sm p-6 sticky top-24">
                                            <h2 className="text-lg font-medium mb-4">Price Details</h2>
                                            <div className="flex flex-col gap-3 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Subtotal</span>
                                                    <span>€{order.itemsPrice?.toLocaleString()}</span>
                                                </div>
                                                {order.taxPrice > 0 && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Tax</span>
                                                        <span>€{order.taxPrice?.toLocaleString()}</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Shipping Charges</span>
                                                    <span className={order.shippingPrice === 0 ? "text-green-600" : ""}>
                                                        {order.shippingPrice === 0 ? "FREE" : `€${order.shippingPrice}`}
                                                    </span>
                                                </div>
                                                <div className="border-t pt-3 mt-2 flex justify-between font-medium text-lg">
                                                    <span>Total Amount</span>
                                                    <span>€{order.totalPrice?.toLocaleString()}</span>
                                                </div>
                                            </div>

                                            {/* Delivery Status */}
                                            {order.orderStatus === 'Shipped' && (
                                                <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
                                                    <p className="text-sm text-blue-800">
                                                        🚚 Your order is on the way!
                                                    </p>
                                                </div>
                                            )}
                                            {order.orderStatus === 'Approved' && order.deliveredAt && (
                                                <div className="mt-6 p-4 bg-green-50 rounded border border-green-200">
                                                    <p className="text-sm text-green-800 font-medium">
                                                        ✓ Delivered
                                                    </p>
                                                    <p className="text-xs text-green-700 mt-1">
                                                        {formatDate(order.deliveredAt)}
                                                    </p>
                                                </div>
                                            )}
                                            {order.orderStatus === 'Declined' && (
                                                <div className="mt-6 p-4 bg-red-50 rounded border border-red-200">
                                                    <p className="text-sm text-red-800">
                                                        ✗ Order was declined
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>

                            </div>
                        ) : (
                            <div className="flex items-center justify-center min-h-screen">
                                <p className="text-lg text-gray-500">Order not found</p>
                            </div>
                        )}
                    </>
                )}

            </main>
        </>
    );
};

export default OrderDetails;
