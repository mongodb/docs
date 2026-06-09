#include <mongoc/mongoc.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
    mongoc_client_t *client;
    mongoc_collection_t *collection;
    mongoc_cursor_t *cursor;
    bson_error_t error;
    bson_t *pipeline;
    bson_t *search_stage;
    bson_t *count_stage;
    const bson_t *doc;
    char *str;

    /* Initialize the MongoDB C Driver. */
    mongoc_init();

    /* Connect to your MongoDB deployment. */
    client = mongoc_client_new("<connection-string>");
    collection = mongoc_client_get_collection(client, "sample_supplies", "monthlyPhoneTransactions");

    if (!client) {
        fprintf(stderr, "Failed to create client.\n");
        return 1;
    }

    /* Build the aggregation pipeline */
    pipeline = bson_new();
    
    /* Create the $search stage */
    search_stage = BCON_NEW("$search", "{",
        "index", BCON_UTF8("monthlySalesIndex"),
        "range", "{",
            "gt", BCON_INT64(10000),
            "path", "[", BCON_UTF8("sales_price"), "]",
        "}",
    "}");
    
    bson_append_document(pipeline, "0", 1, search_stage);
    
    /* $count stage */
    count_stage = BCON_NEW("$count", BCON_UTF8("months_w_over_10000"));
    bson_append_document(pipeline, "1", 1, count_stage);

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
    bson_destroy(search_stage);
    bson_destroy(count_stage);
    bson_destroy(pipeline);
    mongoc_cursor_destroy(cursor);
    mongoc_collection_destroy(collection);
    mongoc_client_destroy(client);
    mongoc_cleanup();

    return 0;
}
