import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { clearErrors, deleteOrder, getAllOrders } from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';
import MetaData from '../Layouts/MetaData';
import Dashboard from './Dashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { formatDate } from '../../utils/functions';

const OrderTable = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { orders, error } = useSelector((state) => state.allOrders);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.order);

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
            enqueueSnackbar("Order Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_ORDER_RESET });
        }
        dispatch(getAllOrders());
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

    const deleteOrderHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            dispatch(deleteOrder(id));
        }
    }

    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.3,
            renderCell: (params) => {
                const statusColors = {
                    'Processing': 'text-yellow-600 bg-yellow-100',
                    'Shipped': 'text-blue-600 bg-blue-100',
                    'Delivered': 'text-green-600 bg-green-100',
                };
                return (
                    <span className={`px-3 py-1 rounded-full font-medium ${statusColors[params.row.status] || 'text-gray-600 bg-gray-100'}`}>
                        {params.row.status}
                    </span>
                );
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 100,
            flex: 0.2,
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            renderCell: (params) => {
                return <span>€{params.row.amount.toLocaleString()}</span>;
            },
        },
        {
            field: "date",
            headerName: "Order Date",
            minWidth: 150,
            flex: 0.3,
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
                        <Link to={`/admin/order/${params.row.id}`} className="text-blue-600 hover:text-blue-800">
                            <EditIcon />
                        </Link>
                        <button onClick={() => deleteOrderHandler(params.row.id)} className="text-red-600 hover:text-red-800">
                            <DeleteIcon />
                        </button>
                    </div>
                );
            },
        },
    ];

    const rows = [];

    orders && orders.forEach((item) => {
        rows.unshift({
            id: item._id,
            status: item.orderStatus,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
            date: new Date(item.createdAt).toLocaleDateString(),
        });
    });

    return (
        <>
            <MetaData title="Admin Orders" />
            <Dashboard activeTab={1}>
                <div className="flex justify-between items-center">
                    <h1 className="text-lg font-medium uppercase">Orders</h1>
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

export default OrderTable;
