.. procedure::
   :style: normal
      
   .. step:: Paste the following code in your notebook.
            
      Use the following code to generate embeddings from new data.

      Specifically, this code uses the ``get_embedding`` function 
      that you defined and the MongoDB :driver:`PyMongo Driver </pymongo/>` to
      generate embeddings from an array of sample texts and
      ingest them into the ``sample_db.embeddings`` collection. 
         
      .. io-code-block:: 
         :copyable: true 

         .. input::
            :language: python

            import pymongo

            # Connect to your Atlas cluster
            mongo_client = pymongo.MongoClient("<connection-string>")
            db = mongo_client["sample_db"]
            collection = db["embeddings"]

            # Sample data
            data = [
               "Titanic: The story of the 1912 sinking of the largest luxury liner ever built",
               "The Lion King: Lion cub and future king Simba searches for his identity",
               "Avatar: A marine is dispatched to the moon Pandora on a unique mission"
            ]

            # Ingest data into Atlas
            inserted_doc_count = 0
            for text in data:
               embedding = get_embedding(text)
               collection.insert_one({ "text": text, "embedding": embedding })
               inserted_doc_count += 1

            print(f"Inserted {inserted_doc_count} documents.")

         .. output:: 

            Inserted 3 documents. 

   .. step:: Specify the connection string.

      Replace ``<connection-string>`` with your |service| {+cluster+}'s |srv| 
      :manual:`connection string </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.

      .. note::
         
         .. include:: /includes/fact-connection-string-format-drivers.rst

   .. step:: Run the code.

      You can verify your vector embeddings by viewing them 
      :ref:`in the {+atlas-ui+} <atlas-ui-view-collections>`
      by navigating to the ``sample_db.embeddings`` collection in your {+cluster+}.
      
