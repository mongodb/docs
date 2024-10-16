#include <bson/bson.h>
#include <mongoc/mongoc.h>
#include <stdio.h>

int
main (void)
{
    const bson_t *doc;

    mongoc_init ();

    mongoc_client_t *client = mongoc_client_new ("<connection string>");
    mongoc_collection_t *collection = mongoc_client_get_collection (client, "sample_mflix", "movies");

    // Specify the query filter
    bson_t *query = BCON_NEW ("title", "The Shawshank Redemption");

    mongoc_cursor_t *results = mongoc_collection_find_with_opts (collection, query, NULL, NULL);

    // Print the results
    while (mongoc_cursor_next (results, &doc))
    {
        char* str = bson_as_canonical_extended_json (doc, NULL);
        printf ("%s\n", str);
        bson_free (str);
    }

    bson_destroy (query);
    mongoc_cursor_destroy (results);
    mongoc_collection_destroy (collection);
    mongoc_client_destroy (client);
    mongoc_cleanup ();

    return EXIT_SUCCESS;
}