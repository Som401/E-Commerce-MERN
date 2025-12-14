import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { useSnackbar } from 'notistack';
import { saveShippingInfo } from '../../actions/cartAction';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import Header from '../Layouts/Header/Header';

const Shipping = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { cartItems } = useSelector((state) => state.cart);
    const { shippingInfo } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const [name, setName] = useState(shippingInfo.name || "");
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");
    const [address, setAddress] = useState(shippingInfo.address || "");
    const [city, setCity] = useState(shippingInfo.city || "");
    const [state, setState] = useState(shippingInfo.state || "");
    const [country, setCountry] = useState(shippingInfo.country || "France");
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");

    // Check if user has saved addresses
    const savedAddresses = user?.addresses || [];

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length !== 9) {
            enqueueSnackbar("Phone Number must be exactly 9 digits", { variant: "error" });
            return;
        }

        dispatch(saveShippingInfo({ name, phoneNo, address, city, state, country, pinCode }));
        navigate("/payment");
    }

    const applySavedAddress = (addr) => {
        setName(addr.name);
        setPhoneNo(addr.phoneNo.toString());
        setAddress(addr.address);
        setCity(addr.city);
        setState(addr.state);
        setCountry(addr.country);
        setPinCode(addr.pinCode.toString());
    }

    return (
        <>
            <MetaData title="Shipping Details" />
            <Header />
            <main className="w-full mt-20">

                {/* row */}
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7 overflow-hidden">

                    {/* cart column */}
                    <div className="flex-1">

                        <Stepper activeStep={2}>
                            <div className="w-full bg-white">

                                {/* Saved Addresses */}
                                {savedAddresses.length > 0 && (
                                    <div className="flex flex-col gap-2 w-full sm:w-3/4 mx-1 sm:mx-8 my-4">
                                        <h2 className="font-medium text-lg">Saved Addresses</h2>
                                        <div className="flex flex-col gap-2">
                                            {savedAddresses.map((addr) => (
                                                <div key={addr._id} className="border p-3 rounded flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium">{addr.name}</p>
                                                        <p className="text-sm text-gray-600">{addr.address}, {addr.city}</p>
                                                        <p className="text-sm text-gray-600">{addr.state}, {addr.country} - {addr.pinCode}</p>
                                                        <p className="text-sm text-gray-600">Phone: {addr.phoneNo}</p>
                                                        {addr.isDefault && <span className="text-xs bg-primary-blue text-white px-2 py-0.5 rounded mt-1 inline-block">Default</span>}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => applySavedAddress(addr)}
                                                        className="bg-primary-blue text-white text-sm px-4 py-2 rounded-sm hover:shadow-lg"
                                                    >
                                                        Use This
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="border-t my-4"></div>
                                    </div>
                                )}

                                <h2 className="font-medium text-lg mx-1 sm:mx-8 mt-4">
                                    {savedAddresses.length > 0 ? 'Or Enter New Address' : 'Enter Shipping Address'}
                                </h2>

                                <form onSubmit={shippingSubmit} autoComplete="off" className="flex flex-col justify-start gap-3 w-full sm:w-3/4 mx-1 sm:mx-8 my-4">

                                    <TextField
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        fullWidth
                                        label="Full Name"
                                        variant="outlined"
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
                                            fullWidth
                                            variant="outlined"
                                            placeholder="6 12 34 56 78"
                                            required
                                            inputProps={{ maxLength: 9 }}
                                        />
                                    </div>

                                    <TextField
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        fullWidth
                                        label="Address"
                                        variant="outlined"
                                        required
                                    />

                                    <div className="flex gap-6">
                                        <TextField
                                            value={pinCode}
                                            onChange={(e) => setPinCode(e.target.value)}
                                            type="number"
                                            label="Pin Code"
                                            fullWidth
                                            variant="outlined"
                                            required
                                        />
                                        <TextField
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            label="City"
                                            fullWidth
                                            variant="outlined"
                                            required
                                        />
                                    </div>

                                    <div className="flex gap-6">
                                        <TextField
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            label="State"
                                            fullWidth
                                            variant="outlined"
                                            required
                                        />
                                        <TextField
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            label="Country"
                                            fullWidth
                                            variant="outlined"
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="bg-primary-orange w-full sm:w-1/3 my-2 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none">
                                        Continue
                                    </button>

                                </form>

                            </div>
                        </Stepper>

                    </div>

                    <PriceSidebar cartItems={cartItems} />

                </div>
            </main>
        </>
    );
};

export default Shipping;
