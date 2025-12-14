import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../constants/wishlistConstants";

// Cart Reducer
export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, { type, payload }) => {
    switch (type) {
        case ADD_TO_CART:
            const item = payload;
            const isItemExist = state.cartItems.find((el) => el.product === item.product);

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((el) =>
                        el.product === isItemExist.product ? item : el
                    ),
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((el) => el.product !== payload)
            }
        case EMPTY_CART:
            return {
                ...state,
                cartItems: [],
            }
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: payload
            }
        default:
            return state;
    }
}

// Wishlist Reducer
export const wishlistReducer = (state = { wishlistItems: [] }, { type, payload }) => {
    switch (type) {
        case ADD_TO_WISHLIST:
            const wishItem = payload;
            const wishItemExist = state.wishlistItems.find((i) => i.product === wishItem.product);

            if (wishItemExist) {
                return {
                    ...state,
                    wishlistItems: state.wishlistItems.map((i) =>
                        i.product === wishItemExist.product ? wishItem : i
                    ),
                };
            } else {
                return {
                    ...state,
                    wishlistItems: [...state.wishlistItems, wishItem],
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
