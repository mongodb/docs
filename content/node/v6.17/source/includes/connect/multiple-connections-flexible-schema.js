// Import Product Schema
const secondaryProductSchema = require("./product.schema.js")({
    collection: "products",
    strict: false
    // Pass configuration options if needed
});

// Create Model
const SecondaryProductModel = db.model("Product", secondaryProductSchema);

// Wait for secondary connection to be ready before executing operations
db.once('open', async () => {
    console.log('Secondary database (flexible schema) connected, executing operations...');
    
    try {
        // Check if products already exist in secondary database
        const existingCount = await SecondaryProductModel.countDocuments();
        console.log(`Existing products in secondary DB: ${existingCount}`);
        
        if (existingCount === 0) {
            // Add extra fields to demonstrate schema flexibility
            const flexibleSampleProducts = sampleProducts.map(product => ({
                ...product,
                extraField: "This field is not in the schema but will be saved due to strict: false",
                timestamp: new Date()
            }));
            
            console.log('Inserting sample products with extra fields into secondary database...');
            await SecondaryProductModel.insertMany(flexibleSampleProducts);
            console.log('Sample products with extra fields inserted into secondary database!');
        }

        // Find and display a product
        let product = await SecondaryProductModel.findOne();
        console.log('Product found in secondary DB (flexible schema):', product);
        
        // Display all products
        const allProducts = await SecondaryProductModel.find();
        console.log(`Total products in secondary DB: ${allProducts.length}`);
    } catch (error) {
        console.error('Error with secondary database operations:', error);
    }
});
