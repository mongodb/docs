Before you begin following this aggregation tutorial, you must set up a
new Rust app. You can use this app to connect to a MongoDB
deployment, insert sample data into MongoDB, and run the aggregation
pipeline.

.. tip:: 

   To learn how to install the driver and connect to MongoDB,
   see the :driver:`Rust Driver Quick Start guide </rust/current/quick-start/>`.

   To learn more about performing aggregations in the Rust Driver, see the
   :driver:`Aggregation guide </rust/current/fundamentals/aggregation/>`.

After you install the driver, create a file called
``agg-tutorial.rs``. Paste the following code in this file to create an
app template for the aggregation tutorials.

.. important::

   In the following code, read the code comments to find the sections of
   the code that you must modify for the tutorial you are following.

   If you attempt to run the code without making any changes, you will
   encounter a connection error.

.. code-block:: rust

   use mongodb::{
       bson::{doc, Document},
       options::ClientOptions,
       Client,
   };
   use futures::stream::TryStreamExt;
   use std::error::Error;

   // Define structs.
   // #[derive(Debug, Serialize, Deserialize)]
   // struct MyStruct { ... }

   #[tokio::main]
   async fn main() mongodb::error::Result<()> {
       // Replace the placeholder with your connection string.
       let uri = "<connection string>";
       let client = Client::with_uri_str(uri).await?;

       let agg_db = client.database("agg_tutorials_db");

       // Get a reference to relevant collections.
       // ... let some_coll: Collection<T> = agg_db.collection("...");
       // ... let another_coll: Collection<T> = agg_db.collection("...");

       // Delete any existing documents in collections if needed.
       // ... some_coll.delete_many(doc! {}).await?;

       // Insert sample data into the collection or collections.
       // ... some_coll.insert_many(vec![...]).await?;

       // Create an empty pipeline.
       let mut pipeline = Vec::new();

       // Add code to create pipeline stages.
       // pipeline.push(doc! { ... });

       // Run the aggregation and print the results.
       let mut results = some_coll.aggregate(pipeline).await?;
       while let Some(result) = results.try_next().await? {
          println!("{:?}\n", result);
       }
       Ok(())
   }

For every tutorial, you must replace the connection string placeholder with
your deployment's connection string.

.. tip::

   To learn how to locate your deployment's connection string, see the
   :driver:`Create a Connection String </rust/current/quick-start/create-a-connection-string/>`
   step of the Rust Quick Start guide.

For example, if your connection string is
``"mongodb+srv://mongodb-example:27017"``, your connection string assignment resembles
the following:

.. code-block:: rust
   :copyable: false

   let uri = "mongodb+srv://mongodb-example:27017";
