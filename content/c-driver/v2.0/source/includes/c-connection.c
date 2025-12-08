#include <mongoc/mongoc.h>

int main(void) {
    bson_error_t error = {0};
    bson_t reply = BSON_INITIALIZER;
    int rc = 0;
    bool ok = true;

    // Initialize the MongoDB C Driver.
    mongoc_init();

    mongoc_client_t *client = mongoc_client_new("<connection string>");
    if (!client) {
        fprintf(stderr, "Failed to create a MongoDB client.\n");
        rc = 1;
        goto cleanup;
    }

    // Set the version of the Stable API on the client.
    mongoc_server_api_t *api = mongoc_server_api_new(MONGOC_SERVER_API_V1);
    if (!api) {
        fprintf(stderr, "Failed to create a MongoDB server API.\n");
        rc = 1;
        goto cleanup;
    }

    ok = mongoc_client_set_server_api(client, api, &error);
    if (!ok) {
        fprintf(stderr, "error: %s\n", error.message);
        rc = 1;
        goto cleanup;
    }

    // Get a handle on the "admin" database.
    mongoc_database_t *database = mongoc_client_get_database(client, "admin");
    if (!database) {
        fprintf(stderr, "Failed to get a MongoDB database handle.\n");
        rc = 1;
        goto cleanup;
    }

    // Ping the database.
    bson_t *command = BCON_NEW("ping", BCON_INT32(1));
    ok = mongoc_database_command_simple(
        database, command, NULL, &reply, &error
    );
    if (!ok) {
        fprintf(stderr, "error: %s\n", error.message);
        rc = 1;
        goto cleanup;
    }
    bson_destroy(&reply);

    printf("Pinged your deployment. You successfully connected to MongoDB!\n");

// Perform cleanup.
cleanup:
    bson_destroy(command);
    mongoc_database_destroy(database);
    mongoc_server_api_destroy(api);
    mongoc_client_destroy(client);
    mongoc_cleanup();

    return rc;
}