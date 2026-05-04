Before you begin following an aggregation tutorial, you must set up a
new Kotlin app. You can use this app to connect to a MongoDB
deployment, insert sample data into MongoDB, and run the aggregation
pipeline.

.. tip::

   To learn how to install the driver and connect to MongoDB,
   see the :driver:`Kotlin Driver Quick Start guide
   </kotlin/coroutine/current/quick-start/>`.

   To learn more about performing aggregations in the Kotlin Driver, see the
   :driver:`Aggregation guide </kotlin/coroutine/current/fundamentals/aggregation/>`.

In addition to the driver, you must also add the following dependencies
to your ``build.gradle.kts`` file and reload your project:

.. code-block:: kotlin

   dependencies {
       // Implements Kotlin serialization
       implementation("org.jetbrains.kotlinx:kotlinx-serialization-core:1.5.1")
       // Implements Kotlin date and time handling
       implementation("org.jetbrains.kotlinx:kotlinx-datetime:0.6.1")
   }

After you install the driver, create a file called
``AggTutorial.kt``. Paste the following code in this file to create an
app template for the aggregation tutorials.

.. important::

   In the following code, read the code comments to find the sections of
   the code that you must modify for the tutorial you are following.

   If you attempt to run the code without making any changes, you will
   encounter a connection error.

.. code-block:: kotlin

   package org.example
   
   // Modify imports for each tutorial as needed.
   import com.mongodb.client.model.*
   import com.mongodb.kotlin.client.coroutine.MongoClient
   import kotlinx.coroutines.runBlocking
   import kotlinx.datetime.LocalDateTime
   import kotlinx.datetime.toJavaLocalDateTime
   import kotlinx.serialization.Contextual
   import kotlinx.serialization.Serializable
   import org.bson.Document
   import org.bson.conversions.Bson
   
   // Define data classes.
   @Serializable
   data class MyClass(
       ...
   )
   
   suspend fun main() {
       // Replace the placeholder with your connection string.
       val uri = "<connection string>"

       MongoClient.create(uri).use { mongoClient ->
           val aggDB = mongoClient.getDatabase("agg_tutorials_db")

           // Get a reference to relevant collections.
           // ... val someColl = ...
   
           // Delete any existing documents in collections if needed.
           // ... someColl.deleteMany(empty())
   
           // Insert sample data into the collection or collections.
           // ... someColl.insertMany( ... )
   
           // Create an empty pipeline.
           val pipeline = mutableListOf<Bson>()
   
           // Add code to create pipeline stages.
           // ... pipeline.add(...)
   
           // Run the aggregation.
           // ... val aggregationResult = someColl.aggregate<Document>(pipeline)
   
           // Print the aggregation results.
           aggregationResult.collect { println(it) }
       }
   }

For every tutorial, you must replace the connection string placeholder with
your deployment's connection string.

.. tip::

   To learn how to locate your deployment's connection string, see the
   :driver:`Connect to your Cluster
   </kotlin/coroutine/current/quick-start/#connect-to-your-cluster>`
   step of the Kotlin Driver Quick Start guide.

For example, if your connection string is
``"mongodb+srv://mongodb-example:27017"``, your connection string assignment resembles
the following:

.. code-block:: java
   :copyable: false

   val uri = "mongodb+srv://mongodb-example:27017"
