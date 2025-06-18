.. io-code-block::
   :copyable: true

   .. input::
      :language: text

      Create a new MongoDB collection named "products" and insert 
      some sample data into the collection with the following fields:

      - name (string)
      - price (number)
      - category (string)
      - quantity (number)
      - inStock (boolean)
  
   .. output::
      :language: text
      :visible: false
      :emphasize-lines: 2,4,6,8

      I'll help you insert sample data into a MongoDB collection named "products" with the specified fields. Let me set this up for you.
        Ran `list-databases` - MongoDB (MCP Server)         
      I'll create a sample database called "sample_store" and insert some product data into a "products" collection. Let's create the collection first:
        Ran `create-collection` - MongoDB (MCP Server)
      Now I'll insert sample product data into the "products" collection with all the required fields:
        Ran `insert-many` - MongoDB (MCP Server)
      Let's verify the data was inserted properly by querying the collection:
        Ran `find` - MongoDB (MCP Server)
      The sample data has been successfully inserted into the "products" collection. Here are some details of the inserted documents:

      Laptop:
       Price: $1,299.99
       Category: Electronics
       Quantity: 15
       InStock: true

      Smartphone:
       Price: $799.99
       Category: Electronics
       Quantity: 25
       InStock: true

      Headphones:
       Price: $149.99
       Category: Audio
       Quantity: 40
       InStock: true

      ...