const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: [true, 'Please provide address'],
    },
    city: {
      type: String,
      required: [true, 'Please provide city'],
    },
    state: {
      type: String,
      required: [true, 'Please provide state'],
    },
    country: {
      type: String,
      required: [true, 'Please provide country'],
    },
    pinCode: {
      type: Number,
      required: [true, 'Please provide pinCode'],
    },
    phoneNo: {
      type: Number,
      required: [true, 'Please provide phone number'],
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  paymentInfo: {
    id: String,
    status: String,
  },
  paymentMethod: {
    type: { type: String, enum: ['COD', 'Card'], required: true },
    details: String  // "Cash on Delivery" or "Card ending in ****1234"
  },
  paidAt: Date,
  itemsPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  taxPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  shippingPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  orderStatus: {
    type: String,
    default: 'Pending',
    enum: {
      values: ['Pending', 'Shipped', 'Approved', 'Declined'],
      message: 'Please select valid order status',
    },
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);