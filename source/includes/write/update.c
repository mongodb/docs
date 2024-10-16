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
        // Updates the "name" value of a document from "Bagels N Buns" to "2 Bagels 2 Buns"
        // start-update-one
        bson_t *query = BCON_NEW ("name", BCON_UTF8 ("Bagels N Buns"));
        bson_t *update = BCON_NEW ("$set", "{", "name", BCON_UTF8 ("2 Bagels 2 Buns"), "}");
        bson_error_t error;

        if (!mongoc_collection_update_one (collection, query, update, NULL, NULL, &error)) {
            fprintf (stderr, "Update one operation failed: %s\n", error.message);
        }

        bson_destroy (query);
        bson_destroy (update);
        // end-update-one
    }

    {
        // Updates the "cuisine" value of documents from "Pizza" to "Pasta"
        // start-update-many
        bson_t *query = BCON_NEW ("cuisine", BCON_UTF8 ("Pizza"));
        bson_t *update = BCON_NEW ("$set", "{", "cuisine", BCON_UTF8 ("Pasta"), "}");
        bson_error_t error;

        if (!mongoc_collection_update_many (collection, query, update, NULL, NULL, &error)) {
            fprintf (stderr, "Update many operation failed: %s\n", error.message);
        }

        bson_destroy (query);
        bson_destroy (update);
        // end-update-many
    }

    {
        // Updates the "borough" value of matching documents and inserts a document if none match
        // start-update-options
        bson_t *query = BCON_NEW ("borough", BCON_UTF8 ("Manhattan"));
        bson_t *update = BCON_NEW ("$set", "{", "borough", BCON_UTF8 ("Manhattan (north)"), "}");
        bson_error_t error;
        bson_t opts;

        bson_init (&opts);
        bson_append_bool (&opts, "upsert", -1, true);

        if (!mongoc_collection_update_many (collection, query, update, &opts, NULL, &error)) {
            fprintf (stderr, "Update many operation failed: %s\n", error.message);
        }

        bson_destroy (query);
        bson_destroy (update);
        bson_destroy (&opts);
        // end-update-options
    }

    mongoc_collection_destroy (collection);
    mongoc_client_destroy (client);
    mongoc_cleanup ();

    return EXIT_SUCCESS;
}