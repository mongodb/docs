#include <bson/bson.h>
#include <mongoc/mongoc.h>
#include <stdio.h>

int
main (void)
{
    mongoc_client_t *client;
    mongoc_collection_t *collection;
    char *str;
    bson_error_t error;

    mongoc_init ();

    client = mongoc_client_new ("<connection string URI>");
    collection = mongoc_client_get_collection (client, "<database name>", "collection name");

    {
        // start-find
        bson_t *query = bson_new ();
        // Add fields to query here
        mongoc_cursor_t* results = mongoc_collection_find_with_opts (collection, query, NULL, NULL);
        const bson_t *doc;

        while (mongoc_cursor_next (results, &doc)) {
            str = bson_as_canonical_extended_json (doc, NULL);
            printf ("%s\n", str);
            bson_free (str);
        }

        mongoc_cursor_destroy (results);
        bson_destroy (query);
        // end-find
    }

    {
        // start-count-all
        bson_t *query = bson_new ();
        int64_t count = 
            mongoc_collection_count_documents (collection, query, NULL, NULL, NULL, &error);

        printf ("%" PRId64 "\n", count);
        bson_destroy (query);
        // end-count-all
    }

    {
        // start-count-query
        bson_t *query = bson_new ();
        // Add fields to query here
        int64_t count =
            mongoc_collection_count_documents (collection, query, NULL, NULL, NULL, &error);

        printf ("%" PRId64 "\n", count);

        bson_destroy (query);
        // end-count-query
    }

    {
        // start-estimated-count       
        int64_t count =
            mongoc_collection_estimated_document_count (collection, NULL, NULL, NULL, &error);

        printf ("%" PRId64 "\n", count);
        // end-estimated-count
    }

    {
        // start-distinct
        bson_t reply;
        bson_t *command = BCON_NEW ("distinct",
                            BCON_UTF8 ("<collection name>"),
                            "key",
                            BCON_UTF8 ("<field name>"));
        
        if (!mongoc_collection_read_command_with_opts (collection, command, NULL, NULL, &reply, &error)) {
            fprintf (stderr, "An error occurred: %s\n", error.message);
        } else {
            str = bson_as_canonical_extended_json (&reply, NULL);
            printf ("%s\n", str);
            bson_free (str);
        }
        bson_destroy(&reply);
        bson_destroy(command);
        // end-distinct
    }

    {
        // start-watch
        mongoc_change_stream_t *change_stream;
        bson_t *pipeline = bson_new ();
        // Add stages to pipeline here
        const bson_t *doc;

        change_stream = mongoc_collection_watch (collection, pipeline, NULL);

        while (mongoc_change_stream_next (change_stream, &doc)) {
          str = bson_as_canonical_extended_json (doc, NULL);
          printf ("Change: %s\n", str);
          bson_free (str);
        }

        bson_destroy (pipeline);
        mongoc_change_stream_destroy (change_stream);
        // end-watch
    }

    mongoc_collection_destroy (collection);
    mongoc_client_destroy (client);
    mongoc_cleanup ();

    return EXIT_SUCCESS;
}