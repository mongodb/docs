// Load environment variables
require('dotenv').config();

// Establish the secondary MongoDB connection
const db = require("./db.secondary.js")(process.env.SECONDARY_CONN_STR, {
    // (optional) connection options
});

// Import Product Schema
const SecondaryProductSchema = require("./product.schema.js")({
    collection: "products",
    // Pass configuration options if needed
});

// Create Model using the secondary connection
const SecondaryProductModel = db.model("Product", SecondaryProductSchema);

// Sample products data for secondary database
const SecondarySampleProducts = [
    {
        name: "Smart Watch",
        price: 199.99,
        category: "Electronics",
        description: "Advanced fitness tracking smartwatch"
    },
    {
        name: "Bluetooth Speaker",
        price: 79.99,
        category: "Electronics", 
        description: "Portable wireless speaker with premium sound"
    },
    {
        name: "Desk Lamp",
        price: 49.99,
        category: "Home",
        description: "LED desk lamp with adjustable brightness"
    }
];

// Wait for secondary connection to be ready before executing operations
db.once('open', async () => {
    console.log('Secondary database connected, executing operations...');

    try {
        // Check if products already exist
        const existingCount = await SecondaryProductModel.countDocuments();
        console.log(`Existing products in secondary DB: ${existingCount}`);
        
        if (existingCount === 0) {
            console.log('Inserting sample products into secondary database...');
            await SecondaryProductModel.insertMany(SecondarySampleProducts);
            console.log('Sample products inserted into secondary database!');
        }

        // Find and display a product
        let product = await SecondaryProductModel.findOne();
        console.log('Product found in secondary DB:', product);
        
        // Display all products
        const allProducts = await SecondaryProductModel.find();
        console.log(`Total products in secondary DB: ${allProducts.length}`);
    } catch (error) {
        console.error('Error with secondary database operations:', error);
    }
});