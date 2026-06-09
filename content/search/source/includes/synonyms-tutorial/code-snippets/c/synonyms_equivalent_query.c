#include <mongoc/mongoc.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
    mongoc_client_t *client;
    mongoc_collection_t *collection;
    mongoc_cursor_t *cursor;
    bson_error_t error;
    const bson_t *doc;
    bson_t *pipeline;
    char *str;

    /* Initialize the MongoDB C Driver */
    mongoc_init();

    /* Connect to MongoDB */
    client = mongoc_client_new("<connection-string>");
    if (!client) {
        fprintf(stderr, "Failed to parse URI.\n");
        return EXIT_FAILURE;
    }

    /* Get a handle on the collection */
    collection = mongoc_client_get_collection(client, "sample_mflix", "movies");

    /* Create the pipeline */
    bson_t *search_stage = BCON_NEW(
        "$search", "{",
            "index", BCON_UTF8("default"),
            "text", "{",
                "path", BCON_UTF8("title"),
                "query", BCON_UTF8("automobile"),
                "synonyms", BCON_UTF8("transportSynonyms"),
            "}",
        "}"
    );
    bson_t *limit_stage = BCON_NEW("$limit", BCON_INT32(10));
    bson_t *project_stage = BCON_NEW(
        "$project", "{",
            "title", BCON_INT32(1),
            "_id", BCON_INT32(0),
            "score", "{",
                "$meta", BCON_UTF8("searchScore"),
            "}",
        "}"
    );

    /* Create the aggregation pipeline array properly */
    pipeline = bson_new();  // Create an empty array
    
    /* Append each stage directly to the pipeline array */
    char idx[16];
    const char *key;
    size_t idx_len;
    int i = 0;
    
    idx_len = bson_uint32_to_string(i, &key, idx, sizeof idx);
    bson_append_document(pipeline, key, idx_len, search_stage);
    i++;
    
    idx_len = bson_uint32_to_string(i, &key, idx, sizeof idx);
    bson_append_document(pipeline, key, idx_len, limit_stage);
    i++;
    
    idx_len = bson_uint32_to_string(i, &key, idx, sizeof idx);
    bson_append_document(pipeline, key, idx_len, project_stage);

    /* Set options (max time 5 seconds = 5000 ms) */
    mongoc_read_prefs_t *read_prefs = mongoc_read_prefs_new(MONGOC_READ_PRIMARY);
    mongoc_read_concern_t *read_concern = mongoc_read_concern_new();
    
    bson_t opts = BSON_INITIALIZER;
    bson_append_int32(&opts, "maxTimeMS", -1, 5000);

    /* Execute the aggregation */
    cursor = mongoc_collection_aggregate(
        collection,
        MONGOC_QUERY_NONE,
        pipeline,
        &opts,
        read_prefs
    );

    /* Display the results */
    while (mongoc_cursor_next(cursor, &doc)) {
        str = bson_as_canonical_extended_json(doc, NULL);
        printf("%s\n", str);
        bson_free(str);
    }

    /* Check if the cursor encountered any errors */
    if (mongoc_cursor_error(cursor, &error)) {
        fprintf(stderr, "Cursor Failure: %s\n", error.message);
        return EXIT_FAILURE;
    }

    /* Clean up */
    bson_destroy(search_stage);
    bson_destroy(limit_stage);
    bson_destroy(project_stage);
    bson_destroy(pipeline);
    bson_destroy(&opts);
    mongoc_read_prefs_destroy(read_prefs);
    mongoc_read_concern_destroy(read_concern);
    mongoc_cursor_destroy(cursor);
    mongoc_collection_destroy(collection);
    mongoc_client_destroy(client);
    mongoc_cleanup();

    return EXIT_SUCCESS;
}