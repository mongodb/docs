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
        // Retrieves the distinct values of the "borough" field from the restaurants collection
        // start-distinct
        bson_t reply;
        bson_error_t error;

        bson_t *command = BCON_NEW ("distinct",
                            BCON_UTF8 ("restaurants"),
                            "key",
                            BCON_UTF8 ("borough"));
        
        if (!mongoc_collection_read_command_with_opts (collection, command, NULL, NULL, &reply, &error)) {
            fprintf (stderr, "An error occurred: %s\n", error.message);
        } else {
            char *str = bson_as_canonical_extended_json (&reply, NULL);
            printf ("%s\n", str);
            bson_free (str);
        }

        bson_destroy (&reply);
        bson_destroy (command);
        // end-distinct
    }

    {
        // Retrieves the distinct values of the "borough" field from the restaurants collection
        // while using a query filter to only fetch values from documents with a cuisine field
        // value of "Italian"
        // start-distinct-query
        bson_t reply;
        bson_error_t error;

        bson_t *query = BCON_NEW ("cuisine", BCON_UTF8 ("Italian"));

        bson_t *command = BCON_NEW ("distinct", BCON_UTF8 ("restaurants"),
                            "key", BCON_UTF8 ("borough"),
                            "query", BCON_DOCUMENT (query));

        if (!mongoc_collection_read_command_with_opts (collection, command, NULL, NULL, &reply, &error)) {
            fprintf (stderr, "An error occurred: %s\n", error.message);
        } else {
            char *str = bson_as_canonical_extended_json (&reply, NULL);
            printf ("%s\n", str);
            bson_free (str);
        }

        bson_destroy (&reply);
        bson_destroy (command);
        bson_destroy (query);
        // end-distinct-query
    }
    {
        // Retrieves the distinct values of the "name" field from the restaurants collection
        // while using a query filter to only fetch values from documents with a cuisine field
        // value of "Pizza", and adds a comment to the operation
        // start-distinct-comment
        bson_t reply;
        bson_error_t error;

        bson_t *query = BCON_NEW ("borough", BCON_UTF8 ("Bronx"),
                                  "cuisine", BCON_UTF8 ("Pizza"));
        
        bson_t *command = BCON_NEW ("distinct", BCON_UTF8 ("restaurants"),
                            "key", BCON_UTF8 ("name"),
                            "query", BCON_DOCUMENT (query));

        
        bson_t *opts = BCON_NEW ("comment", BCON_UTF8 ("Bronx pizza restaurants"));

        if (!mongoc_collection_read_command_with_opts (collection, command, NULL, opts, &reply, &error)) {
            fprintf (stderr, "An error occurred: %s\n", error.message);
        } else {
            char *str = bson_as_canonical_extended_json (&reply, NULL);
            printf ("%s\n", str);
            bson_free (str);
        }

        bson_destroy (&reply);
        bson_destroy (command);
        bson_destroy (query);
        bson_destroy (opts);
        // end-distinct-comment
    }

    mongoc_collection_destroy (collection);
    mongoc_client_destroy (client);
    mongoc_cleanup ();

    return EXIT_SUCCESS;
}