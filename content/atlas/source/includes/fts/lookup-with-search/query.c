#include <mongoc/mongoc.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
    mongoc_client_t *client;
    mongoc_collection_t *collection;
    mongoc_cursor_t *cursor;
    bson_error_t error;
    bson_t *pipeline;
    bson_t *lookup;
    bson_t *lookup_pipeline;
    bson_t *search;
    bson_t *compound;
    bson_t *must_array;
    bson_t *should_array;
    bson_t *query_string;
    bson_t *range;
    bson_t *limit_stage;
    bson_t *project_stage;
    const bson_t *doc;
    char *str;

    /* Initialize the MongoDB C Driver. */
    mongoc_init();

    /* Connect to your MongoDB deployment. */
    client = mongoc_client_new("<connection-string>");
    collection = mongoc_client_get_collection(client, "sample_analytics", "customers");

    if (!client) {
        fprintf(stderr, "Failed to create client.\n");
        return 1;
    }

    /* Build the aggregation pipeline */
    pipeline = bson_new();
    
    /* Create the $lookup stage */
    lookup = BCON_NEW("$lookup", "{",
        "from", BCON_UTF8("accounts"),
        "localField", BCON_UTF8("accounts"),
        "foreignField", BCON_UTF8("account_id"),
        "as", BCON_UTF8("purchases"),
        "pipeline", "[",
            /* First stage in lookup pipeline: $search */
            "{",
                "$search", "{",
                    "index", BCON_UTF8("lookup-with-search-tutorial"),
                    "compound", "{",
                        "must", "[",
                            "{",
                                "queryString", "{",
                                    "defaultPath", BCON_UTF8("products"),
                                    "query", BCON_UTF8("products: (CurrencyService AND InvestmentStock)"),
                                "}",
                            "}",
                        "]",
                        "should", "[",
                            "{",
                                "range", "{",
                                    "path", BCON_UTF8("limit"),
                                    "gte", BCON_INT64(5000),
                                    "lte", BCON_INT64(10000),
                                "}",
                            "}",
                        "]",
                    "}",
                "}",
            "}",
            /* $limit stage in lookup pipeline */
            "{",
                "$limit", BCON_INT64(5),
            "}",
            /* $project stage in lookup pipeline */
            "{",
                "$project", "{",
                    "_id", BCON_INT32(0),
                    "address", BCON_INT32(0),
                    "birthdate", BCON_INT32(0),
                    "username", BCON_INT32(0),
                    "tier_and_details", BCON_INT32(0),
                "}",
            "}",
        "]",
    "}");
    
    bson_append_document(pipeline, "0", 1, lookup);
    
    /* $limit stage */
    limit_stage = BCON_NEW("$limit", BCON_INT64(5));
    bson_append_document(pipeline, "1", 1, limit_stage);
    
    /* $project stage */
    project_stage = BCON_NEW("$project", "{",
        "_id", BCON_INT32(0),
        "address", BCON_INT32(0),
        "birthdate", BCON_INT32(0),
        "username", BCON_INT32(0),
        "tier_and_details", BCON_INT32(0),
    "}");
    bson_append_document(pipeline, "2", 1, project_stage);

    /* Run the aggregation pipeline */
    cursor = mongoc_collection_aggregate(collection, MONGOC_QUERY_NONE, pipeline, NULL, NULL);

    /* Print the results */
    while (mongoc_cursor_next(cursor, &doc)) {
        str = bson_as_canonical_extended_json(doc, NULL);
        printf("%s\n", str);
        bson_free(str);
    }

    if (mongoc_cursor_error(cursor, &error)) {
        fprintf(stderr, "Cursor Failure: %s\n", error.message);
    }

    /* Clean up. */
    bson_destroy(lookup);
    bson_destroy(limit_stage);
    bson_destroy(project_stage);
    bson_destroy(pipeline);
    mongoc_cursor_destroy(cursor);
    mongoc_collection_destroy(collection);
    mongoc_client_destroy(client);
    mongoc_cleanup();

    return 0;
}