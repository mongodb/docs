Before you begin following an aggregation tutorial, you must set up a
new Scala app. You can use this app to connect to a MongoDB
deployment, insert sample data into MongoDB, and run the aggregation
pipeline.

.. tip:: 

   To learn how to install the driver and connect to MongoDB,
   see the `Get Started with the Scala Driver
   <https://www.mongodb.com/docs/languages/scala/scala-driver/current/get-started/>`__
   guide.

   To learn more about performing aggregations in the Scala Driver, see the
   `Aggregation guide
   <https://www.mongodb.com/docs/languages/scala/scala-driver/current/aggregation/>`__.

After you install the driver, create a file called
``AggTutorial.scala``. Paste the following code in this file to create an
app template for the aggregation tutorials.

.. important::

   In the following code, read the code comments to find the sections of
   the code that you must modify for the tutorial you are following.

   If you attempt to run the code without making any changes, you will
   encounter a connection error.

.. code-block:: scala

   package org.example;
   
   // Modify imports for each tutorial as needed.
   import org.mongodb.scala.MongoClient
   import org.mongodb.scala.bson.Document
   import org.mongodb.scala.model.{Accumulators, Aggregates, Field, Filters, Variable}
   
   import java.text.SimpleDateFormat
   
   object FilteredSubset {
   
     def main(args: Array[String]): Unit = {
   
       // Replace the placeholder with your connection string.
       val uri = "<connection string>"
       val mongoClient = MongoClient(uri)
       Thread.sleep(1000)
   
       val aggDB = mongoClient.getDatabase("agg_tutorials_db")
   
       // Get a reference to relevant collections.
       // ... val someColl = aggDB.getCollection("someColl")
       // ... val anotherColl = aggDB.getCollection("anotherColl")
   
       // Delete any existing documents in collections if needed.
       // ... someColl.deleteMany(Filters.empty()).subscribe(...)
   
       // If needed, create the date format template.
       val dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss")
   
       // Insert sample data into the collection or collections.
       // ... someColl.insertMany(...).subscribe(...)
   
       Thread.sleep(1000)
   
       // Add code to create pipeline stages within the Seq.
       // ... val pipeline = Seq(...)
   
       // Run the aggregation and print the results.
       // ... someColl.aggregate(pipeline).subscribe(...)
   
       Thread.sleep(1000)
       mongoClient.close()
     }
   }

For every tutorial, you must replace the connection string placeholder with
your deployment's connection string.

.. tip::

   To learn how to locate your deployment's connection string, see the
   `Create a Connection String
   <https://www.mongodb.com/docs/languages/scala/scala-driver/current/get-started/#create-a-connection-string>`__
   step of the Scala Driver Get Started guide.

For example, if your connection string is
``"mongodb+srv://mongodb-example:27017"``, your connection string
assignment resembles the following:

.. code-block:: scala
   :copyable: false

   val uri = "mongodb+srv://mongodb-example:27017"
