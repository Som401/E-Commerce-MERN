import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { deleteReview } from '../../actions/productAction';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';
import MetaData from '../Layouts/MetaData';
import Dashboard from './Dashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';

const ReviewsTable = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { products } = useSelector((state) => state.products);
    const [searchTerm, setSearchTerm] = useState("");
    const [allReviews, setAllReviews] = useState([]);

    // Collect all reviews from all products
    useEffect(() => {
        if (products && products.length > 0) {
            const reviews = [];
            products.forEach((product) => {
                if (product.reviews && product.reviews.length > 0) {
                    product.reviews.forEach((review) => {
                        reviews.push({
                            ...review,
                            productId: product._id,
                            productName: product.name,
                        });
                    });
                }
            });
            setAllReviews(reviews);
        }
    }, [products]);

    const deleteReviewHandler = async (reviewId, productId) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            try {
                await dispatch(deleteReview(reviewId, productId));
                enqueueSnackbar("Review Deleted Successfully", { variant: "success" });
                dispatch({ type: DELETE_REVIEW_RESET });
                // Refresh reviews
                const reviews = [];
                products.forEach((product) => {
                    if (product.reviews && product.reviews.length > 0) {
                        product.reviews.forEach((review) => {
                            if (review._id !== reviewId) {
                                reviews.push({
                                    ...review,
                                    productId: product._id,
                                    productName: product.name,
                                });
                            }
                        });
                    }
                });
                setAllReviews(reviews);
            } catch (error) {
                enqueueSnackbar(error.message || "Error deleting review", { variant: "error" });
            }
        }
    };

    const columns = [
        {
            field: "id",
            headerName: "Review ID",
            minWidth: 200,
            flex: 0.4,
        },
        {
            field: "productName",
            headerName: "Product",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "user",
            headerName: "User",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "rating",
            headerName: "Rating",
            minWidth: 120,
            flex: 0.2,
            renderCell: (params) => {
                return <Rating readOnly value={params.row.rating} size="small" precision={0.5} />
            }
        },
        {
            field: "comment",
            headerName: "Comment",
            minWidth: 300,
            flex: 0.6,
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.2,
            sortable: false,
            renderCell: (params) => {
                return (
                    <button onClick={() => deleteReviewHandler(params.row.id, params.row.productId)} className="text-red-600 hover:text-red-800">
                        <DeleteIcon />
                    </button>
                );
            },
        },
    ];

    // Filter reviews by product name
    const filteredReviews = allReviews.filter((review) =>
        review.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const rows = filteredReviews.map((review) => ({
        id: review._id,
        productId: review.productId,
        productName: review.productName,
        user: review.name,
        rating: review.rating,
        comment: review.comment,
    }));

    return (
        <>
            <MetaData title="Admin Reviews" />
            <Dashboard activeTab={5}>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-center bg-white p-4 rounded-lg shadow">
                        <TextField
                            label="Search by Product Name"
                            variant="outlined"
                            size="small"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1"
                            placeholder="Type product name to filter..."
                        />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm("")} className="text-sm text-blue-600 hover:underline">
                                Clear Filter
                            </button>
                        )}
                    </div>

                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-medium uppercase">All Product Reviews</h1>
                        <span className="text-gray-600">
                            {searchTerm ? `${filteredReviews.length} of ${allReviews.length} ` : `${allReviews.length} `} review(s)
                        </span>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 470 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectIconOnClick
                            sx={{
                                boxShadow: 0,
                                border: 0,
                            }}
                        />
                    </div>
                </div>
            </Dashboard>
        </>
    );
};

export default ReviewsTable;
