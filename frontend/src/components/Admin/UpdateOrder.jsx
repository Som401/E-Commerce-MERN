import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails, updateOrder } from '../../actions/orderAction';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';
import MetaData from '../Layouts/MetaData';
import Dashboard from './Dashboard';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const UpdateOrder = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const params = useParams();

    const { order, error } = useSelector((state) => state.orderDetails);
    const { isUpdated, error: updateError } = useSelector((state) => state.order);

    const [status, setStatus] = useState('');

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (updateError) {
            enqueueSnackbar(updateError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Order Updated Successfully", { variant: "success" });
            dispatch({ type: UPDATE_ORDER_RESET });
            navigate('/admin/orders');
        }

        dispatch(getOrderDetails(params.id));
    }, [dispatch, error, params.id, isUpdated, updateError, enqueueSnackbar, navigate]);

    useEffect(() => {
        if (order && order._id) {
            setStatus(order.orderStatus);
        }
    }, [order]);

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("status", status);

        dispatch(updateOrder(params.id, formData));
    };

    return (
        <>
            <MetaData title="Admin: Update Order" />
            <Dashboard activeTab={1}>
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium">Order Details</h2>

                    {order && order._id && (
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Order Info */}
                            <div className="flex-1 bg-white rounded-lg shadow p-6">
                                <h3 className="font-medium text-lg mb-4">Order Information</h3>
                                <div className="flex flex-col gap-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="font-medium">Order ID:</span>
                                        <span className="text-gray-600">{order._id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Ordered On:</span>
                                        <span className="text-gray-600">{new Date(order.createdAt).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Total Amount:</span>
                                        <span className="text-gray-600">€{order.totalPrice?.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Payment Status:</span>
                                        <span className={order.paymentInfo?.status === 'succeeded' ? 'text-green-600' : 'text-red-600'}>
                                            {order.paymentInfo?.status === 'succeeded' ? 'PAID' : 'NOT PAID'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Current Status:</span>
                                        <span className={`px-3 py-1 rounded-full font-medium text-sm ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-600' :
                                                order.orderStatus === 'Shipped' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-yellow-100 text-yellow-600'
                                            }`}>
                                            {order.orderStatus}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="font-medium text-lg mt-6 mb-4">Shipping Address</h3>
                                <div className="flex flex-col gap-2 text-sm text-gray-600">
                                    <p>{order.user?.name}</p>
                                    <p>{order.shippingInfo?.address}</p>
                                    <p>{order.shippingInfo?.city}, {order.shippingInfo?.pincode}</p>
                                    <p>{order.shippingInfo?.state}, {order.shippingInfo?.country}</p>
                                    <p>Phone: {order.shippingInfo?.phoneNo}</p>
                                </div>

                                <h3 className="font-medium text-lg mt-6 mb-4">Order Items</h3>
                                <div className="flex flex-col gap-3">
                                    {order.orderItems?.map((item) => (
                                        <div key={item._id} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                                            <div className="flex-1">
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-gray-600">
                                                    {item.quantity} x €{item.price} = €{(item.quantity * item.price).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Update Status Form */}
                            <div className="lg:w-96">
                                <form onSubmit={updateOrderSubmitHandler} className="bg-white rounded-lg shadow p-6">
                                    <h3 className="font-medium text-lg mb-4">Update Order Status</h3>

                                    <TextField
                                        select
                                        label="Order Status"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        required
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        disabled={order.orderStatus === 'Delivered'}
                                    >
                                        <MenuItem value="Processing">Processing</MenuItem>
                                        <MenuItem value="Shipped">Shipped</MenuItem>
                                        <MenuItem value="Delivered">Delivered</MenuItem>
                                    </TextField>

                                    {order.orderStatus === 'Delivered' && (
                                        <p className="text-sm text-green-600 mt-2">
                                            This order has been delivered and cannot be updated.
                                        </p>
                                    )}

                                    <div className="flex gap-3 mt-6">
                                        <button
                                            type="button"
                                            onClick={() => navigate('/admin/orders')}
                                            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded shadow hover:shadow-lg"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={order.orderStatus === 'Delivered'}
                                            className="flex-1 bg-primary-orange text-white py-2 px-4 rounded shadow hover:shadow-lg disabled:bg-gray-400"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </Dashboard>
        </>
    );
};

export default UpdateOrder;
