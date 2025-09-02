#include <mongoc/mongoc.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

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

    /* Create the $search stage with facet */
    bson_t *search_stage = bson_new();
    bson_t search_doc, facet_doc, operator_doc, near_doc, facets_doc;
    bson_t genres_facet_doc, year_facet_doc;
    bson_t boundaries_array;
    
    /* Build the $search stage */
    BSON_APPEND_DOCUMENT_BEGIN(search_stage, "$search", &search_doc);
    BSON_APPEND_UTF8(&search_doc, "index", "facet-tutorial");
    
    /* Build the facet object */
    BSON_APPEND_DOCUMENT_BEGIN(&search_doc, "facet", &facet_doc);
    
    /* Build the operator object with near */
    BSON_APPEND_DOCUMENT_BEGIN(&facet_doc, "operator", &operator_doc);
    BSON_APPEND_DOCUMENT_BEGIN(&operator_doc, "near", &near_doc);
    BSON_APPEND_UTF8(&near_doc, "path", "released");
    
    /* Create a date for November 1, 1921 */
    bson_t origin_date;
    bson_append_date_time(&near_doc, "origin", -1, 
                          (int64_t)((1921 - 1970) * 365.25 * 24 * 60 * 60 * 1000) + 
                          (int64_t)((10) * 30.44 * 24 * 60 * 60 * 1000) + /* month is 0-based, so 10 = November */
                          (int64_t)(24 * 60 * 60 * 1000)); /* day 1 */
    
    BSON_APPEND_INT64(&near_doc, "pivot", 7776000000);
    bson_append_document_end(&operator_doc, &near_doc);
    bson_append_document_end(&facet_doc, &operator_doc);
    
    /* Build the facets object */
    BSON_APPEND_DOCUMENT_BEGIN(&facet_doc, "facets", &facets_doc);
    
    /* Add genres facet */
    BSON_APPEND_DOCUMENT_BEGIN(&facets_doc, "genresFacet", &genres_facet_doc);
    BSON_APPEND_UTF8(&genres_facet_doc, "path", "genres");
    BSON_APPEND_UTF8(&genres_facet_doc, "type", "string");
    bson_append_document_end(&facets_doc, &genres_facet_doc);
    
    /* Add year facet with boundaries */
    BSON_APPEND_DOCUMENT_BEGIN(&facets_doc, "yearFacet", &year_facet_doc);
    BSON_APPEND_UTF8(&year_facet_doc, "path", "year");
    BSON_APPEND_UTF8(&year_facet_doc, "type", "number");
    
    /* Create the boundaries array */
    BSON_APPEND_ARRAY_BEGIN(&year_facet_doc, "boundaries", &boundaries_array);
    char idx[16];
    const char *key;
    size_t idx_len;
    
    idx_len = bson_uint32_to_string(0, &key, idx, sizeof idx);
    bson_append_int32(&boundaries_array, key, idx_len, 1910);
    
    idx_len = bson_uint32_to_string(1, &key, idx, sizeof idx);
    bson_append_int32(&boundaries_array, key, idx_len, 1920);
    
    idx_len = bson_uint32_to_string(2, &key, idx, sizeof idx);
    bson_append_int32(&boundaries_array, key, idx_len, 1930);
    
    idx_len = bson_uint32_to_string(3, &key, idx, sizeof idx);
    bson_append_int32(&boundaries_array, key, idx_len, 1940);
    
    bson_append_array_end(&year_facet_doc, &boundaries_array);
    bson_append_document_end(&facets_doc, &year_facet_doc);
    
    bson_append_document_end(&facet_doc, &facets_doc);
    bson_append_document_end(&search_doc, &facet_doc);
    bson_append_document_end(search_stage, &search_doc);

    /* Create the $facet stage */
    bson_t *facet_stage = bson_new();
    bson_t facet_stage_doc, meta_array;
    bson_t replace_with_doc, limit_doc;
    
    BSON_APPEND_DOCUMENT_BEGIN(facet_stage, "$facet", &facet_stage_doc);
    BSON_APPEND_ARRAY_BEGIN(&facet_stage_doc, "meta", &meta_array);
    
    idx_len = bson_uint32_to_string(0, &key, idx, sizeof idx);
    BSON_APPEND_DOCUMENT_BEGIN(&meta_array, key, &replace_with_doc);
    BSON_APPEND_UTF8(&replace_with_doc, "$replaceWith", "$$SEARCH_META");
    bson_append_document_end(&meta_array, &replace_with_doc);
    
    idx_len = bson_uint32_to_string(1, &key, idx, sizeof idx);
    BSON_APPEND_DOCUMENT_BEGIN(&meta_array, key, &limit_doc);
    BSON_APPEND_INT32(&limit_doc, "$limit", 1);
    bson_append_document_end(&meta_array, &limit_doc);
    
    bson_append_array_end(&facet_stage_doc, &meta_array);
    bson_append_document_end(facet_stage, &facet_stage_doc);

    /* Create the $set stage */
    bson_t *set_stage = bson_new();
    bson_t set_doc, meta_doc, array_elem_at_doc;
    
    BSON_APPEND_DOCUMENT_BEGIN(set_stage, "$set", &set_doc);
    BSON_APPEND_DOCUMENT_BEGIN(&set_doc, "meta", &meta_doc);
    BSON_APPEND_ARRAY_BEGIN(&meta_doc, "$arrayElemAt", &array_elem_at_doc);
    
    idx_len = bson_uint32_to_string(0, &key, idx, sizeof idx);
    BSON_APPEND_UTF8(&array_elem_at_doc, key, "$meta");
    
    idx_len = bson_uint32_to_string(1, &key, idx, sizeof idx);
    BSON_APPEND_INT32(&array_elem_at_doc, key, 0);
    
    bson_append_array_end(&meta_doc, &array_elem_at_doc);
    bson_append_document_end(&set_doc, &meta_doc);
    bson_append_document_end(set_stage, &set_doc);

    /* Create the aggregation pipeline array */
    pipeline = bson_new();
    int i = 0;
    
    /* Add each stage to the pipeline array */
    idx_len = bson_uint32_to_string(i, &key, idx, sizeof idx);
    bson_append_document(pipeline, key, idx_len, search_stage);
    i++;
    
    idx_len = bson_uint32_to_string(i, &key, idx, sizeof idx);
    bson_append_document(pipeline, key, idx_len, facet_stage);
    i++;
    
    idx_len = bson_uint32_to_string(i, &key, idx, sizeof idx);
    bson_append_document(pipeline, key, idx_len, set_stage);

    /* Set options (max time 5 seconds = 5000 ms) */
    mongoc_read_prefs_t *read_prefs = mongoc_read_prefs_new(MONGOC_READ_PRIMARY);
    
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
    bson_destroy(facet_stage);
    bson_destroy(set_stage);
    bson_destroy(pipeline);
    bson_destroy(&opts);
    mongoc_read_prefs_destroy(read_prefs);
    mongoc_cursor_destroy(cursor);
    mongoc_collection_destroy(collection);
    mongoc_client_destroy(client);
    mongoc_cleanup();

    return EXIT_SUCCESS;
}