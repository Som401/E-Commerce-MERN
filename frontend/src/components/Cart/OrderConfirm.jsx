import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import Header from '../Layouts/Header/Header';
import { createOrder, clearErrors } from '../../actions/orderAction';
import { useSnackbar } from 'notistack';
import { emptyCart } from '../../actions/cartAction';

const OrderConfirm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { cartItems, shippingInfo } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error, order } = useSelector((state) => state.newOrder);

    const paymentInfo = JSON.parse(sessionStorage.getItem('paymentInfo') || '{}');

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = cartItems.reduce((sum, item) => sum + (item.cuttedPrice - item.price) * item.quantity, 0);
    const deliveryCharges = totalPrice > 500 ? 0 : 50;
    const finalTotal = totalPrice + deliveryCharges;

    const placeOrderHandler = () => {
        const orderData = {
            shippingInfo,
            orderItems: cartItems.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
                product: item.product,
            })),
            paymentMethod: paymentInfo,
            itemsPrice: totalPrice,
            taxPrice: 0,
            shippingPrice: deliveryCharges,
            totalPrice: finalTotal,
        };

        dispatch(createOrder(orderData));
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (order && order.order) {
            enqueueSnackbar("Order Placed Successfully!", { variant: "success" });
            dispatch(emptyCart());
            sessionStorage.removeItem('paymentInfo');
            navigate(`/order/success`);
        }
    }, [error, order, dispatch, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Order Confirmation" />
            <Header />
            <main className="w-full mt-20">

                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7 overflow-hidden">

                    <div className="flex-1">

                        <Stepper activeStep={4}>
                            <div className="w-full bg-white">

                                <div className="flex flex-col gap-4 w-full sm:w-3/4 mx-1 sm:mx-8 my-4">

                                    <h2 className="font-medium text-2xl">Review Your Order</h2>

                                    {/* Shipping Address */}
                                    <div className="flex flex-col gap-2">
                                        <h3 className="font-medium text-lg">Shipping Address</h3>
                                        <div className="bg-gray-50 p-4 rounded">
                                            <p className="font-medium">{shippingInfo.name}</p>
                                            <p className="text-sm text-gray-600">{shippingInfo.address}, {shippingInfo.city}</p>
                                            <p className="text-sm text-gray-600">{shippingInfo.state}, {shippingInfo.country} - {shippingInfo.pinCode}</p>
                                            <p className="text-sm text-gray-600">Phone: {shippingInfo.phoneNo}</p>
                                        </div>
                                        <button
                                            onClick={() => navigate('/shipping')}
                                            className="text-primary-blue text-sm underline self-start"
                                        >
                                            Edit Address
                                        </button>
                                    </div>

                                    {/* Payment Method */}
                                    <div className="flex flex-col gap-2">
                                        <h3 className="font-medium text-lg">Payment Method</h3>
                                        <div className="bg-gray-50 p-4 rounded">
                                            <p className="font-medium">{paymentInfo.details}</p>
                                        </div>
                                        <button
                                            onClick={() => navigate('/payment')}
                                            className="text-primary-blue text-sm underline self-start"
                                        >
                                            Edit Payment
                                        </button>
                                    </div>

                                    {/* Order Items */}
                                    <div className="flex flex-col gap-2">
                                        <h3 className="font-medium text-lg">Order Items ({cartItems.length})</h3>
                                        <div className="flex flex-col gap-2">
                                            {cartItems.map((item) => (
                                                <div key={item.product} className="flex gap-4 items-center border-b pb-2">
                                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                                                    <div className="flex-1">
                                                        <p className="font-medium text-sm">{item.name.length > 60 ? `${item.name.substring(0, 60)}...` : item.name}</p>
                                                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                    </div>
                                                    <p className="font-medium">€{(item.price * item.quantity).toLocaleString()}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Summary */}
                                    <div className="flex flex-col gap-2 border-t pt-4">
                                        <h3 className="font-medium text-lg">Price Details</h3>
                                        <div className="flex justify-between text-sm">
                                            <span>Subtotal</span>
                                            <span>€{totalPrice.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-primary-green">
                                            <span>Discount</span>
                                            <span>−€{discount.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Delivery Charges</span>
                                            <span className={deliveryCharges === 0 ? "text-primary-green" : ""}>
                                                {deliveryCharges === 0 ? "FREE" : `€${deliveryCharges}`}
                                            </span>
                                        </div>
                                        <div className="flex justify-between font-medium text-lg border-t pt-2">
                                            <span>Total Amount</span>
                                            <span>€{finalTotal.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={placeOrderHandler}
                                        className="bg-primary-orange w-full sm:w-1/3 my-4 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm uppercase"
                                    >
                                        Place Order
                                    </button>

                                </div>

                            </div>
                        </Stepper>

                    </div>

                    <PriceSidebar cartItems={cartItems} />

                </div>
            </main>
        </>
    );
};

export default OrderConfirm;
