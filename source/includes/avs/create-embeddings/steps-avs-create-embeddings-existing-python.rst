
.. procedure::
   :style: normal

   .. step:: Load your existing data.

      Load data from your |service| {+cluster+}. The following code gets 
      a subset of ``50`` documents from the ``sample_airbnb.listingAndReviews``
      collection. 

      Replace ``<connection-string>`` with your |service| {+cluster+}'s |srv|
      :manual:`connection string </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.

      .. note::
         
         .. include:: /includes/fact-connection-string-format-drivers.rst

      .. code-block:: python 

         import pymongo

         # Connect to your Atlas cluster
         mongo_client = pymongo.MongoClient("<connection-string>")
         db = mongo_client["sample_airbnb"]
         collection = db["listingsAndReviews"]

         # Define a filter to exclude documents with null or empty 'summary' fields
         filter = { 'summary': { '$exists': True, "$nin": [ None, "" ] } }

         # Get a subset of documents in the collection
         documents = collection.find(filter, {'_id': 1, 'summary': 1}).limit(50)

   .. step:: Generate the embeddings and update your documents in |service|.

      Generate embeddings from the documents you loaded in the previous step.
      This code does the following:

      - Generates embeddings from each document's ``summary`` field
        by using the ``get_embedding`` function that you defined.

      - Updates each document with a new ``embedding`` field 
        that contains the embedding value.
        
      If you defined the ``generate_bson_vector`` function to 
      convert your vector embeddings to |bson| ``binData`` vectors, 
      uncomment the line that calls this function before running the code.

      .. note::
      
         This operation might take a few minutes to complete.

      .. io-code-block:: 
         :copyable: true 
         
         .. input:: 
            :language: python

            from pymongo import UpdateOne

            # Generate the list of bulk write operations
            operations = []
            for doc in documents:
               summary = doc["summary"]
               # Generate embeddings for this document
               embedding = get_embedding(summary)

               # Uncomment the following line to convert to BSON vectors
               # embedding = generate_bson_vector(embedding, BinaryVectorDtype.FLOAT32)

               # Add the update operation to the list
               operations.append(UpdateOne(
                  {"_id": doc["_id"]},
                  {"$set": {
                     "embedding": embedding
                  }}
               ))

            # Execute the bulk write operation
            if operations:
               result = collection.bulk_write(operations)
               updated_doc_count = result.modified_count

            print(f"Updated {updated_doc_count} documents.")

         .. output:: 
            :language: shell 

            Updated 50 documents.
