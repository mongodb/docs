Before you begin following an aggregation tutorial, you must set up a
new C++ app. You can use this app to connect to a MongoDB
deployment, insert sample data into MongoDB, and run the aggregation
pipeline.

.. tip:: 

   To learn how to install the driver and connect to MongoDB,
   see the `Get Started with C++
   <https://www.mongodb.com/docs/languages/cpp/cpp-driver/current/get-started/>`__
   tutorial.

   To learn more about using the C++ driver, see the `API documentation 
   <https://mongocxx.org/api/current/>`__.

   To learn more about performing aggregations in the C++ Driver, see the
   `Aggregation guide
   <https://www.mongodb.com/docs/languages/cpp/cpp-driver/current/aggregation/>`__.

After you install the driver, create a file called
``agg-tutorial.cpp``. Paste the following code in this file to create an
app template for the aggregation tutorials.

.. important::

   In the following code, read the code comments to find the sections of
   the code that you must modify for the tutorial you are following.

   If you attempt to run the code without making any changes, you will
   encounter a connection error.

.. code-block:: cpp

   #include <iostream>
   #include <bsoncxx/builder/basic/document.hpp>
   #include <bsoncxx/builder/basic/kvp.hpp>
   #include <bsoncxx/json.hpp>
   #include <mongocxx/client.hpp>
   #include <mongocxx/instance.hpp>
   #include <mongocxx/pipeline.hpp>
   #include <mongocxx/uri.hpp>
   #include <chrono>

   using bsoncxx::builder::basic::kvp;
   using bsoncxx::builder::basic::make_document;
   using bsoncxx::builder::basic::make_array;

   int main() {
      mongocxx::instance instance;

      // Replace the placeholder with your connection string.
      mongocxx::uri uri("<connection string>");
      mongocxx::client client(uri);

      auto db = client["agg_tutorials_db"];
      // Delete existing data in the database, if necessary.
      db.drop();

      // Get a reference to relevant collections.
      // ... auto some_coll = db["..."];
      // ... auto another_coll = db["..."];

      // Insert sample data into the collection or collections.
      // ... some_coll.insert_many(docs);

      // Create an empty pipelne.
      mongocxx::pipeline pipeline;

      // Add code to create pipeline stages.
      // pipeline.match(make_document(...));

      // Run the aggregation and print the results.
      auto cursor = orders.aggregate(pipeline);
      for (auto&& doc : cursor) {
         std::cout << bsoncxx::to_json(doc, bsoncxx::ExtendedJsonMode::k_relaxed) << std::endl;
      }
   }

For every tutorial, you must replace the connection string placeholder with
your deployment's connection string.

.. tip::

   To learn how to locate your deployment's connection string, see the
   `Create a Connection String
   <https://www.mongodb.com/docs/languages/cpp/cpp-driver/current/get-started/#create-a-connection-string>`__
   step of the C++ Get Started tutorial.

For example, if your connection string is
``"mongodb+srv://mongodb-example:27017"``, your connection string assignment resembles
the following:

.. code-block:: cpp
   :copyable: false

   mongocxx::uri uri{"mongodb+srv://mongodb-example:27017"};
