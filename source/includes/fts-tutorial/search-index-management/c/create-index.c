#include <mongoc/mongoc.h>
#include <stdlib.h>

int main (void)
{
    mongoc_client_t *client = NULL;
    mongoc_collection_t *collection = NULL;
    mongoc_database_t *database = NULL;
    bson_error_t error;
    bson_t cmd = BSON_INITIALIZER;
    bool ok = true;

    mongoc_init();

    // Connect to your Atlas deployment
    client = mongoc_client_new("<connectionString>");
    if (!client) {
        fprintf(stderr, "Failed to create a MongoDB client.\n");
        ok = false;
        goto cleanup;
    }

    // Access your database and collection
    database = mongoc_client_get_database(client, "<databaseName>");
    collection = mongoc_database_get_collection(database, "<collectionName>");

    // Specify the command and the new index
    const char *cmd_str = BSON_STR({
        "createSearchIndexes" : "<collectionName>",
        "indexes" : [ {
            "definition" : {"mappings" : {"dynamic" : true}},
            "name" : "<indexName>"
	    } ]
	});

    // Convert your command to BSON
    if (!bson_init_from_json(&cmd, cmd_str, -1, &error)) {
        fprintf(stderr, "Failed to parse command: %s\n", error.message);
        ok = false;
        goto cleanup;
    }

    // Create the Atlas search index by running the command
    if (!mongoc_collection_command_simple (collection, &cmd, NULL, NULL, &error)) {
        fprintf(stderr, "Failed to run createSearchIndexes: %s\n", error.message);
        ok = false;
        goto cleanup;
    }
    printf ("Index created!\n");

cleanup:
   mongoc_collection_destroy (collection);
   mongoc_client_destroy (client);
   mongoc_database_destroy (database);
   bson_destroy (&cmd);
   mongoc_cleanup ();
   return ok ? EXIT_SUCCESS : EXIT_FAILURE;
}