Before you begin following this aggregation tutorial, you must set up a
new C app. You can use this app to connect to a MongoDB
deployment, insert sample data into MongoDB, and run the aggregation
pipeline.

.. tip:: 

   To learn how to install the driver and connect to MongoDB,
   see the `Get Started with the C Driver guide
   <https://www.mongodb.com/docs/languages/c/c-driver/current/get-started/>`__.

   To learn more about performing aggregations in the C Driver, see the
   `Aggregation guide
   <https://www.mongodb.com/docs/languages/c/c-driver/current/aggregation/>`__.

After you install the driver, create a file called
``agg-tutorial.c``. Paste the following code in this file to create an
app template for the aggregation tutorials.

.. important::

   In the following code, read the code comments to find the sections of
   the code that you must modify for the tutorial you are following.

   If you attempt to run the code without making any changes, you will
   encounter a connection error.

.. code-block:: c

   #include <stdio.h>
   #include <bson/bson.h>
   #include <mongoc/mongoc.h>
   
   int main(void)
   {
       mongoc_init();
   
       // Replace the placeholder with your connection string.
       char *uri = "<connection string>";
       mongoc_client_t* client = mongoc_client_new(uri);
   
       // Get a reference to relevant collections.
       // ... mongoc_collection_t *some_coll = mongoc_client_get_collection(client, "agg_tutorials_db", "some_coll");
       // ... mongoc_collection_t *another_coll = mongoc_client_get_collection(client, "agg_tutorials_db", "another_coll");
   
       // Delete any existing documents in collections if needed.
       // ... {
       // ...     bson_t *filter = bson_new();
       // ...     bson_error_t error;
       // ...     if (!mongoc_collection_delete_many(some_coll, filter, NULL, NULL, &error))
       // ...     {
       // ...         fprintf(stderr, "Delete error: %s\n", error.message);
       // ...     }
       // ...     bson_destroy(filter);
       // ... }
   
       // Insert sample data into the collection or collections.
       // ... {
       // ...     size_t num_docs = ...;
       // ...     bson_t *docs[num_docs];
       // ... 
       // ...     docs[0] = ...;
       // ... 
       // ...     bson_error_t error;
       // ...     if (!mongoc_collection_insert_many(some_coll, (const bson_t **)docs, num_docs, NULL, NULL, &error))
       // ...     {
       // ...         fprintf(stderr, "Insert error: %s\n", error.message);
       // ...     }
       // ... 
       // ...     for (int i = 0; i < num_docs; i++)
       // ...     {
       // ...         bson_destroy(docs[i]);
       // ...     }
       // ... }
   
       {
           const bson_t *doc;
           
           // Add code to create pipeline stages.
           bson_t *pipeline = BCON_NEW("pipeline", "[",
           // ... Add pipeline stages here.
           "]");
   
           // Run the aggregation.
           // ... mongoc_cursor_t *results = mongoc_collection_aggregate(some_coll, MONGOC_QUERY_NONE, pipeline, NULL, NULL);
   
           bson_destroy(pipeline);
   
           // Print the aggregation results.
           while (mongoc_cursor_next(results, &doc))
           {
               char *str = bson_as_canonical_extended_json(doc, NULL);
               printf("%s\n", str);
               bson_free(str);
           }
           bson_error_t error;
           if (mongoc_cursor_error(results, &error))
           {
               fprintf(stderr, "Aggregation error: %s\n", error.message);
           }
           
           mongoc_cursor_destroy(results);
       }
   
       // Clean up resources.
       // ... mongoc_collection_destroy(some_coll);
       mongoc_client_destroy(client);
       mongoc_cleanup();
   
       return EXIT_SUCCESS;
   }

For every tutorial, you must replace the connection string placeholder with
your deployment's connection string.

.. tip::

   To learn how to locate your deployment's connection string, see the
   `Create a Connection String <https://www.mongodb.com/docs/languages/c/c-driver/current/get-started/#create-a-connection-string>`__
   step of the C Get Started guide.

For example, if your connection string is
``"mongodb+srv://mongodb-example:27017"``, your connection string assignment resembles
the following:

.. code-block:: c
   :copyable: false

   char *uri = "mongodb+srv://mongodb-example:27017";
