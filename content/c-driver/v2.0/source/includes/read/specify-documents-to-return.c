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
        // Fetches all documents with a cuisine field value of "Italian" and limits the results to 5 documents
        // start-limit
        const bson_t *doc;

        bson_t *filter = BCON_NEW ("cuisine", BCON_UTF8 ("Italian"));
        bson_t *opts = BCON_NEW ("limit", BCON_INT64 (5));

        mongoc_cursor_t *results =
            mongoc_collection_find_with_opts (collection, filter, opts, NULL);

        while (mongoc_cursor_next (results, &doc)) {
            char *str = bson_as_canonical_extended_json (doc, NULL);
            printf ("%s\n", str);
            bson_free (str);
        }

        bson_destroy (filter);
        bson_destroy (opts);
        mongoc_cursor_destroy (results);
        // end-limit
    }
    {
        // Fetches all documents with a cuisine field value of "Italian" and returns them in ascended sort order
        // start-sort
        const bson_t *doc;

        bson_t *filter = BCON_NEW ("cuisine", BCON_UTF8 ("Italian"));
        bson_t *opts = BCON_NEW ("sort", "{", "name", BCON_INT32 (1), "}");

        mongoc_cursor_t *results =
            mongoc_collection_find_with_opts (collection, filter, opts, NULL);

        while (mongoc_cursor_next (results, &doc)) {
            char *str = bson_as_canonical_extended_json (doc, NULL);
            printf ("%s\n", str);
            bson_free (str);
        }

        bson_destroy (filter);
        bson_destroy (opts);
        mongoc_cursor_destroy (results);
        // end-sort
    }
    {
        // Fetches all documents with a cuisine field value of "Italian" and skips the first 10 results
        // start-skip
        const bson_t *doc;

        bson_t *filter = BCON_NEW ("cuisine", BCON_UTF8 ("Italian"));
        bson_t *opts = BCON_NEW ("skip", BCON_INT64 (10));

        mongoc_cursor_t *results =
            mongoc_collection_find_with_opts (collection, filter, opts, NULL);

        while (mongoc_cursor_next (results, &doc)) {
            char *str = bson_as_canonical_extended_json (doc, NULL);
            printf ("%s\n", str);
            bson_free (str);
        }

        bson_destroy (filter);
        bson_destroy (opts);
        mongoc_cursor_destroy (results);
        // end-skip
    }
    {
        // Fetches all documents with a cuisine field value of "Italian", skips the first 10 results, limits the number of returned results to 5, and sorts them in ascending order
        // start-limit-sort-skip
        const bson_t *doc;

        bson_t *filter = BCON_NEW ("cuisine", BCON_UTF8 ("Italian"));
        bson_t *opts = BCON_NEW ("limit", BCON_INT64 (5),
                                "skip", BCON_INT64 (10), 
                                "sort", "{", "name", BCON_INT32 (1), "}");
                                
        mongoc_cursor_t *results =
            mongoc_collection_find_with_opts (collection, filter, opts, NULL);

        while (mongoc_cursor_next (results, &doc)) {
            char *str = bson_as_canonical_extended_json (doc, NULL);
            printf ("%s\n", str);
            bson_free (str);
        }

        bson_destroy (filter);
        bson_destroy (opts);
        mongoc_cursor_destroy (results);
        // end-limit-sort-skip
    }

    mongoc_collection_destroy (collection);
    mongoc_client_destroy (client);
    mongoc_cleanup ();

    return EXIT_SUCCESS;
}