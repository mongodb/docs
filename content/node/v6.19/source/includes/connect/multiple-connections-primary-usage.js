// Load environment variables
require('dotenv').config();
const mongoose = require("mongoose");

// Async function to establish the primary MongoDB connection
async function establishPrimaryConnection() {
    try {
        await require("./db.primary.js")(process.env.PRIMARY_CONN_STR, {
            // (optional) connection options
        });
    } catch (error) {
        console.error('Failed to establish primary connection:', error);
        process.exit(1);
    }
}

// Initialize connection
establishPrimaryConnection();

// Import Product Schema
const productSchema = require("./product.schema.js")({
    collection: "products",
    // Pass configuration options if needed
});

// Create Model
const ProductModel = mongoose.model("Product", productSchema);

// Sample products data
const sampleProducts = [
    {
        name: "Laptop Pro",
        price: 1299.99,
        category: "Electronics",
        description: "High-performance laptop for professionals"
    },
    {
        name: "Wireless Headphones",
        price: 199.99,
        category: "Electronics",
        description: "Premium noise-cancelling headphones"
    },
    {
        name: "Coffee Maker",
        price: 89.99,
        category: "Kitchen",
        description: "Automatic drip coffee maker"
    }
];

// Wait for connection to be ready before executing operations
mongoose.connection.once('open', async () => {
    console.log('Primary database connected, executing operations...');

    try {
        // Check if products already exist
        const existingCount = await ProductModel.countDocuments();
        console.log(`Existing products in primary DB: ${existingCount}`);
        
        if (existingCount === 0) {
            console.log('Inserting sample products into primary database...');
            await ProductModel.insertMany(sampleProducts);
            console.log('Sample products inserted into primary database!');
        }

        // Find and display a product
        let product = await ProductModel.findOne();
        console.log('Product found in primary DB:', product);
        
        // Display all products
        const allProducts = await ProductModel.find();
        console.log(`Total products in primary DB: ${allProducts.length}`);
    } catch (error) {
        console.error('Error with primary database operations:', error);
    }
});
