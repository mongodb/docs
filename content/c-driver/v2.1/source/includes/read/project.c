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
        // start-project
        const bson_t *doc;

        bson_t *filter = BCON_NEW ("name", BCON_UTF8 ("Emerald Pub"));
        bson_t *opts = BCON_NEW ("projection", "{",
                            "name", BCON_BOOL (true),
                            "cuisine", BCON_BOOL (true),
                            "borough", BCON_BOOL (true),
                            "}");

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
        // end-project
    }

    {
        // start-project-exclude
        const bson_t *doc;

        bson_t *filter = BCON_NEW ("name", BCON_UTF8 ("Emerald Pub"));
        bson_t *opts = BCON_NEW ("projection", "{",
                            "name", BCON_BOOL (true),
                            "cuisine", BCON_BOOL (true),
                            "borough", BCON_BOOL (true),
                            "_id", BCON_BOOL (false),
                            "}");

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
        // end-project-exclude
    }


    mongoc_collection_destroy (collection);
    mongoc_client_destroy (client);
    mongoc_cleanup ();

    return EXIT_SUCCESS;
}