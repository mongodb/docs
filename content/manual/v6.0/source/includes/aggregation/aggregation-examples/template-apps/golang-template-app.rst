Before you begin following this aggregation tutorial, you must set up a
new Go app. You can use this app to connect to a MongoDB
deployment, insert sample data into MongoDB, and run the aggregation
pipeline.

.. tip:: 

   To learn how to install the driver and connect to MongoDB,
   see the :driver:`Go Driver Quick Start guide </go/current/quick-start/>`.

   To learn more about performing aggregations in the Go Driver, see the
   :driver:`Aggregation guide </go/current/fundamentals/aggregation/>`.

After you install the driver, create a file called
``agg_tutorial.go``. Paste the following code in this file to create an
app template for the aggregation tutorials.

.. important::

   In the following code, read the code comments to find the sections of
   the code that you must modify for the tutorial you are following.

   If you attempt to run the code without making any changes, you will
   encounter a connection error.

.. code-block:: go

   package main
   
   import (
       "context"
       "fmt"
       "log"
       "time"
   
       "go.mongodb.org/mongo-driver/v2/bson"
       "go.mongodb.org/mongo-driver/v2/mongo"
       "go.mongodb.org/mongo-driver/v2/mongo/options"
   )
   
   // Define structs.
   // type MyStruct struct { ... }
   
   func main() {
       // Replace the placeholder with your connection string.
       const uri = "<connection string>"
   
       client, err := mongo.Connect(options.Client().ApplyURI(uri))
       if err != nil {
           log.Fatal(err)
       }
   
       defer func() {
           if err = client.Disconnect(context.TODO()); err != nil {
               log.Fatal(err)
           }
       }()
   
       aggDB := client.Database("agg_tutorials_db")
   
       // Get a reference to relevant collections.
       // ... someColl := aggDB.Collection("...")
       // ... anotherColl := aggDB.Collection("...")

       // Delete any existing documents in collections if needed.
       // ... someColl.DeleteMany(context.TODO(), bson.D{})

       // Insert sample data into the collection or collections.   
       // ... _, err = someColl.InsertMany(...)

       // Add code to create pipeline stages.
       // ... myStage := bson.D{{...}}
   
       // Create a pipeline that includes the stages.
       // ... pipeline := mongo.Pipeline{...}

       // Run the aggregation.
       // ... cursor, err := someColl.Aggregate(context.TODO(), pipeline)

       if err != nil {
           log.Fatal(err)
       }

       defer func() {
           if err := cursor.Close(context.TODO()); err != nil {
               log.Fatalf("failed to close cursor: %v", err)
           }
       }()

       // Decode the aggregation results.
       var results []bson.D
       if err = cursor.All(context.TODO(), &results); err != nil {
           log.Fatalf("failed to decode results: %v", err)
       }

       // Print the aggregation results.
       for _, result := range results {
           res, _ := bson.MarshalExtJSON(result, false, false)
           fmt.Println(string(res))
       }
   }

For every tutorial, you must replace the connection string placeholder with
your deployment's connection string.

.. tip::

   To learn how to locate your deployment's connection string, see the
   :driver:`Create a MongoDB Cluster </go/current/quick-start/#create-a-mongodb-cluster>`
   step of the Go Quick Start guide.

For example, if your connection string is
``"mongodb+srv://mongodb-example:27017"``, your connection string assignment resembles
the following:

.. code-block:: go
   :copyable: false

   const uri = "mongodb+srv://mongodb-example:27017";
