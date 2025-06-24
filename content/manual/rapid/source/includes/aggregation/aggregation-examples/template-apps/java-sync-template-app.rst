Before you begin following an aggregation tutorial, you must set up a
new Java app. You can use this app to connect to a MongoDB
deployment, insert sample data into MongoDB, and run the aggregation
pipeline.

.. tip:: 

   To learn how to install the driver and connect to MongoDB,
   see the :driver:`Get Started with the Java Driver guide
   </java/sync/current/get-started/>`.

   To learn more about performing aggregations in the Java Sync Driver, see the
   :driver:`Aggregation guide </java/sync/current/aggregation/>`.

After you install the driver, create a file called
``AggTutorial.java``. Paste the following code in this file to create an
app template for the aggregation tutorials.

.. important::

   In the following code, read the code comments to find the sections of
   the code that you must modify for the tutorial you are following.

   If you attempt to run the code without making any changes, you will
   encounter a connection error.

.. code-block:: java

   package org.example;
   
   // Modify imports for each tutorial as needed.
   import com.mongodb.client.*;
   import com.mongodb.client.model.Aggregates;
   import com.mongodb.client.model.Filters;
   import com.mongodb.client.model.Sorts;
   import org.bson.Document;
   import org.bson.conversions.Bson;
   
   import java.util.ArrayList;
   import java.util.Arrays;
   import java.util.List;
   
   public class AggTutorial {
       public static void main( String[] args ) {
   
           // Replace the placeholder with your connection string.
           String uri = "<connection string>";
   
           try (MongoClient mongoClient = MongoClients.create(uri)) {
               MongoDatabase aggDB = mongoClient.getDatabase("agg_tutorials_db");
   
               // Get a reference to relevant collections.
               // ... MongoCollection<Document> someColl = ...
               // ... MongoCollection<Document> anotherColl = ...
   
               // Delete any existing documents in collections if needed.
               // ... someColl.deleteMany(Filters.empty());

               // Insert sample data into the collection or collections.   
               // ... someColl.insertMany(...);
   
               // Create an empty pipeline array.
               List<Bson> pipeline = new ArrayList<>();
   
               // Add code to create pipeline stages.
               // ... pipeline.add(...);
   
               // Run the aggregation.
               // ... AggregateIterable<Document> aggregationResult = someColl.aggregate(pipeline);
   
               // Print the aggregation results.
               for (Document document : aggregationResult) {
                   System.out.println(document.toJson());
               }
           }
       }
   }

For every tutorial, you must replace the connection string placeholder with
your deployment's connection string.

.. tip::

   To learn how to locate your deployment's connection string, see the
   :driver:`Create a Connection String </java/sync/current/get-started/#create-a-connection-string>`
   step of the Java Sync Quick Start guide.

For example, if your connection string is
``"mongodb+srv://mongodb-example:27017"``, your connection string assignment resembles
the following:

.. code-block:: java
   :copyable: false

   String uri = "mongodb+srv://mongodb-example:27017";
