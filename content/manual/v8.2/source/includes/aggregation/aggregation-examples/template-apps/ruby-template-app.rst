Before you begin following this aggregation tutorial, you must set up a
new Ruby app. You can use this app to connect to a MongoDB
deployment, insert sample data into MongoDB, and run the aggregation
pipeline.

.. tip:: 

   To learn how to install the Ruby Driver and connect to MongoDB,
   see the `Get Started with the Ruby Driver guide
   <https://www.mongodb.com/docs/ruby-driver/upcoming/get-started/>`__.

   To learn more about performing aggregations in the Ruby Driver, see the
   `Aggregation guide
   <https://www.mongodb.com/docs/ruby-driver/upcoming/aggregation/>`__.

After you install the driver, create a file called
``agg_tutorial.rb``. Paste the following code in this file to create an
app template for the aggregation tutorials.

.. important::

   In the following code, read the code comments to find the sections of
   the code that you must modify for the tutorial you are following.

   If you attempt to run the code without making any changes, you will
   encounter a connection error.

.. code-block:: ruby

   # typed: strict
   require 'mongo'
   require 'bson'
   
   # Replace the placeholder with your connection string.
   uri = "<connection string>"
   
   Mongo::Client.new(uri) do |client|
   
     agg_db = client.use('agg_tutorials_db')
     
     # Get a reference to relevant collections.
     # ... some_coll = agg_db[:some_coll]
   
     # Delete any existing documents in collections if needed.
     # ... some_coll.delete_many({})
   
     # Insert sample data into the collection or collections.
     # ... some_coll.insert_many( ... )
   
     # Add code to create pipeline stages within the array.
     # ... pipeline = [ ... ]
   
     # Run the aggregation.
     # ... aggregation_result = some_coll.aggregate(pipeline)
   
     # Print the aggregation results.
     aggregation_result.each do |doc|
       puts doc
     end

   end

For every tutorial, you must replace the connection string placeholder with
your deployment's connection string.

.. tip::

   To learn how to locate your deployment's connection string, see the
   `Create a Connection String <https://www.mongodb.com/docs/ruby-driver/upcoming/get-started/create-a-connection-string/>`__
   step of the Ruby Get Started guide.

For example, if your connection string is
``"mongodb+srv://mongodb-example:27017"``, your connection string assignment resembles
the following:

.. code-block:: ruby
   :copyable: false

   uri = "mongodb+srv://mongodb-example:27017"
