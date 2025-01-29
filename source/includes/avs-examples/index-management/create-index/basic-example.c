#include <bson/bson.h>
#include <mongoc/mongoc.h>
#include <stdio.h>

int main(void) {
  mongoc_client_t *client;
  mongoc_collection_t *collection;
  bson_error_t error;
  char database_name[] = "sample_mflix";
  char collection_name[] = "embedded_movies";
  char index_name[] = "vector_index";

  mongoc_init();

  // Replace the placeholder with your Atlas connection string
  client =  mongoc_client_new("<connection-string>");

  // Connect to your Atlas cluster
  collection = mongoc_client_get_collection (client, database_name, collection_name);

  bson_t cmd;
  // Create search index command.
  {
    char *cmd_str = bson_strdup_printf (
        BSON_STR ({
                    "createSearchIndexes" : "%s",
                    "indexes" : [{
                      "definition": {
                        "fields": [{
                          "type": "vector",
                          "path": "plot_embedding",
                          "numDimensions": 1536,
                          "similarity": "dotProduct",
                          "quantization": "scalar"
                        }]
                      },
                      "name": "%s",
                      "type": "vectorSearch"
                    }]
                  }),
        collection_name, index_name);
    if (!bson_init_from_json(&cmd, cmd_str, -1, &error)) {
      printf("Failed to initialize BSON: %s\n", error.message);
      bson_free(cmd_str);
      return 1;
    }
    bson_free (cmd_str);
  }
  if (!mongoc_collection_command_simple (collection, &cmd, NULL /* read_prefs */, NULL /* reply */, &error)) {
    bson_destroy (&cmd);
    printf ("Failed to run createSearchIndexes: %s", error.message);
    return 1;
  } else {
    printf ("New search index named %s is building.\n", index_name);
    bson_destroy (&cmd);
  }

  // Polling for index status
  printf("Polling to check if the index is ready. This may take up to a minute.\n");
  int queryable = 0;
  while (!queryable) {
    const char *pipeline_str = "{\"pipeline\": [{\"$listSearchIndexes\": {}}]}";
    bson_t pipeline;
    if (!bson_init_from_json(&pipeline, pipeline_str, -1, &error)) {
      printf("Failed to initialize pipeline BSON: %s\n", error.message);
      break; // Exit the loop on error
    }
    mongoc_cursor_t *cursor = mongoc_collection_aggregate(collection, MONGOC_QUERY_NONE, &pipeline, NULL, NULL);
    const bson_t *got;
    // Check if the cursor returns any documents
    int found_index = 0;
    while (mongoc_cursor_next(cursor, &got)) {
      bson_iter_t iter;
      if (bson_iter_init(&iter, got) && bson_iter_find(&iter, "name")) {
        const char *name = bson_iter_utf8(&iter, NULL);
        if (strcmp(name, index_name) == 0) {
          found_index = 1; // Index found
          bson_iter_find(&iter, "queryable");
          queryable = bson_iter_bool(&iter);
          break; // Exit the loop since we found the index
        }
      }
    }
    if (mongoc_cursor_error(cursor, &error)) {
      printf("Failed to run $listSearchIndexes: %s\n", error.message);
      break; // Exit the loop on error
    }
    if (!found_index) {
      printf("Index %s not found yet. Retrying...\n", index_name);
    }
    bson_destroy(&pipeline);
    mongoc_cursor_destroy(cursor);
    sleep(5); // Sleep for 5 seconds before checking again
  }
  if (queryable) {
    printf("%s is ready for querying.\n", index_name);
  } else {
    printf("Error occurred or index not found.\n");
  }

  // Cleanup
  mongoc_collection_destroy(collection);
  mongoc_client_destroy(client);
  mongoc_cleanup();

  return 0;
}