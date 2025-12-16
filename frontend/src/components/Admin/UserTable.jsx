import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { clearErrors, deleteUser, getAllUsers } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';
import MetaData from '../Layouts/MetaData';
import Dashboard from './Dashboard';
import DeleteIcon from '@mui/icons-material/Delete';

const UserTable = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { users, error } = useSelector((state) => state.users);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.userDetails);

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
            enqueueSnackbar("User Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_USER_RESET });
        }
        dispatch(getAllUsers());
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

    const deleteUserHandler = (id, role) => {
        if (role === 'admin') {
            enqueueSnackbar("Cannot delete admin users!", { variant: "error" });
            return;
        }
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(id));
        }
    }

    const columns = [
        {
            field: "id",
            headerName: "User ID",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.4,
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "role",
            headerName: "Role",
            minWidth: 100,
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <span className={`px-3 py-1 rounded-full font-medium ${params.row.role === 'admin' ? 'text-purple-600 bg-purple-100' : 'text-gray-600 bg-gray-100'}`}>
                        {params.row.role}
                    </span>
                );
            },
        },
        {
            field: "joinedOn",
            headerName: "Joined On",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.2,
            sortable: false,
            renderCell: (params) => {
                return (
                    <button
                        onClick={() => deleteUserHandler(params.row.id, params.row.role)}
                        className={`${params.row.role === 'admin' ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:text-red-800'}`}
                        disabled={params.row.role === 'admin'}
                    >
                        <DeleteIcon />
                    </button>
                );
            },
        },
    ];

    const rows = [];

    users && users.forEach((item) => {
        rows.push({
            id: item._id,
            name: item.name,
            email: item.email,
            role: item.role,
            joinedOn: new Date(item.createdAt).toLocaleDateString(),
        });
    });

    return (
        <>
            <MetaData title="Admin Users" />
            <Dashboard activeTab={4}>
                <div className="flex justify-between items-center">
                    <h1 className="text-lg font-medium uppercase">Users</h1>
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

export default UserTable;
