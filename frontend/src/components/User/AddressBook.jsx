import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, deleteAddress, setDefaultAddress } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const AddressBook = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useSelector((state) => state.user);

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("France");
    const [pinCode, setPinCode] = useState("");

    const addresses = user?.addresses || [];

    const handleAddAddress = async () => {
        if (!name || !phoneNo || !address || !city || !state || !pinCode) {
            enqueueSnackbar("Please fill all fields", { variant: "error" });
            return;
        }

        if (phoneNo.length !== 9) {
            enqueueSnackbar("Phone number must be 9 digits", { variant: "error" });
            return;
        }

        const error = await dispatch(addAddress({ name, phoneNo, address, city, state, country, pinCode }));

        if (error) {
            enqueueSnackbar(error, { variant: "error" });
        } else {
            enqueueSnackbar("Address added successfully", { variant: "success" });
            setOpen(false);
            // Reset form
            setName("");
            setPhoneNo("");
            setAddress("");
            setCity("");
            setState("");
            setPinCode("");
        }
    };

    const handleDelete = async (addressId) => {
        const error = await dispatch(deleteAddress(addressId));
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
        } else {
            enqueueSnackbar("Address deleted successfully", { variant: "success" });
        }
    };

    const handleSetDefault = async (addressId) => {
        const error = await dispatch(setDefaultAddress(addressId));
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
        } else {
            enqueueSnackbar("Default address updated", { variant: "success" });
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">Saved Addresses</h2>
                <button
                    onClick={() => setOpen(true)}
                    className="bg-primary-blue text-white px-6 py-2 rounded-sm hover:shadow-lg uppercase text-sm"
                >
                    Add New Address
                </button>
            </div>

            {addresses.length === 0 ? (
                <div className="bg-white shadow-sm rounded p-8 text-center text-gray-500">
                    No saved addresses yet. Add your first address!
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {addresses.map((addr) => (
                        <div key={addr._id} className="bg-white shadow-sm rounded p-4 flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <p className="font-medium">{addr.name}</p>
                                    {addr.isDefault && (
                                        <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded">Default</span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600">{addr.address}</p>
                                <p className="text-sm text-gray-600">{addr.city}, {addr.state} - {addr.pinCode}</p>
                                <p className="text-sm text-gray-600">{addr.country}</p>
                                <p className="text-sm text-gray-600 mt-1">Phone: +33 {addr.phoneNo}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                {!addr.isDefault && (
                                    <button
                                        onClick={() => handleSetDefault(addr._id)}
                                        className="text-primary-blue text-sm hover:underline"
                                    >
                                        Set as Default
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(addr._id)}
                                    className="text-red-500 text-sm hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Address Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Address</DialogTitle>
                <DialogContent>
                    <div className="flex flex-col gap-3 mt-2">
                        <TextField
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label="Full Name"
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <div className="flex gap-2">
                            <TextField
                                value="+33"
                                disabled
                                label="Code"
                                variant="outlined"
                                sx={{ width: '100px' }}
                            />
                            <TextField
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                type="tel"
                                label="Phone Number"
                                variant="outlined"
                                fullWidth
                                placeholder="6 12 34 56 78"
                                required
                                inputProps={{ maxLength: 9 }}
                            />
                        </div>
                        <TextField
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            label="Address"
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <div className="flex gap-3">
                            <TextField
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                label="City"
                                variant="outlined"
                                fullWidth
                                required
                            />
                            <TextField
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                                type="number"
                                label="Pin Code"
                                variant="outlined"
                                fullWidth
                                required
                            />
                        </div>
                        <div className="flex gap-3">
                            <TextField
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                label="State"
                                variant="outlined"
                                fullWidth
                                required
                            />
                            <TextField
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                label="Country"
                                variant="outlined"
                                fullWidth
                                required
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => setOpen(false)}
                        className="text-gray-600 px-4 py-2 hover:bg-gray-100 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddAddress}
                        className="bg-primary-blue text-white px-6 py-2 rounded hover:shadow-lg"
                    >
                        Add Address
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddressBook;
