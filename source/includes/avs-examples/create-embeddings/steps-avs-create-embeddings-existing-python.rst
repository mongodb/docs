.. procedure::
   :style: normal
      
   .. step:: Paste the following code in your notebook.
            
      Use the following code to generate embeddings from a 
      field in an existing collection.
      Specifically, this code does the following:

      - Connects to your |service| {+cluster+}.

      - Gets a subset of documents from the 
        ``sample_airbnb.listingsAndReviews`` collection that 
        have a non-empty ``summary`` field.

      - Generates embeddings from each document's ``summary`` field
        by using the ``get_embedding`` function that you defined. 

      - Updates each document with a new ``embedding`` field 
        that contains the embedding value by using 
        the MongoDB :driver:`PyMongo Driver </pymongo/>`.

      .. io-code-block:: 
         :copyable: true 

         .. input::
            :language: python

            import pymongo

            # Connect to your Atlas cluster
            mongo_client = pymongo.MongoClient("<connection-string>")
            db = mongo_client["sample_airbnb"]
            collection = db["listingsAndReviews"]

            # Filter to exclude null or empty summary fields
            filter = { "summary": {"$nin": [ None, "" ]} }

            # Get a subset of documents in the collection
            documents = collection.find(filter).limit(50)

            # Update each document with a new embedding field
            updated_doc_count = 0
            for doc in documents:
                embedding = get_embedding(doc["summary"])
                collection.update_one( { "_id": doc["_id"] }, { "$set": { "embedding": embedding } } )
                updated_doc_count += 1

            print(f"Updated {updated_doc_count} documents.")
               
         .. output:: 

            Updated 50 documents. 
            
   .. step:: Specify the connection string.

      Replace ``<connection-string>`` with your |service| {+cluster+}'s |srv| 
      :manual:`connection string </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.

      .. note::
         
         .. include:: /includes/fact-connection-string-format-drivers.rst

   .. step:: Run the code.

      You can view your vector embeddings as they generate by 
      navigating to the ``sample_airbnb.listingsAndReviews`` collection 
      :ref:`in the {+atlas-ui+} <atlas-ui-view-collections>`
      and expanding the fields in a document.
