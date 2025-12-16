import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { forgotPasswordReducer, profileReducer, userReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducer';
import { cartReducer, wishlistReducer } from './reducers/cartReducer';
import { productsReducer, productDetailsReducer, newReviewReducer, newProductReducer, productReducer, productReviewsReducer, reviewReducer } from './reducers/productReducer';
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducer';

const reducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    users: allUsersReducer,
    userDetails: userDetailsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {},
    },
    wishlist: {
        wishlistItems: localStorage.getItem('wishlistItems')
            ? JSON.parse(localStorage.getItem('wishlistItems'))
            : [],
    },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
