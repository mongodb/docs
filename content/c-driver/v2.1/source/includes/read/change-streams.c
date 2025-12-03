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
        // Opens a change stream on the collection and prints each change
        // start-open-change-stream
        bson_t *pipeline = bson_new ();
        const bson_t *doc;

        mongoc_change_stream_t *change_stream =
            mongoc_collection_watch (collection, pipeline, NULL);

        while (true) {
            bson_error_t error;
            if (mongoc_change_stream_next (change_stream, &doc)) {
                char *str = bson_as_canonical_extended_json (doc, NULL);
                printf ("Received change: %s\n", str);
                bson_free (str);
            } else if (mongoc_change_stream_error_document (change_stream, &error, NULL)) {
                printf("Got error on change stream: %s\n", error.message);
                break;
            }
        }

        bson_destroy (pipeline);
        mongoc_change_stream_destroy (change_stream);
        // end-open-change-stream
    }
    {
        // Updates a document in the collection to trigger a change event
        // start-update-for-change-stream
        bson_t *filter = BCON_NEW ("name", BCON_UTF8 ("Blarney Castle"));
        bson_t *update = BCON_NEW("$set", "{", "cuisine", BCON_UTF8 ("Irish"), "}");

        mongoc_collection_update_one (collection, filter, update, NULL, NULL, NULL);
        // end-update-for-change-stream
    }
    {
        // Opens a change stream on the collection and specifies a pipeline to only receive update events
        // start-change-stream-pipeline
        bson_t *pipeline = BCON_NEW (
            "pipeline", "[", 
            "{", "$match", "{", "operationType", BCON_UTF8 ("update"), "}", "}", 
            "]");
        const bson_t *doc;

        mongoc_change_stream_t *change_stream =
            mongoc_collection_watch (collection, pipeline, NULL);

        while (mongoc_change_stream_next (change_stream, &doc)) {
          char *str = bson_as_canonical_extended_json (doc, NULL);
          printf ("Received change: %s\n", str);
          bson_free (str);
        }

        bson_destroy (pipeline);
        mongoc_change_stream_destroy (change_stream);
        // end-change-stream-pipeline
    }
    {
        // Opens a change stream on the collection and specifies options to receive the full document for update events
        // start-change-stream-post-image
        bson_t *pipeline = bson_new ();
        bson_t *opts = BCON_NEW ("fullDocument", BCON_UTF8 ("updateLookup"));
        const bson_t *doc;

        mongoc_change_stream_t *change_stream =
            mongoc_collection_watch (collection, pipeline, opts);

        while (true) {
            bson_error_t error;
            if (mongoc_change_stream_next (change_stream, &doc)) {
                char *str = bson_as_canonical_extended_json (doc, NULL);
                printf ("Received change: %s\n", str);
                bson_free (str);
            } else if (mongoc_change_stream_error_document (change_stream, &error, NULL)) {
                printf("Got error on change stream: %s\n", error.message);
                break;
            }
        }

        bson_destroy (pipeline);
        bson_destroy (opts);
        mongoc_change_stream_destroy (change_stream);
        // end-change-stream-post-image
    }

    mongoc_collection_destroy (collection);
    mongoc_client_destroy (client);
    mongoc_cleanup ();

    return EXIT_SUCCESS;
}