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
        // start-find
        bson_t *filter = BCON_NEW ("cuisine", BCON_UTF8 ("Spanish"));

        mongoc_cursor_t *results = 
            mongoc_collection_find_with_opts (collection, filter, NULL, NULL);
        // end-find
        
        // start-find-iterate
        const bson_t *doc;
        bson_error_t error;

        while (mongoc_cursor_next (results, &doc)) {
            char *str = bson_as_canonical_extended_json (doc, NULL);
            printf ("%s\n", str);
            bson_free (str);
        }

        // Ensure we iterated through cursor without error
        if (mongoc_cursor_error (results, &error)) {
            fprintf (stderr, "Error getting results: %s\n", error.message);
        }

        mongoc_cursor_destroy (results);
        bson_destroy (filter);
        // end-find-iterate
    }

    {
        // start-find-all
        bson_t *empty_filter = bson_new ();

        mongoc_cursor_t *results = 
            mongoc_collection_find_with_opts (collection, empty_filter, NULL, NULL);
        
        mongoc_cursor_destroy (results);
        bson_destroy (empty_filter);
        // end-find-all
    }

    {
        // start-modified-find
        bson_t *filter = BCON_NEW ("cuisine", BCON_UTF8 ("Spanish"));
        bson_t *opts = BCON_NEW ("limit", BCON_INT32 (10), "maxTimeMS", BCON_INT32 (10000));

        mongoc_cursor_t *results = 
            mongoc_collection_find_with_opts (collection, filter, opts, NULL);

        mongoc_cursor_destroy (results);
        bson_destroy (filter);
        bson_destroy (opts);
        // end-modified-find
    }

    mongoc_collection_destroy (collection);
    mongoc_client_destroy (client);
    mongoc_cleanup ();

    return EXIT_SUCCESS;
}