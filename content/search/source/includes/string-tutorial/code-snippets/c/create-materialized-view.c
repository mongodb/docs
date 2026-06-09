#include <mongoc/mongoc.h>
#include <stdlib.h>

int main (void)
{
    mongoc_cursor_t *cursor;
    bson_t *pipeline;
    mongoc_client_t *client = NULL;
    mongoc_collection_t *collection = NULL;
    mongoc_database_t *database = NULL;
    bson_error_t error;
    bson_t cmd = BSON_INITIALIZER;
    bool ok = true;

    mongoc_init();

    // Connect to your Atlas deployment
    client = mongoc_client_new("<connection-string>");
    if (!client) {
        fprintf(stderr, "Failed to create a MongoDB client.\n");
        ok = false;
        goto cleanup;
    }

    // Access your database and collection
    database = mongoc_client_get_database(client, "sample_airbnb");
    collection = mongoc_database_get_collection(database, "listingsAndReviews");

    // Create the aggregation pipeline
    pipeline = BCON_NEW (
       "pipeline", "[",
          "{", "$project", "{", 
             "lastScrapedDate", "{", "$dateToString", "{", "format", BCON_UTF8("%Y-%m-%d"), "date", BCON_UTF8("$last_scraped"), "}", "}", 
             "propertyName", BCON_UTF8("$name"),
             "propertyType", BCON_UTF8("$property_type"),
             "accommodatesNumber", "{", "$toString", BCON_UTF8("$accommodates"), "}", 
             "maximumNumberOfNights", "{", "$toString", BCON_UTF8("$maximum_nights"), "}",
          "}", "}",
          "{", "$merge", "{",
             "into", BCON_UTF8("airbnb_mat_view"),
             "whenMatched", BCON_UTF8("replace"),
          "}", "}",
        "]"
    );

    // Execute the aggregation
    cursor = mongoc_collection_aggregate(collection, MONGOC_QUERY_NONE, pipeline, NULL, NULL);
    while (mongoc_cursor_next(cursor, &doc)) {
    }
    if (mongoc_cursor_error(cursor, &error)) {
        fprintf(stderr, "Failed to execute aggregation: %s\n", error.message);
        ok = false;
        goto cleanup;
    }
    printf ("Materialized view created!\n");

cleanup:
   mongoc_collection_destroy (collection);
   mongoc_client_destroy (client);
   mongoc_database_destroy (database);
   bson_destroy(pipeline);
   mongoc_cursor_destroy(cursor);
   mongoc_cleanup ();
   return ok ? EXIT_SUCCESS : EXIT_FAILURE;
}