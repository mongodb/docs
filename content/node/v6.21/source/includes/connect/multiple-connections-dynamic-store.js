// Function to get connection object for particular store's database
function getStoreConnection(storeId) {
    return db.useDb("Store"+storeId, { useCache: true });
}

// Create a connection for 'Store A'
const store = getStoreConnection("A");

// Create Model
const SecondaryStoreProductModel = store.model("Product", secondaryProductSchema);

// Wait for store connection to be ready
store.once('open', async () => {
    console.log('Store A (dynamic) database connected, executing operations...');
    
    try {
        // Check if products already exist in the store
        const existingCount = await SecondaryStoreProductModel.countDocuments();
        console.log(`Existing products in Store A (dynamic): ${existingCount}`);
        
        if (existingCount === 0) {
            // Use the same store A products from the previous example
            console.log('Inserting sample products into Store A (dynamic) database...');
            await SecondaryStoreProductModel.insertMany(storeAProducts);
            console.log('Sample products inserted into Store A (dynamic) database!');
        }

        // Find and display a product
        let product = await SecondaryStoreProductModel.findOne();
        console.log('Product found in Store A (dynamic):', product);
        
        // Display all products
        const allProducts = await SecondaryStoreProductModel.find();
        console.log(`Total products in Store A (dynamic): ${allProducts.length}`);
    } catch (error) {
        console.error('Error with Store A (dynamic) operations:', error);
    }
});
