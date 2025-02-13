
.. procedure::
   :style: normal
      
   .. step:: (Conditional) Define the functions to generate |bson| embeddings.

      If you haven't already defined the ``get_embedding`` and
      ``generate_bson_vector`` functions in your notebook, see
      :ref:`define-embedding-functions` to load these functions in your
      notebook. 

   .. step:: Load your existing data.

      Load data from your |service| {+cluster+} into
      the notebook. The following code gets 
      a subset of ``50`` documents from the ``sample_airbnb.listingAndReviews``
      collection.

      .. code-block:: python 

         import pymongo

         # Connect to your Atlas cluster
         mongo_client = pymongo.MongoClient("<connection-string>")
         db = mongo_client["sample_airbnb"]
         collection = db["listingsAndReviews"]

         # Define a filter to exclude documents with null or empty 'summary' fields
         summary_filter = { '$and': [ { 'summary': { '$exists': True, '$ne': None } } ] }

         # Get a subset of documents in the collection
         documents = collection.find(summary_filter, {'_id': 1, 'summary': 1}).limit(50)

   .. step:: Generate, convert, and ingest the embeddings in to your |service| {+cluster+}.

      This code does the following:

      - Generates ``float32``, ``int8``, and ``int1`` embeddings from the data.
      - Converts the embeddings to |bson| ``float32``, ``int8``, and ``int1`` subtypes.
      - Updates each document in the collection with the new embedding fields.

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
                float32_embeddings = get_embedding(summary, precision="float32")
                int8_embeddings = get_embedding(summary, precision="int8")
                int1_embeddings = get_embedding(summary, precision="ubinary")
                
                # Convert embeddings to BSON vectors
                bson_float32_embeddings = generate_bson_vector(float32_embeddings, BinaryVectorDtype.FLOAT32)
                bson_int8_embeddings = generate_bson_vector(int8_embeddings, BinaryVectorDtype.INT8)
                bson_int1_embeddings = generate_bson_vector(int1_embeddings, BinaryVectorDtype.PACKED_BIT)
                
                # Add the update operation to the list
                operations.append(UpdateOne(
                    {"_id": doc["_id"]},
                    {"$set": {
                        "BSON-Float32-Embedding": bson_float32_embeddings,
                        "BSON-Int8-Embedding": bson_int8_embeddings,
                        "BSON-Int1-Embedding": bson_int1_embeddings
                    }}
                ))

            # Execute the bulk write operation
            if operations:
                result = collection.bulk_write(operations)
                updated_doc_count = result.modified_count

            print(f"Updated {updated_doc_count} documents.")
         
         .. output:: 
            :language: shell 

            ...
            Updated 50 documents.
