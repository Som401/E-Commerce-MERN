import { useState } from 'react';
import { useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import Header from '../Layouts/Header/Header';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

const Payment = () => {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { cartItems } = useSelector((state) => state.cart);

    // Payment state
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [cardNumber, setCardNumber] = useState("");
    const [cardHolderName, setCardHolderName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");

    const paymentSubmit = (e) => {
        e.preventDefault();

        if (paymentMethod === "Card") {
            if (!cardNumber || !cardHolderName || !expiryDate) {
                enqueueSnackbar("Please fill all card details", { variant: "error" });
                return;
            }
        }

        // Save payment info to sessionStorage for order confirmation
        const paymentInfo = {
            type: paymentMethod,
            details: paymentMethod === "COD" ? "Cash on Delivery" : `Card ending in ****${cardNumber.slice(-4)}`
        };
        sessionStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));

        navigate("/order/confirm");
    }

    return (
        <>
            <MetaData title="Payment Method" />
            <Header />
            <main className="w-full mt-20">

                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7 overflow-hidden">

                    <div className="flex-1">

                        <Stepper activeStep={3}>
                            <div className="w-full bg-white">

                                <h2 className="font-medium text-lg mx-1 sm:mx-8 mt-4">
                                    Select Payment Method
                                </h2>

                                <form onSubmit={paymentSubmit} autoComplete="off" className="flex flex-col justify-start gap-4 w-full sm:w-3/4 mx-1 sm:mx-8 my-4">

                                    <FormControl>
                                        <RadioGroup
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        >
                                            <FormControlLabel
                                                value="COD"
                                                control={<Radio />}
                                                label={
                                                    <div className="flex items-center gap-4">
                                                        <span className="font-medium">Cash on Delivery</span>
                                                    </div>
                                                }
                                            />
                                            <FormControlLabel
                                                value="Card"
                                                control={<Radio />}
                                                label={
                                                    <div className="flex items-center gap-4">
                                                        <span className="font-medium">Credit / Debit Card</span>
                                                    </div>
                                                }
                                            />
                                        </RadioGroup>
                                    </FormControl>

                                    {paymentMethod === "Card" && (
                                        <div className="flex flex-col gap-3 mt-2">
                                            <TextField
                                                value={cardNumber}
                                                onChange={(e) => setCardNumber(e.target.value)}
                                                fullWidth
                                                label="Card Number"
                                                variant="outlined"
                                                type="number"
                                                placeholder="1234 5678 9012 3456"
                                                required={paymentMethod === "Card"}
                                            />
                                            <TextField
                                                value={cardHolderName}
                                                onChange={(e) => setCardHolderName(e.target.value)}
                                                fullWidth
                                                label="Card Holder Name"
                                                variant="outlined"
                                                required={paymentMethod === "Card"}
                                            />
                                            <TextField
                                                value={expiryDate}
                                                onChange={(e) => setExpiryDate(e.target.value)}
                                                label="Expiry Date"
                                                variant="outlined"
                                                placeholder="MM/YY"
                                                required={paymentMethod === "Card"}
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                Note: We store only the last 4 digits for security. No actual payment processing.
                                            </p>
                                        </div>
                                    )}

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

export default Payment;
