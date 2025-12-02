const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user id'],
    unique: true,
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Please provide product id'],
      },
      quantity: {
        type: Number,
        required: [true, 'Please provide quantity'],
        default: 1,
        min: [1, 'Quantity cannot be less than 1'],
      },
      price: {
        type: Number,
        required: [true, 'Please provide price'],
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Cart', cartSchema);