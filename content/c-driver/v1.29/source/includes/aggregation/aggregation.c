#include <stdio.h>
#include <bson/bson.h>
#include <mongoc/mongoc.h>

int
main (void)
{
    mongoc_client_t *client;
    mongoc_collection_t *collection;
    mongoc_init ();

    client = mongoc_client_new ("<connection string URI>");
    collection = mongoc_client_get_collection (client, "sample_restaurants", "restaurants");

    {
        // Executes an aggregation pipeline containing the $match and $group stages and prints the results
        // start-aggregation-pipeline
        const bson_t *doc;
        bson_t *pipeline = BCON_NEW ("pipeline",
            "[", 
            "{", "$match", "{", "cuisine", BCON_UTF8 ("Bakery"), "}", "}",
            "{", "$group", "{", 
                "_id", BCON_UTF8 ("$borough"), "count", "{", "$sum", BCON_INT32 (1), "}", "}",
            "}",
            "]");

        mongoc_cursor_t *results =
            mongoc_collection_aggregate (collection, MONGOC_QUERY_NONE, pipeline, NULL, NULL);
        
        bson_error_t error;
        if (mongoc_cursor_error (results, &error))
        {
            fprintf (stderr, "Aggregate failed: %s\n", error.message);
        } else {
            while (mongoc_cursor_next (results, &doc)) {
                char *str = bson_as_canonical_extended_json (doc, NULL);
                printf ("%s\n", str);
                bson_free (str);
            }
        }

        bson_destroy (pipeline);
        mongoc_cursor_destroy (results);
        // end-aggregation-pipeline
    }

    {
        // Runs a command to explain the logic behind the aggregation
        // start-aggregation-explain
        bson_t reply;
        bson_error_t error;

        bson_t *command = BCON_NEW (
            "aggregate", BCON_UTF8 ("restaurants"),
            "explain", BCON_BOOL(true),
            "pipeline",
            "[",
            "{", "$match", "{", "cuisine", BCON_UTF8("Bakery"), "}", "}",
            "{", "$group", "{",
                 "_id", BCON_UTF8("$borough"), "count", "{", "$sum", BCON_INT32(1), "}", "}",
            "}",
            "]");

        if (mongoc_client_command_simple (client, "sample_restaurants", command, NULL, &reply, &error)) {
            char *str = bson_as_canonical_extended_json (&reply, NULL);
            printf ("%s\n", str);
            bson_free (str);
        } else {
            fprintf (stderr, "Command failed: %s\n", error.message);
        }

        bson_destroy (command);
        bson_destroy (&reply);
        // end-aggregation-explain
    }

    mongoc_collection_destroy (collection);
    mongoc_client_destroy (client);
    mongoc_cleanup ();

    return EXIT_SUCCESS;
}