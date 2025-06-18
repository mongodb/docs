.. io-code-block::
   :copyable: true

   .. input::
      :language: text
      
      Review the schema of the "products" collection, then generate a Javascript 
      function that updates the "inStock" field to `false` when a product
      reaches a quantity of 0.
  
   .. output::
      :language: text
      :visible: false
      :emphasize-lines: 2,4

      I'll first review the schema of the "products" collection to understand its structure, then generate a Javascript function to update the "inStock" field to false when a product reaches a quantity of 0.
        Ran `collection-schema` - MongoDB (MCP Server)
      Now let me get some sample data from the collection to better understand the current state of the documents:
        Ran `find` - MongoDB (MCP Server)
      Based on the schema and sample data, I'll now generate a Javascript function that:
      
      - Monitors the products collection
      - Updates the "inStock" field to false when a product's quantity reaches 0
      - Provides appropriate error handling and logging

      Here's the Javascript function:

      ```
      /**
       * Updates the inStock field to false when a product's quantity reaches 0
       *
       * This function can be used in two ways:
       * 1. As a one-time update to sync all products (updateAllProducts)
       * 2. As an automated trigger after any update operation (setupUpdateTrigger)
       *
       * @param {Object} client - MongoDB client instance
       * @param {string} dbName - Database name (default: 'sample_store')
       * @param {string} collectionName - Collection name (default: 'products')
       * @returns {Promise} Promise that resolves when the operation completes
       */
      async function updateProductStockStatus(client, dbName = 'sample_store', collectionName = 'products') {
      try {
        // Get reference to the database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        // Find all products with quantity 0 but still marked as in stock
        const result = await collection.updateMany(
          { quantity: 0, inStock: true },
          { $set: { inStock: false } }
        );
        
        console.log(`Updated ${result.modifiedCount} products to out of stock`);
        return result;
      } catch (err) {
        console.error('Error updating product stock status:', err);
        throw err;
        }
      }
      /**
       * Sets up a change stream to automatically update inStock status
       * when quantity changes to 0
       *
       * @param {Object} client - MongoDB client instance
       * @param {string} dbName - Database name (default: 'sample_store')
       * @param {string} collectionName - Collection name (default: 'products')
       * @returns {ChangeStream} The change stream object
       */
      async function setupUpdateTrigger(client, dbName = 'sample_store', collectionName = 'products') {
      
      ... (truncated)