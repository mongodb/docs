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
    collection = mongoc_client_get_collection (client, "sample_fruit", "fruits");

    {
        // Uses a query filter to query for documents with a type field value of "movie"
        // start-find-exact
        const bson_t *doc;
        bson_t *filter = BCON_NEW ("type", BCON_UTF8 ("movie"));

        mongoc_cursor_t *results = 
            mongoc_collection_find_with_opts (collection, filter, NULL, NULL);

        while (mongoc_cursor_next (results, &doc)) {
            char *str = bson_as_canonical_extended_json (doc, NULL);
            printf ("%s\n", str);
            bson_free (str);
        }

        mongoc_cursor_destroy (results);
        bson_destroy (filter);
        // end-find-exact
    }

    {
        // Uses a query filter to query for documents with a year field value greater than 2015
        // start-find-comparison
        const bson_t *doc;
        bson_t *filter = BCON_NEW ("year", "{", "$gt", BCON_INT32 (2015), "}");

        mongoc_cursor_t *results = 
            mongoc_collection_find_with_opts (collection, filter, NULL, NULL);

        while (mongoc_cursor_next (results, &doc)) {
            char *str = bson_as_canonical_extended_json (doc, NULL);
            printf ("%s\n", str);
            bson_free (str);
        }

        mongoc_cursor_destroy (results);
        bson_destroy (filter);
        // end-find-comparison
    }

    {
        // Uses a query filter to query for documents with a year field value of 1983 or 1985
        // start-find-logical
        const bson_t *doc;
        bson_t *filter = BCON_NEW (
            "$or", "[",
                "{", "year", BCON_INT64 (1983), "}",
                "{", "year", BCON_INT64 (1985), "}",
            "]"
        );

        mongoc_cursor_t *results = 
            mongoc_collection_find_with_opts (collection, filter, NULL, NULL);

        while (mongoc_cursor_next (results, &doc)) {
            char *str = bson_as_canonical_extended_json (doc, NULL);
            printf ("%s\n", str);
            bson_free (str);
        }

        mongoc_cursor_destroy (results);
        bson_destroy (filter);
        // end-find-logical
    }

    {
        // Uses a query filter to query for documents with a genres array field of size 2
        // start-find-array
        const bson_t *doc;
        bson_t *filter = BCON_NEW ("genres", "{", "$size", BCON_INT32 (2), "}");

        mongoc_cursor_t *results = 
            mongoc_collection_find_with_opts (collection, filter, NULL, NULL);

        while (mongoc_cursor_next (results, &doc)) {
            char *str = bson_as_canonical_extended_json (doc, NULL);
            printf ("%s\n", str);
            bson_free (str);
        }

        mongoc_cursor_destroy (results);
        bson_destroy (filter);
        // end-find-array
    }

    {
        // Uses a query filter to query for documents that have a num_mflix_comments field
        // start-find-element
        const bson_t *doc;
        bson_t *filter = BCON_NEW ("num_mflix_comments", "{", "$exists", BCON_BOOL (true), "}");

        mongoc_cursor_t *results = 
            mongoc_collection_find_with_opts (collection, filter, NULL, NULL);

        while (mongoc_cursor_next (results, &doc)) {
            char *str = bson_as_canonical_extended_json (doc, NULL);
            printf ("%s\n", str);
            bson_free (str);
        }

        mongoc_cursor_destroy (results);
        bson_destroy (filter);
        // end-find-element
    }

    {
        // Uses a query filter to query for documents with a title field value that contains two consecutive "p" characters
        // start-find-evaluation
        const bson_t *doc;
        bson_t *filter = BCON_NEW("title", "{", "$regex", BCON_UTF8("p{2,}"), "}");

        mongoc_cursor_t *results = 
            mongoc_collection_find_with_opts (collection, filter, NULL, NULL);

        while (mongoc_cursor_next (results, &doc)) {
            char *str = bson_as_canonical_extended_json (doc, NULL);
            printf ("%s\n", str);
            bson_free (str);
        }

        mongoc_cursor_destroy (results);
        bson_destroy (filter);
        // end-find-evaluation
    }

    mongoc_collection_destroy (collection);
    mongoc_client_destroy (client);
    mongoc_cleanup ();

    return EXIT_SUCCESS;
}