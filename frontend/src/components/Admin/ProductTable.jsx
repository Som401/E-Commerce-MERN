import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { clearErrors, deleteProduct, getAdminProducts } from '../../actions/productAction';
import Rating from '@mui/material/Rating';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
import MetaData from '../Layouts/MetaData';
import Dashboard from './Dashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ProductTable = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { products, error } = useSelector((state) => state.products);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.product);

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
            dispatch({ type: DELETE_PRODUCT_RESET });
            dispatch({ type: 'INVALIDATE_CACHE' }); // Clear cache after delete
        }
        dispatch(getAdminProducts());
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

    const deleteProductHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(id));
        }
    }

    const columns = [
        {
            field: "id",
            headerName: "Product ID",
            minWidth: 100,
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full">
                            <img draggable="false" src={params.row.image} alt={params.row.name} className="w-full h-full rounded-full object-cover" />
                        </div>
                        {params.row.name}
                    </div>
                )
            },
        },
        {
            field: "category",
            headerName: "Category",
            minWidth: 100,
            flex: 0.3,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 70,
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <span className={params.row.stock < 10 ? "text-red-600 font-medium" : ""}>{params.row.stock}</span>
                )
            },
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 100,
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <span>€{params.row.price.toLocaleString()}</span>
                );
            },
        },
        {
            field: "rating",
            headerName: "Rating",
            minWidth: 100,
            flex: 0.2,
            renderCell: (params) => {
                return <Rating readOnly value={params.row.rating} size="small" precision={0.5} />
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 150,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className="flex gap-2">
                        <Link to={`/admin/product/${params.row.id}`} className="text-blue-600 hover:text-blue-800">
                            <EditIcon />
                        </Link>
                        <button onClick={() => deleteProductHandler(params.row.id)} className="text-red-600 hover:text-red-800">
                            <DeleteIcon />
                        </button>
                    </div>
                );
            },
        },
    ];

    const rows = [];

    products && products.forEach((item) => {
        rows.unshift({
            id: item._id,
            name: item.name,
            image: item.images[0].url,
            category: item.category,
            stock: item.stock,
            price: item.price,
            rating: item.ratings,
        });
    });

    return (
        <>
            <MetaData title="Admin Products" />
            <Dashboard activeTab={2}>
                <div className="flex justify-between items-center">
                    <h1 className="text-lg font-medium uppercase">Products</h1>
                    <Link to="/admin/new_product" className="py-2 px-4 rounded shadow font-medium text-white bg-primary-blue hover:shadow-lg">New Product</Link>
                </div>
                <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 470 }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectIconOnClick
                        loading={loading}
                        sx={{
                            boxShadow: 0,
                            border: 0,
                        }}
                    />
                </div>
            </Dashboard>
        </>
    );
};

export default ProductTable;
