const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name"],
        trim: true,
        maxLength: [200, "Product Name cannot exceed 200 characters"]
    },

    description: {
        type: String,
        required: [true, "Please Enter Product Description"],
    },

    price: {
        type: Number,
        required: [true, "Please Enter Product Price"],
        maxLength: [8, "Price cannot exceed 8 digits"]
    },

    cuttedPrice: {
        type: Number,
    },

    ratings: {
        type: Number,
        default: 0
    },

    images: [
        {
            public_id: {
                type: String,
                required: false
            },
            url: {
                type: String,
                required: true
            }
        }
    ],

    category: {
        type: String,
        required: [true, "Please Enter Product Category"]
    },
    brand: {
        name: {
            type: String,
        },
        logo: {
            public_id: String,
            url: String
        }
    },

    highlights: [String],

    specifications: [
        {
            title: String,
            description: String
        }
    ],

    warranty: {
        type: Number,
        default: 1
    },

    stock: {
        type: Number,
        required: [true, "Please Enter Product Stock"],
        default: 1
    },

    numOfReviews: {
        type: Number,
        default: 0
    },

    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", productSchema);