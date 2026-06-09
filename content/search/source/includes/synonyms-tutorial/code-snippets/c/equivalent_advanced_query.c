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

    /* Create the first text search clause for automobile */
    bson_t *text1 = BCON_NEW(
        "text", "{",
            "path", BCON_UTF8("title"),
            "query", BCON_UTF8("automobile"),
            "synonyms", BCON_UTF8("transportSynonyms"),
        "}"
    );

    /* Create the second text search clause for attire */
    bson_t *text2 = BCON_NEW(
        "text", "{",
            "path", BCON_UTF8("title"),
            "query", BCON_UTF8("attire"),
            "synonyms", BCON_UTF8("attireSynonyms"),
        "}"
    );

    /* Create the should array for compound search */
    bson_t *should_array = bson_new();
    char idx[16];
    const char *key;
    size_t idx_len;

    /* Add the text searches to the should array */
    idx_len = bson_uint32_to_string(0, &key, idx, sizeof(idx));
    bson_append_document(should_array, key, idx_len, text1);

    idx_len = bson_uint32_to_string(1, &key, idx, sizeof(idx));
    bson_append_document(should_array, key, idx_len, text2);

    /* Create the search stage directly with the should array */
    bson_t *search_stage = bson_new();
    bson_t search_doc, compound_doc;
    BSON_APPEND_DOCUMENT_BEGIN(search_stage, "$search", &search_doc);
    BSON_APPEND_UTF8(&search_doc, "index", "default");
    BSON_APPEND_DOCUMENT_BEGIN(&search_doc, "compound", &compound_doc);
    BSON_APPEND_ARRAY(&compound_doc, "should", should_array);
    bson_append_document_end(&search_doc, &compound_doc);
    bson_append_document_end(search_stage, &search_doc);

    /* Create the limit and project stages */
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

    /* Create the aggregation pipeline array */
    pipeline = bson_new();
    int i = 0;
    
    /* Add each stage to the pipeline array */
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
    bson_destroy(text1);
    bson_destroy(text2);
    bson_destroy(should_array);
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