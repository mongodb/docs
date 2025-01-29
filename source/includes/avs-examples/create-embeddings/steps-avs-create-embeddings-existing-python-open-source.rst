
.. procedure::
   :style: normal
      
   .. step:: (Conditional) Define the functions to generate |bson| embeddings.

      If you haven't already loaded the ``get_embedding`` and
      ``generate_bson_vector`` functions in your notebook, see
      :ref:`define-embedding-functions` to load these functions in your
      notebook. 

   .. step:: Load your existing data.

      Fetch the data from your |service| {+cluster+} and load it in to
      the notebook. The following code fetches the ``summary`` field
      from ``50`` documents in the ``sample_airbnb.listingAndReviews``
      collection. 

      .. code-block:: python 

         import pymongo

         # Connect to your Atlas cluster
         mongo_client = pymongo.MongoClient("<connection-string>")
         db = mongo_client["sample_airbnb"]
         collection = db["listingsAndReviews"]

         # Define a filter to exclude documents with null or empty 'summary' fields
         summary_filter = {"summary": {"$nin": [None, ""]}}

         # Get a subset of documents in the collection
         documents = collection.find(summary_filter, {'_id': 1, 'summary': 1}).limit(50)

   .. step:: Generate, convert, and ingest the embeddings in to your |service| {+cluster+}.

      The following code first generates ``float32``, ``int8``, and
      ``int1`` embeddings for the data, then converts the embeddings
      to |bson| ``float32``, ``int8``, and ``int1`` subtypes, and
      finally uploads the embeddings in to the |service| {+cluster+}. 

      .. note::
      
         It might take a few minutes for the operation to complete.

      .. io-code-block:: 
         :copyable: true 
         
         .. input:: 
            :language: python
         
            import pymongo
            from bson.binary import Binary

            updated_doc_count = 0
            for doc in documents:
               summary = doc["summary"]

               # Generate float32 and other embeddings
               float32_embeddings = get_embedding(summary, precision="float32")
               int8_embeddings = get_embedding(summary, precision="int8")
               int1_embeddings = get_embedding(summary, precision="ubinary")

               # Initialize variables to store BSON vectors
               bson_float32_embeddings = generate_bson_vector(float32_embeddings, BinaryVectorDtype.FLOAT32)
               bson_int8_embeddings = generate_bson_vector(int8_embeddings, BinaryVectorDtype.INT8)
               bson_int1_embeddings = generate_bson_vector(int1_embeddings, BinaryVectorDtype.PACKED_BIT)

               # Update each document with new embedding fields
               collection.update_one(
                  {"_id": doc["_id"]},
                  {"$set": {
                     "BSON-Float32-Embedding": bson_float32_embeddings,
                     "BSON-Int8-Embedding": bson_int8_embeddings,
                     "BSON-Int1-Embedding": bson_int1_embeddings
                  }},
               )
               updated_doc_count += 1

            print(f"Updated {updated_doc_count} documents.")
         
         .. output:: 
            :language: shell 

            Updated 50 documents.
