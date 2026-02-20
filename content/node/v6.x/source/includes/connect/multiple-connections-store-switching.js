// Load environment variables
require('dotenv').config();

// Establish the secondary MongoDB connection
const db = require("./db.secondary.js")(process.env.SECONDARY_CONN_STR, {
    // (optional) connection options
});

// Import Product Schema
const secondaryProductSchema = require("./product.schema.js")({
    collection: "products",
    // strict: false // that doesn't adhere strictly to the schema!
    // Pass configuration options if needed
});

// Base sample products data
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

// Sample store-specific products
const storeAProducts = sampleProducts.map(product => ({
    ...product,
    store: { name: "Store A" },
    storeId: "A"
}));

const storeBProducts = [
    {
        name: "Gaming Chair",
        price: 299.99,
        category: "Furniture",
        description: "Ergonomic gaming chair with RGB lighting",
        store: { name: "Store B" },
        storeId: "B"
    },
    {
        name: "Mechanical Keyboard",
        price: 149.99,
        category: "Electronics",
        description: "RGB mechanical gaming keyboard",
        store: { name: "Store B" },
        storeId: "B"
    }
];

// Create a connection for 'Store A'
const storeA = db.useDb('StoreA');

// Create Model
const SecondaryStoreAProductModel = storeA.model("Product", secondaryProductSchema);

// Wait for Store A connection to be ready
storeA.once('open', async () => {
    console.log('Store A database connected, executing operations...');
    
    try {
        // Check if products already exist in Store A
        const existingCount = await SecondaryStoreAProductModel.countDocuments();
        console.log(`Existing products in Store A: ${existingCount}`);
        
        if (existingCount === 0) {
            console.log('Inserting sample products into Store A database...');
            await SecondaryStoreAProductModel.insertMany(storeAProducts);
            console.log('Sample products inserted into Store A database!');
        }

        // Find and display a product
        let product = await SecondaryStoreAProductModel.findOne();
        console.log('Product found in Store A:', product);
        
        // Display all products
        const allProducts = await SecondaryStoreAProductModel.find();
        console.log(`Total products in Store A: ${allProducts.length}`);
    } catch (error) {
        console.error('Error with Store A operations:', error);
    }
});

// Create a connection for 'Store B'
const storeB = db.useDb('StoreB');

// Create Model
const SecondaryStoreBProductModel = storeB.model("Product", secondaryProductSchema);

// Wait for Store B connection to be ready
storeB.once('open', async () => {
    console.log('Store B database connected, executing operations...');
    
    try {
        // Check if products already exist in Store B
        const existingCount = await SecondaryStoreBProductModel.countDocuments();
        console.log(`Existing products in Store B: ${existingCount}`);
        
        if (existingCount === 0) {
            console.log('Inserting sample products into Store B database...');
            await SecondaryStoreBProductModel.insertMany(storeBProducts);
            console.log('Sample products inserted into Store B database!');
        }

        // Find and display a product
        let product = await SecondaryStoreBProductModel.findOne();
        console.log('Product found in Store B:', product);
        
        // Display all products
        const allProducts = await SecondaryStoreBProductModel.find();
        console.log(`Total products in Store B: ${allProducts.length}`);
    } catch (error) {
        console.error('Error with Store B operations:', error);
    }
});
