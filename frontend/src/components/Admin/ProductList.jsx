import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import {
    clearErrors,
    getAdminProducts,
    deleteProduct,
} from '../../actions/productAction';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from './Sidebar';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductList = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { error, products } = useSelector((state) => state.products);

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.product
    );

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }

        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearErrors());
        }

        if (isDeleted) {
            enqueueSnackbar("Product Deleted Successfully", { variant: "success" });
            navigate("/admin/dashboard");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }

        dispatch(getAdminProducts());
    }, [dispatch, error, deleteError, isDeleted, navigate, enqueueSnackbar]);

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className="flex items-center">
                        <Link to={`/admin/product/${params.id}`} className="text-gray-600 hover:text-primary-blue mr-4 transition-colors">
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteProductHandler(params.id)
                            }
                            className="text-gray-600 hover:text-red-500 transition-colors min-w-0 p-0"
                        >
                            <DeleteIcon />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const rows = [];

    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.Stock,
                price: item.price,
                name: item.name,
            });
        });

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 ml-64 p-8">
                <h1 className="text-3xl font-bold text-gray-700 mb-8 text-center">ALL PRODUCTS</h1>

                <div className="bg-white rounded-lg shadow-sm p-6 h-[80vh]">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="border-none"
                        autoHeight
                        sx={{
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#4B0082',
                                color: 'white',
                                fontSize: '1rem',
                            },
                            '& .MuiDataGrid-iconSeparator': {
                                display: 'none',
                            },
                            '& .MuiDataGrid-cell:focus': {
                                outline: 'none',
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductList;
