.. step:: Create embeddings and store them in |service|.

   Paste and run the following code in your notebook to connect to your
   |service| {+cluster+}, generate embeddings from custom data, and
   ingest them into the ``sample_db.embeddings`` collection by using the MongoDB 
   :driver:`PyMongo Driver </pymongo/>`. Replace ``<connection-string>`` with 
   your |service| {+cluster+}'s |srv| :manual:`connection string 
   </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.
 
   .. note::
      
      .. include:: /includes/fact-connection-string-format-drivers.rst
      
   .. code-block:: python

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
      for text in data:
         embedding = get_embedding(text)
         collection.insert_one({ "text": text, "embedding": embedding })

   After running the sample code, you can
   view your vector embeddings :ref:`in the {+atlas-ui+} <atlas-ui-view-collections>`
   by navigating to the ``sample_db.embeddings`` collection in your {+cluster+}.
   