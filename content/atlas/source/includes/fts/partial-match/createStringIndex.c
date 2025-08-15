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

int main(void) {
    mongoc_client_t *client;
    mongoc_database_t *database;
    mongoc_collection_t *collection;
    bson_t *index_spec;
    bson_error_t error;
    char *index_name;
    bool result;

    // Connect to MongoDB
    client = connect_to_mongodb();
    if (!client) {
        return EXIT_FAILURE;
    }

    printf("Connected to MongoDB Atlas\n");

    // Get database and collection
    database = mongoc_client_get_database(client, DATABASE_NAME);
    collection = mongoc_client_get_collection(client, DATABASE_NAME, COLLECTION_NAME);

    // Create the search index specification
    index_spec = bson_new();
    
    // Build the index definition
    bson_t *definition = bson_new();
    bson_t *mappings = bson_new();
    bson_t *fields = bson_new();
    bson_t *title_field = bson_new();
    
    // Configure title field for string search
    BSON_APPEND_UTF8(title_field, "type", "string");
    
    // Add title field to fields object
    BSON_APPEND_DOCUMENT(fields, "title", title_field);
    
    // Build mappings object
    BSON_APPEND_BOOL(mappings, "dynamic", false);
    BSON_APPEND_DOCUMENT(mappings, "fields", fields);
    
    // Add mappings to definition
    BSON_APPEND_DOCUMENT(definition, "mappings", mappings);
    
    // Build the complete index specification
    BSON_APPEND_UTF8(index_spec, "name", "partial-match-tutorial");
    BSON_APPEND_DOCUMENT(index_spec, "definition", definition);

    printf("Creating search index...\n");

    // Create the search index
    result = mongoc_collection_create_search_index(collection, index_spec, NULL, &index_name, &error);
    
    if (!result) {
        fprintf(stderr, "Failed to create search index: %s\n", error.message);
        bson_destroy(index_spec);
        bson_destroy(definition);
        bson_destroy(mappings);
        bson_destroy(fields);
        bson_destroy(title_field);
        mongoc_collection_destroy(collection);
        mongoc_database_destroy(database);
        cleanup_mongodb(client);
        return EXIT_FAILURE;
    }

    printf("New index name: %s\n", index_name);

    // Cleanup
    bson_free(index_name);
    bson_destroy(index_spec);
    bson_destroy(definition);
    bson_destroy(mappings);
    bson_destroy(fields);
    bson_destroy(title_field);
    mongoc_collection_destroy(collection);
    mongoc_database_destroy(database);
    cleanup_mongodb(client);

    printf("Successfully created string search index\n");
    return EXIT_SUCCESS;
}
