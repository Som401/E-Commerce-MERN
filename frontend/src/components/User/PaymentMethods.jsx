import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPaymentMethod, deletePaymentMethod, setDefaultPayment } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const PaymentMethods = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useSelector((state) => state.user);

    const [open, setOpen] = useState(false);
    const [paymentType, setPaymentType] = useState("COD");
    const [cardNumber, setCardNumber] = useState("");
    const [cardHolderName, setCardHolderName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");

    const paymentMethods = user?.paymentMethods || [];

    const handleAddPayment = async () => {
        if (paymentType === "Card") {
            if (!cardNumber || !cardHolderName || !expiryDate) {
                enqueueSnackbar("Please fill all card details", { variant: "error" });
                return;
            }
        }

        const paymentData = { type: paymentType };

        if (paymentType === "Card") {
            paymentData.cardNumber = cardNumber;
            paymentData.cardHolderName = cardHolderName;
            paymentData.expiryDate = expiryDate;
        }

        const error = await dispatch(addPaymentMethod(paymentData));

        if (error) {
            enqueueSnackbar(error, { variant: "error" });
        } else {
            enqueueSnackbar("Payment method added successfully", { variant: "success" });
            setOpen(false);
            // Reset form
            setPaymentType("COD");
            setCardNumber("");
            setCardHolderName("");
            setExpiryDate("");
        }
    };

    const handleDelete = async (paymentId) => {
        const error = await dispatch(deletePaymentMethod(paymentId));
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
        } else {
            enqueueSnackbar("Payment method deleted successfully", { variant: "success" });
        }
    };

    const handleSetDefault = async (paymentId) => {
        const error = await dispatch(setDefaultPayment(paymentId));
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
        } else {
            enqueueSnackbar("Default payment method updated", { variant: "success" });
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">Saved Payment Methods</h2>
                <button
                    onClick={() => setOpen(true)}
                    className="bg-primary-blue text-white px-6 py-2 rounded-sm hover:shadow-lg uppercase text-sm"
                >
                    Add Payment Method
                </button>
            </div>

            {paymentMethods.length === 0 ? (
                <div className="bg-white shadow-sm rounded p-8 text-center text-gray-500">
                    No saved payment methods yet. Add your first payment method!
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {paymentMethods.map((payment) => (
                        <div key={payment._id} className="bg-white shadow-sm rounded p-4 flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <p className="font-medium">
                                        {payment.type === "COD" ? "Cash on Delivery" : `Card ending in ****${payment.cardNumber}`}
                                    </p>
                                    {payment.isDefault && (
                                        <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded">Default</span>
                                    )}
                                </div>
                                {payment.type === "Card" && (
                                    <>
                                        <p className="text-sm text-gray-600">Holder: {payment.cardHolderName}</p>
                                        <p className="text-sm text-gray-600">Expires: {payment.expiryDate}</p>
                                    </>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                {!payment.isDefault && (
                                    <button
                                        onClick={() => handleSetDefault(payment._id)}
                                        className="text-primary-blue text-sm hover:underline"
                                    >
                                        Set as Default
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(payment._id)}
                                    className="text-red-500 text-sm hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Payment Method Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Add Payment Method</DialogTitle>
                <DialogContent>
                    <div className="flex flex-col gap-4 mt-2">
                        <FormControl>
                            <RadioGroup
                                value={paymentType}
                                onChange={(e) => setPaymentType(e.target.value)}
                            >
                                <FormControlLabel
                                    value="COD"
                                    control={<Radio />}
                                    label="Cash on Delivery"
                                />
                                <FormControlLabel
                                    value="Card"
                                    control={<Radio />}
                                    label="Credit / Debit Card"
                                />
                            </RadioGroup>
                        </FormControl>

                        {paymentType === "Card" && (
                            <div className="flex flex-col gap-3">
                                <TextField
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    label="Card Number"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    placeholder="1234 5678 9012 3456"
                                    required
                                />
                                <TextField
                                    value={cardHolderName}
                                    onChange={(e) => setCardHolderName(e.target.value)}
                                    label="Card Holder Name"
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                                <TextField
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    label="Expiry Date (MM/YY)"
                                    variant="outlined"
                                    placeholder="12/25"
                                    required
                                />
                                <p className="text-xs text-gray-500">
                                    Note: We store only the last 4 digits for security.
                                </p>
                            </div>
                        )}
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
                        onClick={handleAddPayment}
                        className="bg-primary-blue text-white px-6 py-2 rounded hover:shadow-lg"
                    >
                        Add Payment Method
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PaymentMethods;
