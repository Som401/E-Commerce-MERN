const mongoose = require('mongoose');

// Schema definition
const productSchema = new mongoose.Schema({
    // product name
    name: {
        type: String,                    // Type : texte
        required: [true, "Please Enter Product Name"],  // Obligatoire
        trim: true,                      // Supprimer les espaces au début/fin
        maxLength: [100, "Product Name cannot exceed 100 characters"]
    },
    
    // Description
    description: {
        type: String,
        required: [true, "Please Enter Product Description"],
    },
    
    // Price
    price: {
        type: Number,
        required: [true, "Please Enter Product Price"],
        maxLength: [8, "Price cannot exceed 8 digits"]
    },
    
    // rating score
    rating: {
        type: Number,
        default: 0
    },
    
    // product  images
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    
    // Category
    category: {
        type: String,
        required: [true, "Please Enter Product Category"]
    },
    
    // Stock disponible
    Stock: {
        type: Number,
        required: [true, "Please Enter Product Stock"],
        default: 1
    },
    
    // Nummber of reviews
    numOfReviews: {
        type: Number,
        default: 0
    },
    
    // reviews of users 
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",  // Référence au modèle User
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
    
    // admin of the product who create 
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    
//date of creation 
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// mdole exporting
module.exports = mongoose.model("Product", productSchema);