Before you begin following this aggregation tutorial, you must set up a
new C#/.NET app. You can use this app to connect to a MongoDB
deployment, insert sample data into MongoDB, and run the aggregation
pipeline.

.. tip:: 

   To learn how to install the driver and connect to MongoDB,
   see the :driver:`C#/.NET Driver Quick Start guide </csharp/current/quick-start/>`.

   To learn more about performing aggregations in the C#/.NET Driver, see the
   :driver:`Aggregation guide </csharp/current/fundamentals/aggregation/>`.

After you install the driver, paste the following code into your
``Program.cs`` file to create an app template for the aggregation
tutorials.

.. important::

   In the following code, read the code comments to find the sections of
   the code that you must modify for the tutorial you are following.

   If you attempt to run the code without making any changes, you will
   encounter a connection error.

.. code-block:: csharp

   using MongoDB.Driver;
   using MongoDB.Bson;
   using MongoDB.Bson.Serialization.Attributes;
   
   // Define data model classes.
   // ... public class MyClass { ... }
   
   // Replace the placeholder with your connection string.
   var uri = "<connection string>";
   var client = new MongoClient(uri);
   var aggDB = client.GetDatabase("agg_tutorials_db");
   
   // Get a reference to relevant collections.
   // ... var someColl = aggDB.GetCollection<MyClass>("someColl");
   // ... var anotherColl = aggDB.GetCollection<MyClass>("anotherColl");
   
   // Delete any existing documents in collections if needed.
   // ... someColl.DeleteMany(Builders<MyClass>.Filter.Empty);
   
   // Insert sample data into the collection or collections.
   // ... someColl.InsertMany(new List<MyClass> { ... });
   
   // Add code to chain pipeline stages to the Aggregate() method.
   // ... var results = someColl.Aggregate().Match(...);
   
   // Print the aggregation results.
   foreach (var result in results.ToList())
   {
     Console.WriteLine(result);
   }

For every tutorial, you must replace the connection string placeholder
with your deployment's connection string.

.. tip::

   To learn how to locate your deployment's connection string, see the
   :driver:`Set Up a Free Tier Cluster in Atlas </csharp/current/quick-start/#set-up-a-free-tier-cluster-in-atlas>`
   step of the C# Quick Start guide.

For example, if your connection string is
``"mongodb+srv://mongodb-example:27017"``, your connection string assignment resembles
the following:

.. code-block:: csharp
   :copyable: false

   var uri = "mongodb+srv://mongodb-example:27017";
