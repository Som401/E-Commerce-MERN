import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../constants/wishlistConstants";
import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO, EMPTY_CART } from "../constants/cartConstants";

// Cart Reducer
export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;

            const itemExist = state.cartItems.find((i) => i.product === item.product);

            if (itemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.product === itemExist.product ? item : i
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }

        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product !== action.payload),
            };

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            };

        case EMPTY_CART:
            return {
                ...state,
                cartItems: [],
            };

        default:
            return state;
    }
};

// Wishlist Reducer
export const wishlistReducer = (state = { wishlistItems: [] }, { type, payload }) => {
    switch (type) {
        case ADD_TO_WISHLIST:
            const item = payload;

            const itemExist = state.wishlistItems.find((i) => i.product === item.product);

            if (itemExist) {
                return {
                    ...state,
                    wishlistItems: state.wishlistItems.map((i) =>
                        i.product === itemExist.product ? item : i
                    ),
                };
            } else {
                return {
                    ...state,
                    wishlistItems: [...state.wishlistItems, item],
                };
            }

        case REMOVE_FROM_WISHLIST:
            return {
                ...state,
                wishlistItems: state.wishlistItems.filter((i) => i.product !== payload),
            };

        default:
            return state;
    }
};
