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
    collection = mongoc_client_get_collection (client, "sample_mflix", "movies");

    {
        // start-count-all
        bson_error_t error;
        bson_t *empty_query = bson_new ();

        int64_t count = 
            mongoc_collection_count_documents (collection, empty_query, NULL, NULL, NULL, &error);
        printf ("%" PRId64 "\n", count);

        bson_destroy (empty_query);
        // end-count-all
    }
    
    {
        // start-count-query
        bson_error_t error;
        bson_t *query = BCON_NEW ("year", BCON_INT32 (1930));

        int64_t count =
            mongoc_collection_count_documents (collection, query, NULL, NULL, NULL, &error);
        printf ("%" PRId64 "\n", count);
        
        bson_destroy (query);
        // end-count-query
    }

    {
        // start-count-options
        bson_error_t error;
        bson_t *opts = BCON_NEW ("comment", BCON_UTF8 ("Retrieving count"));

        int64_t count =
            mongoc_collection_count_documents (collection, bson_new (), opts, NULL, NULL, &error);
        printf ("%" PRId64 "\n", count);

        bson_destroy (opts);
        // end-count-options
    }

    {
        // start-estimated-count
        bson_error_t error;

        int64_t count =
            mongoc_collection_estimated_document_count (collection, NULL, NULL, NULL, &error);
        printf ("%" PRId64 "\n", count);
        // end-estimated-count
    }

    {
        // start-estimated-count-options
        bson_error_t error;
        bson_t *opts = BCON_NEW ("comment", BCON_UTF8 ("Retrieving count"));

        int64_t count =
            mongoc_collection_estimated_document_count (collection, opts, NULL, NULL, &error);
        printf ("%" PRId64 "\n", count);

        bson_destroy (opts);
        // end-estimated-count-options
    }
    
    mongoc_collection_destroy (collection);
    mongoc_client_destroy (client);
    mongoc_cleanup ();

    return EXIT_SUCCESS;
}