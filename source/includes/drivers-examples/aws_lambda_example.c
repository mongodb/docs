#include <mongoc/mongoc.h>

void lambda_handler ()
{
    bson_error_t error;

    mongoc_init();

    // Parse URI
    char *uri_string = "your-mongodb-atlas-connection-string";    
    mongoc_uri_t *uri = mongoc_uri_new_with_error (uri_string, &error);
    if (!uri) {
        fprintf (stderr, "Failed to parse URI: %s\n", error.message);
        return;
    }
    
    // Create client
    mongoc_client_t *client = mongoc_client_new_from_uri_with_error(uri, &error);
    if (!client) {
        fprintf(stderr, "Failed to create client: %s\n", error.message);
        return;
    }

    // Perform client operations here

    // Cleanup
    mongoc_client_destroy(client);
    mongoc_uri_destroy (uri);
    mongoc_cleanup();
}