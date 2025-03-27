#include <mongoc/mongoc.h>
#include <stdlib.h>

int main (void)
{
    mongoc_client_t *client = NULL;
    mongoc_collection_t *collection = NULL;
    mongoc_database_t *database = NULL;
    bson_error_t error;
    bson_t cmd = BSON_INITIALIZER;
    bool ok = true;
    bson_t pipeline = BSON_INITIALIZER;
    mongoc_cursor_t *cursor = NULL;

    mongoc_init();

    // Connect to your Atlas deployment
    client = mongoc_client_new("<connectionString>");
    if (!client) {
        fprintf(stderr, "Failed to create a MongoDB client.\n");
        ok = false;
        goto cleanup;
    }

    // Access your database and collection
    database = mongoc_client_get_database(client, "<databaseName>");
    collection = mongoc_database_get_collection(database, "<collectionName>");

    // Create an aggregation pipeline with the $listSearchIndexes stage
    const char *pipeline_str =
        BSON_STR ({"pipeline" : [ {"$listSearchIndexes" : {}} ]});

    // Convert your aggregation pipeline to BSON
    if (!bson_init_from_json(&pipeline, pipeline_str, -1, &error)) {
        fprintf(stderr, "Failed to parse command: %s\n", error.message);
        ok = false;
        goto cleanup;
    }

    // Run the aggregation operation and iterate through the indexes returned
    cursor = mongoc_collection_aggregate (collection,
                                    MONGOC_QUERY_NONE,
                                    &pipeline,
                                    NULL,
                                    NULL);
    const bson_t *got;
    char *str;
    
    while (mongoc_cursor_next (cursor, &got)) {
      str = bson_as_canonical_extended_json (got, NULL);
      printf ("%s\n", str);
      bson_free (str);
   }

   if (mongoc_cursor_error (cursor, &error)) {
      fprintf (stderr, "Failed to iterate all documents: %s\n", error.message);
      ok = false;
      goto cleanup;
   }

cleanup:
    mongoc_cursor_destroy(cursor);
    mongoc_collection_destroy(collection);
    mongoc_database_destroy(database);
    mongoc_client_destroy(client);
    bson_destroy(&pipeline);
    bson_destroy(&cmd);
   mongoc_cleanup ();
   return ok ? EXIT_SUCCESS : EXIT_FAILURE;
}
