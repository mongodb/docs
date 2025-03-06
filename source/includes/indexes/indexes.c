#include <bson/bson.h>
#include <mongoc/mongoc.h>
#include <stdio.h>

int
main (void)
{
    mongoc_client_t *client;
    mongoc_collection_t *collection;

    mongoc_init ();

    client = mongoc_client_new ("<connection string URI>");
    collection = mongoc_client_get_collection (client, "sample_mflix", "movies");

    {
        // start-remove-index
        bson_error_t error;

        if (mongoc_collection_drop_index (collection, "_title_", &error)) {
            printf ("Successfully dropped index\n");
        } else {
            fprintf (stderr, "Failed to drop index: %s", error.message);
        }
        // end-remove-index
    }
    {
        // start-index-single
        bson_error_t error;
        bson_t *keys = BCON_NEW ("title", BCON_INT32 (1));
        mongoc_index_model_t *index_model = mongoc_index_model_new (keys, NULL);

        if (mongoc_collection_create_indexes_with_opts (collection, &index_model, 1, NULL, NULL, &error)) {
            printf ("Successfully created index\n");
        } else {
            fprintf (stderr, "Failed to create index: %s", error.message);
        }

        bson_destroy (keys);
        mongoc_index_model_destroy (index_model);
        // end-index-single
    }
    {
        // start-index-single-query
        const bson_t *doc;
        bson_t *filter = BCON_NEW ("title", "Batman");

        mongoc_cursor_t *results =
            mongoc_collection_find_with_opts (collection, filter, NULL, NULL);
        
        while (mongoc_cursor_next (results, &doc)) {
            char *str = bson_as_canonical_extended_json (doc, NULL);
            printf ("%s\n", str);
            bson_free (str);
        }

        mongoc_cursor_destroy (results);
        bson_destroy (filter);
        // end-index-single-query
    }
    {
        // start-index-compound
        bson_error_t error;
        bson_t *keys = BCON_NEW ("type", BCON_INT32 (1), "genres", BCON_INT32 (1));
        mongoc_index_model_t *index_model = mongoc_index_model_new (keys, NULL);

        if (mongoc_collection_create_indexes_with_opts (collection, &index_model, 1, NULL, NULL, &error)) {
            printf ("Successfully created index\n");
        } else {
            fprintf (stderr, "Failed to create index: %s", error.message);
        }

        bson_destroy (keys);
        mongoc_index_model_destroy (index_model);
        // end-index-compound
    }
    {
        // start-index-compound-query
        const bson_t *doc;
        bson_t *filter = BCON_NEW ("type", BCON_UTF8 ("movie"),
                                   "genres", BCON_UTF8 ("Drama"));

        mongoc_cursor_t *results =
            mongoc_collection_find_with_opts (collection, filter, NULL, NULL);
        
        while (mongoc_cursor_next (results, &doc)) {
            char *str = bson_as_canonical_extended_json (doc, NULL);
            printf ("%s\n", str);
            bson_free (str);
        }

        mongoc_cursor_destroy (results);
        bson_destroy (filter);
        // end-index-compound-query
    }
    {
        // start-index-multikey
        bson_error_t error;
        bson_t *keys = BCON_NEW ("cast", BCON_INT32 (1));
        mongoc_index_model_t *index_model = mongoc_index_model_new (keys, NULL);

        if (mongoc_collection_create_indexes_with_opts (collection, &index_model, 1, NULL, NULL, &error)) {
            printf ("Successfully created index\n");
        } else {
            fprintf (stderr, "Failed to create index: %s", error.message);
        }

        bson_destroy (keys);
        mongoc_index_model_destroy (index_model);
        // end-index-multikey
    }
    {
        // start-index-multikey-query
        const bson_t *doc;
        bson_t *filter = BCON_NEW ("cast", BCON_UTF8 ("Viola Davis"));

        mongoc_cursor_t *results =
            mongoc_collection_find_with_opts (collection, filter, NULL, NULL);
        
        while (mongoc_cursor_next (results, &doc)) {
            char *str = bson_as_canonical_extended_json (doc, NULL);
            printf ("%s\n", str);
            bson_free (str);
        }

        mongoc_cursor_destroy (results);
        bson_destroy (filter);
        // end-index-multikey-query
    }
    {
        // start-create-search-index
        bson_t cmd;
        bson_error_t error;
        char *cmd_str = bson_strdup_printf (
            BSON_STR ({
                "createSearchIndexes" : "%s",
                "indexes" : [ {"definition" : {"mappings" : {"dynamic" : false}}, "name" : "<index name>"} ]
            }),
            "<collection name>");
        bson_init_from_json (&cmd, cmd_str, -1, &error);
        bson_free (cmd_str);

        if (mongoc_collection_command_simple (collection, &cmd, NULL, NULL, &error)) {
            printf ("Successfully created search index\n");
        } else {
            fprintf (stderr, "Failed to create search index: %s", error.message);
        }
        bson_destroy (&cmd);
        // end-create-search-index
    }
    {
      // start-create-vector-search-index
      bson_t cmd;
      bson_error_t error;
      char * cmd_str = bson_strdup_printf(
        BSON_STR({
          "createSearchIndexes": "%s",
          "indexes": [{
            "name": "<index name>",
            "type": "vectorSearch",
            "definition": {
              "fields": [{
                "type": "vector",
                "path": "plot_embedding",
                "numDimensions": 1536,
                "similarity": "euclidean"
              }]
            }
          }]
        }),
        "<collection name>"
      );
      bson_init_from_json(&cmd, cmd_str, -1, &error);
      bson_free(cmd_str);

      if (mongoc_collection_command_simple(collection, &cmd, NULL, NULL, &error)) {
        printf("Successfully created Vector Search index\n");
      } else {
        fprintf(stderr, "Failed to create Vector Search index: %s", error.message);
      }
      bson_destroy(&cmd);
      // end-create-vector-search-index
    }
    {
      // start-create-search-indexes
      bson_t cmd;
      bson_error_t error;
      char * cmd_str = bson_strdup_printf(
        BSON_STR({
          "createSearchIndexes": "%s",
          "indexes": [{
              "definition": {
                "mappings": {
                  "dynamic": false
                }
              },
              "name": "<Atlas Search index name>"
            },
            {
              "name": "<Vector Search index name>",
              "type": "vectorSearch",
              "definition": {
                "fields": [{
                  "type": "vector",
                  "path": "plot_embedding",
                  "numDimensions": 1536,
                  "similarity": "euclidean"
                }]
              }
            }
          ]
        }),
        "<collection name>");
      bson_init_from_json(&cmd, cmd_str, -1, &error);
      bson_free(cmd_str);

      if (mongoc_collection_command_simple(collection, &cmd, NULL, NULL, &error)) {
        printf("Successfully created search indexes\n");
      } else {
        fprintf(stderr, "Failed to create search indexes: %s", error.message);
      }
      bson_destroy(&cmd);
      // end-create-search-indexes
    }
    {
        // start-list-search-indexes
        bson_t pipeline;
        const bson_t *doc;
        bson_error_t error;

        const char *pipeline_str = BSON_STR ({"pipeline" : [ {"$listSearchIndexes" : {}} ]});
        bson_init_from_json (&pipeline, pipeline_str, -1, &error);

        mongoc_cursor_t *cursor =
            mongoc_collection_aggregate (collection, MONGOC_QUERY_NONE, &pipeline, NULL, NULL);
        
        while (mongoc_cursor_next (cursor, &doc)) {
            char *str = bson_as_canonical_extended_json (doc, NULL);
            printf ("%s\n", str);
            bson_free (str);
        }
        
        bson_destroy (&pipeline);
        mongoc_cursor_destroy (cursor);
        // end-list-search-indexes
    }
    {
        // start-update-search-index
        bson_t cmd;
        bson_error_t error;
        char *cmd_str = bson_strdup_printf (
            BSON_STR ({
                "updateSearchIndex" : "%s",
                "definition" : {"mappings" : {"dynamic" : true}}, "name" : "<index name>"}),
            "<collection name>");
        bson_init_from_json (&cmd, cmd_str, -1, &error);
        bson_free (cmd_str);

        if (mongoc_collection_command_simple (collection, &cmd, NULL, NULL, &error)) {
            printf ("Successfully updated search index\n");
        } else {
            fprintf (stderr, "Failed to create search index: %s", error.message);
        }
        bson_destroy (&cmd);
        // end-update-search-index
    }
    {
        // start-update-vector-search-index
        bson_t cmd;
        bson_error_t error;
        char * cmd_str = bson_strdup_printf(
        BSON_STR({
            "updateSearchIndex": "%s",
            "name": "<index name>",
            "definition": {
            "fields": [{
                "type": "vector",
                "path": "plot_embedding",
                "numDimensions": 1536,
                "similarity": "cosine"
            }]
            }
        }),
        "<collection name>"
        );
        bson_init_from_json(&cmd, cmd_str, -1, &error);
        bson_free(cmd_str);

        if (mongoc_collection_command_simple(collection, &cmd, NULL, NULL, &error)) {
        printf("Successfully updated search index\n");
        } else {
        fprintf(stderr, "Failed to create search index: %s", error.message);
        }
        bson_destroy(&cmd);
        // end-update-vector-search-index
    }
    {
        // start-drop-search-index
        bson_t cmd;
        bson_error_t error;
        char *cmd_str = bson_strdup_printf (
            BSON_STR ({
                "dropSearchIndexes" : "%s",
                "index" : "<index name>"
            }),
            "<collection name>");
        bson_init_from_json (&cmd, cmd_str, -1, &error);

        if (mongoc_collection_command_simple (collection, &cmd, NULL, NULL, &error)) {
            printf ("Successfully deleted search index\n");
        } else {
            fprintf (stderr, "Failed to delete search index: %s", error.message);
        }
        bson_destroy (&cmd);
        // end-drop-search-index
    }

    mongoc_collection_destroy (collection);
    mongoc_client_destroy (client);
    mongoc_cleanup ();

    return EXIT_SUCCESS;
}
