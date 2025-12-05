import { mockProducts } from "../utils/mockData";
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

// Simulate async delay
const simulateDelay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Get All Products --- Filter/Search/Sort (MOCK)
export const getProducts =
    (keyword = "", category, price = [0, 200000], ratings = 0, currentPage = 1) => async (dispatch) => {
        try {
            dispatch({ type: ALL_PRODUCTS_REQUEST });

            await simulateDelay(400);

            let filteredProducts = [...mockProducts];

            // Filter by keyword (search in name and description)
            if (keyword) {
                filteredProducts = filteredProducts.filter(product =>
                    product.name.toLowerCase().includes(keyword.toLowerCase()) ||
                    product.description.toLowerCase().includes(keyword.toLowerCase())
                );
            }

            // Filter by category
            if (category) {
                filteredProducts = filteredProducts.filter(product =>
                    product.category.toLowerCase() === category.toLowerCase()
                );
            }

            // Filter by price range
            filteredProducts = filteredProducts.filter(product =>
                product.price >= price[0] && product.price <= price[1]
            );

            // Filter by ratings
            filteredProducts = filteredProducts.filter(product =>
                product.ratings >= ratings
            );

            // Pagination
            const productsPerPage = 8;
            const totalProducts = filteredProducts.length;
            const startIndex = (currentPage - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;
            const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

            dispatch({
                type: ALL_PRODUCTS_SUCCESS,
                payload: {
                    products: paginatedProducts,
                    productsCount: totalProducts,
                    resultPerPage: productsPerPage,
                    filteredProductsCount: totalProducts,
                },
            });
        } catch (error) {
            dispatch({
                type: ALL_PRODUCTS_FAIL,
                payload: "Failed to load products",
            });
        }
    };

// Get All Products Of Same Category (MOCK)
export const getSimilarProducts = (category) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST });

        await simulateDelay(300);

        const filteredProducts = mockProducts.filter(product =>
            product.category.toLowerCase() === category.toLowerCase()
        );

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: {
                products: filteredProducts,
                productsCount: filteredProducts.length,
                resultPerPage: 8,
                filteredProductsCount: filteredProducts.length,
            },
        });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: "Failed to load similar products",
        });
    }
};

// Get Product Details (MOCK)
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        await simulateDelay(300);

        const product = mockProducts.find(p => p._id === id);

        if (!product) {
            throw new Error("Product not found");
        }

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: product,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.message || "Failed to load product details",
        });
    }
};

// New/Update Review (MOCK)
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });

        await simulateDelay(500);

        // Simulate success
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: true,
        });
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: "Failed to submit review",
        });
    }
}

// Get All Products ---PRODUCT SLIDER (MOCK with caching)
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

        await simulateDelay(300);

        dispatch({
            type: SLIDER_PRODUCTS_SUCCESS,
            payload: mockProducts,
        });
    } catch (error) {
        dispatch({
            type: SLIDER_PRODUCTS_FAIL,
            payload: "Failed to load slider products",
        });
    }
};

// Get All Products ---ADMIN (MOCK)
export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCTS_REQUEST });

        await simulateDelay(300);

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: mockProducts,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: "Failed to load admin products",
        });
    }
};

// New Product ---ADMIN (MOCK)
export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });

        await simulateDelay(500);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: {
                success: true,
                product: productData,
            },
        });
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: "Failed to create product",
        });
    }
}

// Update Product ---ADMIN (MOCK)
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });

        await simulateDelay(500);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: true,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: "Failed to update product",
        });
    }
}

// Delete Product ---ADMIN (MOCK)
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });

        await simulateDelay(400);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: true,
        });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: "Failed to delete product",
        });
    }
}

// Get Product Reviews ---ADMIN (MOCK)
export const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_REVIEWS_REQUEST });

        await simulateDelay(300);

        const product = mockProducts.find(p => p._id === id);
        const reviews = product ? product.reviews : [];

        dispatch({
            type: ALL_REVIEWS_SUCCESS,
            payload: reviews,
        });
    } catch (error) {
        dispatch({
            type: ALL_REVIEWS_FAIL,
            payload: "Failed to load reviews",
        });
    }
}

// Delete Product Review ---ADMIN (MOCK)
export const deleteReview = (reviewId, productId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST });

        await simulateDelay(400);

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: true,
        });
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: "Failed to delete review",
        });
    }
}

// Clear All Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}