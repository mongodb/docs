#include <bson/bson.h>
#include <mongoc/mongoc.h>
#include <stdio.h>

int
main (void)
{
    bson_error_t error;

    mongoc_init();

    {

        mongoc_client_t *client = mongoc_client_new ("<connection string URI>");
        // start-access-database
        mongoc_database_t *database = mongoc_client_get_database (client, "test_database");
        // end-access-database
        mongoc_database_destroy (database);
        mongoc_client_destroy (client);
    }

    {
        mongoc_client_t *client = mongoc_client_new ("<connection string URI>");
        mongoc_database_t *database = mongoc_client_get_database (client, "test_database");
        // start-access-collection
        mongoc_collection_t *collection = mongoc_database_get_collection (database, "test_collection");
        // end-access-collection
        mongoc_collection_destroy (collection);
        mongoc_database_destroy (database);
        mongoc_client_destroy (client);
    }

    {
        mongoc_client_t *client = mongoc_client_new ("<connection string URI>");
        mongoc_database_t *database = mongoc_client_get_database (client, "test_database");
        // start-create-collection
        mongoc_collection_t *new_collection = mongoc_database_create_collection (database, "example_collection", NULL, &error);
        // end-create-collection
        mongoc_collection_destroy (new_collection);
        mongoc_database_destroy (database);
        mongoc_client_destroy (client);
    }

    {
        mongoc_client_t *client = mongoc_client_new ("<connection string URI>");
        mongoc_database_t *database = mongoc_client_get_database (client, "test_database");
        // start-find-collections
        mongoc_cursor_t *cursor = mongoc_database_find_collections_with_opts (database, NULL);

        const bson_t *doc;
        while (mongoc_cursor_next (cursor, &doc))
        {
            char *str = bson_as_canonical_extended_json (doc, NULL);
            printf ("Collection: %s\n", str);
            bson_free (str);
        }
        // end-find-collections
        mongoc_cursor_destroy (cursor);
        mongoc_database_destroy (database);
        mongoc_client_destroy (client);
    }

    {
        mongoc_client_t *client = mongoc_client_new ("<connection string URI>");
        mongoc_database_t *database = mongoc_client_get_database (client, "test_database");
        // start-find-collection-names
        char **strv;
        unsigned i;

        if ((strv = mongoc_database_get_collection_names_with_opts (database, NULL, &error)))
        {
            for (i = 0; strv[i]; i++)
                printf ("%s\n", strv[i]);

            bson_strfreev (strv);
        }
        else
        {
            fprintf (stderr, "Command failed: %s\n", error.message);
        }
        // end-find-collection-names
        mongoc_database_destroy (database);
        mongoc_client_destroy (client);
    }

    {
        mongoc_client_t *client = mongoc_client_new ("<connection string URI>");
        mongoc_database_t *database = mongoc_client_get_database (client, "test_database");
        // start-delete-collection
        mongoc_collection_t *collection = mongoc_database_get_collection (database, "test_collection");
        mongoc_collection_drop (collection, NULL);
        // end-delete-collection
        mongoc_collection_destroy (collection);
        mongoc_database_destroy (database);
        mongoc_client_destroy (client);
    }

    {
        mongoc_client_t *client = mongoc_client_new ("<connection string URI>");
        mongoc_database_t *database = mongoc_client_get_database (client, "test_database");
        // start-database-read-prefs
        mongoc_read_prefs_t *read_prefs = mongoc_read_prefs_new (MONGOC_READ_PRIMARY_PREFERRED);
        mongoc_database_set_read_prefs (database, read_prefs);
        // end-database-read-prefs
        mongoc_read_prefs_destroy (read_prefs);
        mongoc_database_destroy (database);
        mongoc_client_destroy (client);
    }

    {
        mongoc_client_t *client = mongoc_client_new ("<connection string URI>");
        mongoc_database_t *database = mongoc_client_get_database (client, "test_database");
        mongoc_collection_t *collection = mongoc_database_get_collection (database, "test_collection");
        // start-collection-read-prefs
        mongoc_read_prefs_t *read_prefs = mongoc_read_prefs_new (MONGOC_READ_PRIMARY_PREFERRED);
        mongoc_collection_set_read_prefs(collection, read_prefs);
        // end-collection-read-prefs
        mongoc_read_prefs_destroy (read_prefs);
        mongoc_collection_destroy (collection);
        mongoc_database_destroy (database);
        mongoc_client_destroy (client);
    }

    {
        // start-tags
        mongoc_read_prefs_t *read_prefs = mongoc_read_prefs_new (MONGOC_READ_SECONDARY_PREFERRED);
        bson_t *tags = BCON_NEW ("DC", BCON_UTF8("ny"), "DC", BCON_UTF8("sf"));
        // end-tags
        mongoc_read_prefs_destroy (read_prefs);
    }

    {
        // start-local-threshold
        const char *uri_string = "mongodb://localhost:27017/?localThresholdMS=35";
        mongoc_client_t *client = mongoc_client_new (uri_string);
        // end-local-threshold
        mongoc_client_destroy (client);
    }

    mongoc_cleanup ();

    return EXIT_SUCCESS;
}