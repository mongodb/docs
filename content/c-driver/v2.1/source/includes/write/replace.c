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
        // start-replace-one
        bson_t *query = BCON_NEW ("name", "Pizza Town");
        bson_t *replace = BCON_NEW (
            "name", "Mongo's Pizza",
            "cuisine", "Pizza",
            "address", "{",
            "street", "123 Pizza St",
            "zipCode", "10003",
            "}",
            "borough", "Manhattan"
        );
        bson_error_t error;

        if (!mongoc_collection_replace_one (collection, query, replace, NULL, NULL, &error)) {
            fprintf (stderr, "Replace operation failed: %s\n", error.message);
        }

        bson_destroy (query);
        bson_destroy (replace);
        // end-replace-one
    }

    {
        // start-replace-options
        bson_t *query = BCON_NEW ("name", "Food Town");
        bson_t *replace = BCON_NEW (
            "name", "Food World",
            "cuisine", "Mixed",
            "address", "{",
            "street", "123 Food St",
            "zipCode", "10003",
            "}",
            "borough", "Manhattan"
        );
        bson_error_t error;

        bson_t opts;
        bson_init (&opts);
        bson_append_bool (&opts, "upsert", -1, true);

        if (!mongoc_collection_replace_one (collection, query, replace, &opts, NULL, &error)) {
            fprintf (stderr, "Replace operation failed: %s\n", error.message);
        } 

        bson_destroy (query);
        bson_destroy (replace);
        bson_destroy (&opts);
        // end-replace-options
    }

    mongoc_collection_destroy (collection);
    mongoc_client_destroy (client);
    mongoc_cleanup ();

    return EXIT_SUCCESS;
}