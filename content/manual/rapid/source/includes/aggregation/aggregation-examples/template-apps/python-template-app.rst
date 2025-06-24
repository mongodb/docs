Before you begin following this aggregation tutorial, you must set up a
new Python app. You can use this app to connect to a MongoDB
deployment, insert sample data into MongoDB, and run the aggregation
pipeline.

.. tip::

   To learn how to install PyMongo and connect to MongoDB,
   see the `Get Started with PyMongo
   <https://www.mongodb.com/docs/languages/python/pymongo-driver/current/get-started/>`__
   tutorial.

   To learn more about performing aggregations in PyMongo, see the
   `Aggregation guide
   <https://www.mongodb.com/docs/languages/python/pymongo-driver/current/aggregation/>`__.

After you install the library, create a file called
``agg_tutorial.py``. Paste the following code in this file to create an
app template for the aggregation tutorials.

.. important::

   In the following code, read the code comments to find the sections of
   the code that you must modify for the tutorial you are following.

   If you attempt to run the code without making any changes, you will
   encounter a connection error.

.. code-block:: python

   # Modify imports for each tutorial as needed.
   from pymongo import MongoClient
   
   # Replace the placeholder with your connection string.
   uri = "<connection string>"
   client = MongoClient(uri)
   
   try:
       agg_db = client["agg_tutorials_db"]
   
       # Get a reference to relevant collections.
       # ... some_coll = agg_db["some_coll"]
       # ... another_coll = agg_db["another_coll"]
   
       # Delete any existing documents in collections if needed.
       # ... some_coll.delete_many({})
   
       # Insert sample data into the collection or collections.
       # ... some_coll.insert_many(...)
   
       # Create an empty pipeline array.
       pipeline = []
   
       # Add code to create pipeline stages.
       # ... pipeline.append({...})
   
       # Run the aggregation.
       # ... aggregation_result = ...
   
       # Print the aggregation results.
       for document in aggregation_result:
           print(document)
   
   finally:
       client.close()

For every tutorial, you must replace the connection string placeholder with
your deployment's connection string.

.. tip::

   To learn how to locate your deployment's connection string, see the
   `Create a Connection String <https://www.mongodb.com/docs/php-library/current/get-started/#create-a-connection-string>`__
   step of the Get Started with the PHP Library tutorial.

For example, if your connection string is
``"mongodb+srv://mongodb-example:27017"``, your connection string assignment resembles
the following:

.. code-block:: php
   :copyable: false

   uri = "mongodb+srv://mongodb-example:27017"
