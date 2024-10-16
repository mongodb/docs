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
        // Deletes a document that has a "name" value of "Ready Penny Inn"
        // start-delete-one
        bson_t *filter = BCON_NEW ("name", BCON_UTF8 ("Ready Penny Inn"));
        bson_error_t error;

        if (!mongoc_collection_delete_one (collection, filter, NULL, NULL, &error)) {
            printf ("Delete error: %s\n", error.message);
        }

        bson_destroy (filter);
        // end-delete-one
    }

    {
        // Deletes documents that have a "borough" value of "Brooklyn"
        // start-delete-many
        bson_t *filter = BCON_NEW ("borough", BCON_UTF8 ("Brooklyn"));
        bson_error_t error;

        if (!mongoc_collection_delete_many (collection, filter, NULL, NULL, &error)) {
            printf ("Delete error: %s\n", error.message);
        }

        bson_destroy (filter);
        // end-delete-many
    }

    {
        // Deletes matching documents and attaches a comment to the operation
        // start-delete-options
        bson_t *filter = BCON_NEW ("name", "{", "$regex", BCON_UTF8 ("Mongo"), "}");
        bson_error_t error;
        bson_t opts;
        bson_init(&opts);
        BCON_APPEND (&opts, "comment", BCON_UTF8 ("Deleting Mongo restaurants"));

        if (!mongoc_collection_delete_many (collection, filter, &opts, NULL, &error)) {
            printf ("Delete error: %s\n", error.message);
        }

        bson_destroy (filter);
        bson_destroy (&opts);
        // end-delete-options
    }

    mongoc_collection_destroy (collection);
    mongoc_client_destroy (client);
    mongoc_cleanup ();

    return 0;
}