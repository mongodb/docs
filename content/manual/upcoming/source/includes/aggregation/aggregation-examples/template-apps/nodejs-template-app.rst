Before you begin following this aggregation tutorial, you must set up a
new Node.js app. You can use this app to connect to a MongoDB
deployment, insert sample data into MongoDB, and run the aggregation
pipeline.

.. tip:: 

   To learn how to install the driver and connect to MongoDB,
   see the :driver:`Node.js Driver Quick Start guide </node/current/quick-start/>`.

   To learn more about performing aggregations in the Node.js Driver, see the
   :driver:`Aggregation guide </node/current/aggregation/>`.

After you install the driver, create a file called
``agg_tutorial.js``. Paste the following code in this file to create an
app template for the aggregation tutorials.

.. important::

   In the following code, read the code comments to find the sections of
   the code that you must modify for the tutorial you are following.

   If you attempt to run the code without making any changes, you will
   encounter a connection error.

.. code-block:: javascript

   const { MongoClient } = require("mongodb");

   // Replace the placeholder with your connection string.
   const uri = "<connection string>";
   const client = new MongoClient(uri);

   async function run() {
     try {
       const aggDB = client.db("agg_tutorials_db");

       // Get a reference to relevant collections.
       // ... const someColl =
       // ... const anotherColl =

       // Delete any existing documents in collections.
       // ... await someColl.deleteMany({});

       // Insert sample data into the collection or collections.
       // ... const someData = [ ... ];
       // ... await someColl.insertMany(someData);

       // Create an empty pipeline array.
       const pipeline = [];

       // Add code to create pipeline stages.
       // ... pipeline.push({ ... })

       // Run the aggregation.
       // ... const aggregationResult = ...

       // Print the aggregation results.
       for await (const document of aggregationResult) {
         console.log(document);
       }
     } finally {
       await client.close();
     }
   }

   run().catch(console.dir);

For every tutorial, you must replace the connection string placeholder with
your deployment's connection string.

.. tip::

   To learn how to locate your deployment's connection string, see the
   :driver:`Create a Connection String </node/current/quick-start/create-a-connection-string/>`
   step of the Node.js Quick Start guide.

For example, if your connection string is
``"mongodb+srv://mongodb-example:27017"``, your connection string assignment resembles
the following:

.. code-block:: javascript
   :copyable: false

   const uri = "mongodb+srv://mongodb-example:27017";
