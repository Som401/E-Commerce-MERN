const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../config/config.env') });

const Product = require('../models/productModel');

// Connect to MongoDB
const connectDatabase = () => {
    return mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

// Import products from JSON file
const importProducts = async () => {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await connectDatabase();
        console.log('✅ Connected to MongoDB Atlas');

        // Read the JSON file
        const jsonPath = path.join(__dirname, '../data/products-import.json');
        const fileContent = fs.readFileSync(jsonPath, 'utf-8');

        // Parse NDJSON (newline-delimited JSON)
        const lines = fileContent.trim().split('\n');
        const products = lines.map(line => JSON.parse(line));

        console.log(`📦 Found ${products.length} products to import`);

        // Create a default admin user ID (you should replace this with an actual admin user ID)
        // For now, we'll use a placeholder ObjectId
        const defaultAdminId = new mongoose.Types.ObjectId();

        // Transform products to match the schema
        const transformedProducts = products.map(product => {
            // Generate public_id for images if not present
            const imagesWithPublicId = product.images.map((img, index) => ({
                public_id: img.public_id || `product_${Date.now()}_${index}`,
                url: img.url
            }));

            return {
                name: product.name,
                description: product.description,
                price: product.price,
                cuttedPrice: product.cuttedPrice,
                ratings: product.ratings || product.rating || 0,
                images: imagesWithPublicId,
                category: product.category,
                brand: product.brand,
                highlights: product.highlights,
                specifications: product.specifications,
                warranty: product.warranty || 1,
                stock: product.stock || product.Stock || 1,
                numOfReviews: product.numOfReviews || 0,
                reviews: product.reviews || [],
                user: defaultAdminId,
                createdAt: new Date()
            };
        });

        // Clear existing products (optional - comment out if you want to keep existing products)
        console.log('🗑️  Clearing existing products...');
        await Product.deleteMany({});

        // Insert products
        console.log('📥 Importing products...');
        const result = await Product.insertMany(transformedProducts);

        console.log(`✅ Successfully imported ${result.length} products!`);
        console.log('\n📊 Sample product:');
        console.log(JSON.stringify(result[0], null, 2));

        process.exit(0);
    } catch (error) {
        console.error('❌ Error importing products:', error);
        process.exit(1);
    }
};

// Run the import
importProducts();
