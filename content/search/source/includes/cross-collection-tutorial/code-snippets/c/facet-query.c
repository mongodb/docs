#include <mongoc/mongoc.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
    mongoc_client_t *client;
    mongoc_collection_t *collection;
    mongoc_cursor_t *cursor;
    bson_error_t error;
    bson_t *pipeline;
    const bson_t *doc;
    char *str;

    /* Initialize the MongoDB C Driver. */
    mongoc_init();

    /* Connect to your MongoDB deployment. */
    client = mongoc_client_new("<connection-string>");
    collection = mongoc_client_get_collection(client, "sample_training", "companies");

    if (!client) {
        fprintf(stderr, "Failed to create client.\n");
        return 1;
    }

    /* Build the aggregation pipeline */
    pipeline = BCON_NEW (
        "pipeline", "[",
            "{",
                "$search", "{",
                    "text", "{",
                        "query", "Mobile",
                        "path", "name",
                        "score", "{", 
                            "boost", "{", 
                                "value", BCON_DOUBLE(1.6),
                            "}",
                        "}",
                    "}",
                "}",
            "}",
            "{",
                "$project", "{",
                    "score", "{", "$meta", "searchScore", "}",
                    "_id", BCON_INT32(0),
                    "number_of_employees", BCON_INT32(1),
                    "founded_year", BCON_INT32(1),
                    "name", BCON_INT32(1),
                "}",
            "}",
            "{",
                "$addFields", "{",
                    "source", "companies",
                    "source_count", "$$SEARCH_META.count.lowerBound",
                "}",
            "}",
            "{",
                "$limit", BCON_INT32(3),
            "}",
            "{",
                "$unionWith", "{",
                    "coll", "inspections",
                    "pipeline", "[",
                        "{",
                            "$search", "{",
                                "text", "{",
                                    "query", "mobile",
                                    "path", "business_name",
                                "}",
                            "}",
                        "}",
                        "{",
                            "$project", "{",
                                "score", "{", "$meta", "searchScore", "}",
                                "business_name", BCON_INT32(1),
                                "address", BCON_INT32(1),
                                "_id", BCON_INT32(0),
                            "}",
                        "}",
                        "{",
                            "$limit", BCON_INT32(3),
                        "}",
                        "{",
                            "$set", "{",
                                "source", "inspections",
                                "source_count", "$$SEARCH_META.count.lowerBound",
                            "}",
                        "}",
                        "{",
                            "$sort", "{",
                                "score", BCON_INT32(-1),
                            "}",
                        "}",
                    "]",
                "}",
            "}",
            "{",
                "$facet", "{",
                    "allDocs", "[", "]",
                    "totalCount", "[",
                        "{",
                            "$group", "{",
                                "_id", "$source",
                                "firstCount", "{", "$first", "$source_count", "}",
                            "}",
                        "}",
                        "{",
                            "$project", "{",
                                "totalCount", "{", "$sum", "$firstCount", "}",
                            "}",
                        "}",
                    "]",
                "}",
            "}",
        "]"
    );

    /* Run the aggregation pipeline */
    cursor = mongoc_collection_aggregate(
        collection, MONGOC_QUERY_NONE, pipeline, NULL, NULL);

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
    bson_destroy(pipeline);
    mongoc_cursor_destroy(cursor);
    mongoc_collection_destroy(collection);
    mongoc_client_destroy(client);
    mongoc_cleanup();

    return 0;
}
