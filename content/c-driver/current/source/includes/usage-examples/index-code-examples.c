#include <stdio.h>
#include <bson/bson.h>
#include <mongoc/mongoc.h>

int
main (void)
{
    mongoc_client_t *client;
    mongoc_collection_t *collection;
    mongoc_init ();

    client = mongoc_client_new ("<connection string URI>");
    collection = mongoc_client_get_collection (client, "sample_mflix", "movies");

    // Start example code here
    {
        // start-single-field
        bson_t *keys = BCON_NEW ("<field name>", BCON_INT32 (1));
        mongoc_index_model_t *index_model = mongoc_index_model_new (keys, NULL);

        if (mongoc_collection_create_indexes_with_opts (collection, &index_model, 1, NULL, NULL, &error)) {
            printf ("Successfully created index\n");
        } else {
            fprintf (stderr, "Failed to create index: %s", error.message);
        }

        bson_destroy (keys);
        mongoc_index_model_destroy (index_model);
        // end-single-field
    }
    {
        // start-compound
        bson_t *keys = BCON_NEW ("<field name 1>", BCON_INT32 (1), "<field name 2>", BCON_INT32 (1));
        mongoc_index_model_t *index_model = mongoc_index_model_new (keys, NULL);

        if (mongoc_collection_create_indexes_with_opts (collection, &index_model, 1, NULL, NULL, &error)) {
            printf ("Successfully created index\n");
        } else {
            fprintf (stderr, "Failed to create index: %s", error.message);
        }

        bson_destroy (keys);
        mongoc_index_model_destroy (index_model);
        // end-compound
    }
    {
        // start-multikey
        bson_t *keys = BCON_NEW ("<array field name>", BCON_INT32 (1));
        mongoc_index_model_t *index_model = mongoc_index_model_new (keys, NULL);

        if (mongoc_collection_create_indexes_with_opts (collection, &index_model, 1, NULL, NULL, &error)) {
            printf ("Successfully created index\n");
        } else {
            fprintf (stderr, "Failed to create index: %s", error.message);
        }

        bson_destroy (keys);
        mongoc_index_model_destroy (index_model);
        // end-multikey
    }
    {
        // start-geo
        bson_t *keys = BCON_NEW ("<GeoJSON object field name>", BCON_UTF8 ("2dsphere"));
        mongoc_index_model_t *index_model = mongoc_index_model_new (keys, NULL);

        if (mongoc_collection_create_indexes_with_opts (collection, &index_model, 1, NULL, NULL, &error)) {
            printf ("Successfully created index\n");
        } else {
            fprintf (stderr, "Failed to create index: %s", error.message);
        }

        bson_destroy (keys);
        mongoc_index_model_destroy (index_model);
        // end-geo
    }
    {
        // start-unique
        bson_t *keys = BCON_NEW ("title", BCON_INT32 (1));
        bson_t *opts = BCON_NEW ("unique", BCON_BOOL (true));
        mongoc_index_model_t *index_model = mongoc_index_model_new (keys, opts);

        if (mongoc_collection_create_indexes_with_opts (collection, &index_model, 1, NULL, NULL, &error)) {
            printf ("Successfully created index\n");
        } else {
            fprintf (stderr, "Failed to create index: %s", error.message);
        }

        bson_destroy (keys);
        bson_destroy (opts);
        mongoc_index_model_destroy (index_model);        
        // end-unique
    }
    {
        // start-wildcard
        bson_t *keys = BCON_NEW ("$**", BCON_INT32 (1));
        mongoc_index_model_t *index_model = mongoc_index_model_new (keys, NULL);

        if (mongoc_collection_create_indexes_with_opts (collection, &index_model, 1, NULL, NULL, &error)) {
            printf ("Successfully created index\n");
        } else {
            fprintf (stderr, "Failed to create index: %s", error.message);
        }

        bson_destroy (keys);
        mongoc_index_model_destroy (index_model);
        // end-wildcard
    }
    {
        // start-clustered
        bson_t *opts = BCON_NEW ("clusteredIndex", "{",
                                 "key", "{",
                                 "_id", BCON_INT32 (1),
                                 "}",
                                 "unique", BCON_BOOL (true),
                                 "}");
        
        mongoc_database_t *database = mongoc_client_get_database (client, "<database name>");

        if (mongoc_database_create_collection (database, "<collection name>", opts, &error)) {
            printf ("Successfully created collection\n");
        } else {
            fprintf (stderr, "Failed to create collection: %s", error.message);
        }

        mongoc_database_destroy (database);
        bson_destroy (opts);
        // end-clustered
    }
    {
        // start-text
        bson_t *keys = BCON_NEW ("<field name>", BCON_UTF8 ("text"));
        mongoc_index_model_t *index_model = mongoc_index_model_new (keys, NULL);

        if (mongoc_collection_create_indexes_with_opts (collection, &index_model, 1, NULL, NULL, &error)) {
            printf ("Successfully created index\n");
        } else {
            fprintf (stderr, "Failed to create index: %s", error.message);
        }

        bson_destroy (keys);
        mongoc_index_model_destroy (index_model);
        // end-text
    }
    {
        // start-remove
        if (mongoc_collection_drop_index (collection, "<index name>", &error)) {
            printf ("Successfully dropped index\n");
        } else {
            fprintf (stderr, "Failed to drop index: %s", error.message);
        }
        // end-remove
    }
    {
        // start-search-create
        bson_t cmd;
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
        // end-search-create
    }
    {
        // start-search-list
        bson_t pipeline;
        const bson_t *doc;

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
        // end-search-list
    }
    {
        // start-search-update
        bson_t cmd;
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
        // end-search-update
    }
    {
        // start-search-delete
        bson_t cmd;
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
        // end-search-delete
    }
    // End example code here

    mongoc_collection_destroy (collection);
    mongoc_client_destroy (client);
    mongoc_cleanup ();

    return EXIT_SUCCESS;
}