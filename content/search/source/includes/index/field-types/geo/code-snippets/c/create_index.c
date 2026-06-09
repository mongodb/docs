#include <mongoc/mongoc.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
    mongoc_client_t *client;
    mongoc_collection_t *collection;
    bson_error_t error;
    bson_t cmd;
    bson_t *index_definition;
    bool success;

    /* Initialize the MongoDB C Driver. */
    mongoc_init();

    /* Connect to your MongoDB deployment. */
    client = mongoc_client_new("<connection-string>");
    collection = mongoc_client_get_collection (client, "<database>", "<collection>");

    if (!client) {
        fprintf(stderr, "Failed to create client.\n");
        return 1;
    }

    /* Create the MongoDB Search index definition for the geo field. */
    char *cmd_str = bson_strdup_printf (
        BSON_STR ({
            "createSearchIndexes": "%s",
            "indexes": [{
                "name": "default",
                "definition": {
                    "mappings": {
                        "dynamic": true|false,
                        "fields": {
                            "<field-name>": {
                                "type": "geo",
                                "indexShapes": true|false
                            }
                        }
                    }
                }
            }]
        }),
        "<collection>"
    );
    bson_init_from_json (&cmd, cmd_str, -1, &error);
    bson_free (cmd_str);

    if (mongoc_collection_command_simple (collection, &cmd, NULL, NULL, &error)) {
        printf ("Index created!\n");
    } else {
        fprintf (stderr, "Failed to create search index: %s", error.message);
    }

    /* Clean up. */
    bson_destroy (&cmd);
    mongoc_collection_destroy (collection);
    mongoc_client_destroy(client);
    mongoc_cleanup();

    return 0;
}