import axios from 'axios';
import {
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    CLEAR_ERRORS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    ALL_REVIEWS_REQUEST,
    ALL_REVIEWS_SUCCESS,
    ALL_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    SLIDER_PRODUCTS_REQUEST,
    SLIDER_PRODUCTS_SUCCESS,
    SLIDER_PRODUCTS_FAIL,
} from "../constants/productConstants";

// Get All Products --- Filter/Search/Sort
export const getProducts =
    (keyword = "", category, price = [0, 6000], ratings = 0, currentPage = 1, sort = "") => async (dispatch) => {
        try {
            dispatch({ type: ALL_PRODUCTS_REQUEST });

            let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

            if (category) {
                link += `&category=${category}`;
            }

            if (sort) {
                link += `&sort=${sort}`;
            }

            const { data } = await axios.get(link);

            dispatch({
                type: ALL_PRODUCTS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ALL_PRODUCTS_FAIL,
                payload: error.response?.data?.message || "Failed to load products",
            });
        }
    };

// Get All Products Of Same Category
export const getSimilarProducts = (category) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST });

        const { data } = await axios.get(`/api/v1/products?category=${category}`);

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response?.data?.message || "Failed to load similar products",
        });
    }
};

// Get Product Details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response?.data?.message || "Failed to load product details",
        });
    }
};

// New/Update Review
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(`/api/v1/review`, reviewData, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response?.data?.message || "Failed to submit review",
        });
    }
}

// Get All Products ---PRODUCT SLIDER (with caching)
export const getSliderProducts = (force = false) => async (dispatch, getState) => {
    try {
        // Get current state
        const { products } = getState();

        // Check if products are already cached and we're not forcing a refresh
        if (!force && products.isCached && products.products && products.products.length > 0) {
            const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
            const isCacheValid = products.cachedAt && (Date.now() - products.cachedAt < CACHE_DURATION);

            if (isCacheValid) {
                console.log('Using cached products');
                return;
            }
        }

        dispatch({ type: SLIDER_PRODUCTS_REQUEST });

        // Fetch ALL products for caching (no pagination)
        const { data } = await axios.get('/api/v1/products?all=true');

        dispatch({
            type: SLIDER_PRODUCTS_SUCCESS,
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: SLIDER_PRODUCTS_FAIL,
            payload: error.response?.data?.message || "Failed to load slider products",
        });
    }
};

// Get All Products ---ADMIN
export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCTS_REQUEST });

        const { data } = await axios.get('/api/v1/admin/products');

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response?.data?.message || "Failed to load admin products",
        });
    }
};

// New Product ---ADMIN
export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            `/api/v1/admin/product/new`,
            productData,
            config
        );

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response?.data?.message || "Failed to create product",
        });
    }
}

// Update Product ---ADMIN
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(
            `/api/v1/admin/product/${id}`,
            productData,
            config
        );

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response?.data?.message || "Failed to update product",
        });
    }
}

// Delete Product ---ADMIN
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response?.data?.message || "Failed to delete product",
        });
    }
}

// Get Product Reviews ---ADMIN
export const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_REVIEWS_REQUEST });

        const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

        dispatch({
            type: ALL_REVIEWS_SUCCESS,
            payload: data.reviews,
        });
    } catch (error) {
        dispatch({
            type: ALL_REVIEWS_FAIL,
            payload: error.response?.data?.message || "Failed to load reviews",
        });
    }
}

// Delete Product Review ---ADMIN
export const deleteReview = (reviewId, productId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST });

        const { data } = await axios.delete(`/api/v1/review/${reviewId}?productId=${productId}`);

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response?.data?.message || "Failed to delete review",
        });
    }
}

// Clear All Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}