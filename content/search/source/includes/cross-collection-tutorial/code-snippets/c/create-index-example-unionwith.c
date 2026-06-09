#include <mongoc/mongoc.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
    mongoc_client_t *client;
    mongoc_collection_t *collection1;
    mongoc_collection_t *collection2;
    bson_error_t error;
    bson_t cmd1;
    bson_t cmd2;
    bson_t *index_definition;
    bool success;

    /* Initialize the MongoDB C Driver. */
    mongoc_init();

    /* Connect to your MongoDB deployment. */
    client = mongoc_client_new("<connection-string>");
    collection1 = mongoc_client_get_collection (client, "sample_training", "companies");
    collection2 = mongoc_client_get_collection (client, "sample_training", "inspections");

    if (!client) {
        fprintf(stderr, "Failed to create client.\n");
        return 1;
    }

    /* Create the MongoDB Search index definitions. */
    char *cmd_str1 = bson_strdup_printf (
        BSON_STR ({
            "createSearchIndexes": "%s",
            "indexes": [{
                "name": "default",
                "definition": {
                    "mappings": {
                        "dynamic": true
                    }
                }
            }]
        }),
        "companies"
    );
    char *cmd_str2 = bson_strdup_printf (
        BSON_STR ({
            "createSearchIndexes": "%s",
            "indexes": [{
                "name": "default",
                "definition": {
                    "mappings": {
                        "dynamic": true
                    }
                }
            }]
        }),
        "inspections"
    );

    bson_init_from_json (&cmd1, cmd_str1, -1, &error);
    bson_init_from_json (&cmd2, cmd_str2, -1, &error);
    bson_free (cmd_str1);
    bson_free (cmd_str2);

    if (mongoc_collection_command_simple (collection1, &cmd1, NULL, NULL, &error)) {
        printf ("Index created on the companies collection!\n");
    } else {
        fprintf (stderr, "Failed to create search index: %s", error.message);
    }

    if (mongoc_collection_command_simple (collection2, &cmd2, NULL, NULL, &error)) {
        printf ("Index created on the inspections collection!\n");
    } else {
        fprintf (stderr, "Failed to create search index: %s", error.message);
    }

    /* Clean up. */
    bson_destroy (&cmd1);
    bson_destroy (&cmd2);
    mongoc_collection_destroy (collection1);
    mongoc_collection_destroy (collection2);
    mongoc_client_destroy(client);
    mongoc_cleanup();

    return 0;
}