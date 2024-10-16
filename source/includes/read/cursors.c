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
        // Finds all documents in the collection and iterates over the returned cursor to print each document
        // start-cursor-iterate
        const bson_t *doc;
        bson_t *filter = bson_new ();

        mongoc_cursor_t *results = 
            mongoc_collection_find_with_opts (collection, filter, NULL, NULL);

        while (mongoc_cursor_next (results, &doc)) {
            char *str = bson_as_canonical_extended_json (doc, NULL);
            printf ("%s\n", str);
            bson_free (str);
        }

        mongoc_cursor_destroy (results);
        bson_destroy (filter);
        // end-cursor-iterate
    }

    {
        // Finds the first document in the collection with the name "Dunkin' Donuts"
        // start-cursor-next
        const bson_t *doc;
        bson_t *filter = BCON_NEW ("name", BCON_UTF8 ("Dunkin' Donuts"));

        mongoc_cursor_t *results = 
            mongoc_collection_find_with_opts (collection, filter, NULL, NULL);

        mongoc_cursor_next (results, &doc);

        char *str = bson_as_canonical_extended_json (doc, NULL);
        printf ("%s\n", str);

        bson_free (str);
        mongoc_cursor_destroy (results);
        bson_destroy (filter);
        // end-cursor-next
    }

    {
        bson_t *filter = bson_new ();

        mongoc_cursor_t *cursor = 
            mongoc_collection_find_with_opts (collection, filter, NULL, NULL);

        // Closes the cursor
        // start-cursor-close
        mongoc_cursor_destroy (cursor);
        // end-cursor-close
        bson_destroy (filter);
    }

    {
        // Creates a tailable cursor on the collection
        // start-tailable-cursor
        collection = mongoc_client_get_collection (client, "<database>", "<capped collection>");

        bson_t *filter = bson_new ();
        bson_t *opts = BCON_NEW ("tailable", BCON_BOOL (true),
                                 "awaitData", BCON_BOOL (true));
        
        mongoc_cursor_t *tailable_cursor = 
            mongoc_collection_find_with_opts(collection, filter, opts, NULL);

        // Perform operations with tailable cursor here

        mongoc_cursor_destroy (tailable_cursor);
        bson_destroy (filter);
        bson_destroy (opts);
        // end-tailable-cursor
    }

    mongoc_collection_destroy (collection);
    mongoc_client_destroy (client);
    mongoc_cleanup ();

    return EXIT_SUCCESS;
}