.. step:: Store your data in |service|.

   Paste and run the following code in your notebook to connect to your
   |service| {+cluster+} and store your data in the ``sample_db.articles`` 
   collection. Replace the placeholder value with your |service| {+cluster+}'s |srv| 
   :manual:`connection string </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.

   .. note:: 

      Your connection string should use the following format:

      .. code-block::

         mongodb+srv://<username>:<password>@<clusterName>.<hostname>.mongodb.net

   .. code-block:: python

      import pymongo

      # Connect to your Atlas cluster
      mongo_client = pymongo.MongoClient("<connection-string>")

      # Ingest data into Atlas
      db = mongo_client["sample_db"]
      collection = db["articles"]
      documents = df.to_dict("records")
      collection.insert_many(documents)

   After running the sample code, you can
   view your vector embeddings :ref:`in the {+atlas-ui+} <atlas-ui-view-collections>`
   by navigating to the ``sample_db.articles`` collection in your {+cluster+}.
   