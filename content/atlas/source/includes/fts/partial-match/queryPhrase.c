#include <mongoc/mongoc.h>
#include <bson/bson.h>
#include <stdio.h>
#include <stdlib.h>

// MongoDB connection URI
#define MONGODB_URI "<connection-string>"

// Database and collection names
#define DATABASE_NAME "sample_mflix"
#define COLLECTION_NAME "movies"

mongoc_client_t* connect_to_mongodb(void) {
    mongoc_client_t *client;
    mongoc_uri_t *uri;
    bson_error_t error;

    // Initialize MongoDB C driver
    mongoc_init();

    // Create a MongoDB URI object
    uri = mongoc_uri_new_with_error(MONGODB_URI, &error);
    if (!uri) {
        fprintf(stderr, "Failed to parse URI: %s\n", error.message);
        return NULL;
    }

    // Create a new client instance
    client = mongoc_client_new_from_uri(uri);
    if (!client) {
        fprintf(stderr, "Failed to create MongoDB client\n");
        mongoc_uri_destroy(uri);
        return NULL;
    }

    // Configure the client for server API version
    mongoc_client_set_error_api(client, 2);
    
    mongoc_uri_destroy(uri);
    return client;
}

void cleanup_mongodb(mongoc_client_t *client) {
    if (client) {
        mongoc_client_destroy(client);
    }
    mongoc_cleanup();
}

void print_bson_document(const bson_t *doc) {
    char *json_string = bson_as_canonical_extended_json(doc, NULL);
    printf("%s\n", json_string);
    bson_free(json_string);
}

int main(void) {
    mongoc_client_t *client;
    mongoc_database_t *database;
    mongoc_collection_t *collection;
    mongoc_cursor_t *cursor;
    bson_t *pipeline;
    bson_t *search_stage;
    bson_t *project_stage;
    const bson_t *doc;
    bson_error_t error;

    // Connect to MongoDB
    client = connect_to_mongodb();
    if (!client) {
        return EXIT_FAILURE;
    }

    printf("Connected to MongoDB Atlas\n");

    // Get database and collection
    database = mongoc_client_get_database(client, DATABASE_NAME);
    collection = mongoc_client_get_collection(client, DATABASE_NAME, COLLECTION_NAME);

    // Create aggregation pipeline
    pipeline = bson_new();
    
    // Create $search stage
    search_stage = bson_new();
    bson_t *search_spec = bson_new();
    bson_t *phrase_spec = bson_new();
    
    BSON_APPEND_UTF8(phrase_spec, "path", "plot");
    BSON_APPEND_UTF8(phrase_spec, "query", "new york");
    
    BSON_APPEND_UTF8(search_spec, "index", "partial-match-tutorial");
    BSON_APPEND_DOCUMENT(search_spec, "phrase", phrase_spec);
    
    BSON_APPEND_DOCUMENT(search_stage, "$search", search_spec);
    
    // Create $project stage
    project_stage = bson_new();
    bson_t *project_spec = bson_new();
    BSON_APPEND_INT32(project_spec, "_id", 0);
    BSON_APPEND_INT32(project_spec, "title", 1);
    BSON_APPEND_DOCUMENT(project_stage, "$project", project_spec);
    
    // Build the pipeline array
    bson_t *stage_array = bson_new();
    BSON_APPEND_DOCUMENT(stage_array, "0", search_stage);
    BSON_APPEND_DOCUMENT(stage_array, "1", project_stage);
    
    BSON_APPEND_ARRAY(pipeline, "pipeline", stage_array);

    printf("Running phrase search query...\n");

    // Execute the aggregation
    cursor = mongoc_collection_aggregate(collection, MONGOC_QUERY_NONE, pipeline, NULL, NULL);
    
    if (!cursor) {
        fprintf(stderr, "Failed to execute aggregation\n");
        goto cleanup;
    }

    printf("Results:\n");
    
    // Iterate through results
    while (mongoc_cursor_next(cursor, &doc)) {
        print_bson_document(doc);
    }

    // Check for errors
    if (mongoc_cursor_error(cursor, &error)) {
        fprintf(stderr, "Cursor error: %s\n", error.message);
    }

cleanup:
    // Cleanup
    if (cursor) {
        mongoc_cursor_destroy(cursor);
    }
    bson_destroy(pipeline);
    bson_destroy(search_stage);
    bson_destroy(project_stage);
    bson_destroy(search_spec);
    bson_destroy(phrase_spec);
    bson_destroy(project_spec);
    bson_destroy(stage_array);
    mongoc_collection_destroy(collection);
    mongoc_database_destroy(database);
    cleanup_mongodb(client);

    printf("Phrase query completed\n");
    return EXIT_SUCCESS;
}
