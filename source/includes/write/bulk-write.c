#include <stdio.h>
#include <bson/bson.h>
#include <mongoc/mongoc.h>

int main (void)
{
    mongoc_client_t *client;
    mongoc_collection_t *collection;
    mongoc_init ();

    client = mongoc_client_new ("<connection string URI>");
    collection = mongoc_client_get_collection (client, "sample_restaurants", "restaurants");

    // Retrieves a bulk operation handle
    // start-create-bulk-write
    mongoc_bulk_operation_t *bulk =
       mongoc_collection_create_bulk_operation_with_opts (collection, NULL);
    // end-create-bulk-write

    {
        // Creates insert operation instructions and adds the operation to the bulk write
        // start-bulk-insert-one
        bson_t *insert_doc = BCON_NEW (
            "name", BCON_UTF8 ("Mongo's Deli"),
            "cuisine", BCON_UTF8 ("Sandwiches"),
            "borough", BCON_UTF8 ("Manhattan"),
            "restaurant_id", BCON_UTF8 ("1234")
        );
        bson_error_t error;

        if (!mongoc_bulk_operation_insert_with_opts (bulk, insert_doc, NULL, &error)) {
            fprintf (stderr, "Failed to add insert operation: %s\n", error.message);
        }

        bson_destroy (insert_doc);
        // end-bulk-insert-one
    }

    {
        // Creates update one operation instructions and adds the operation to the bulk write
        // start-bulk-update-one
        bson_t *filter_doc = BCON_NEW ("name", BCON_UTF8 ("Mongo's Deli"));
        bson_t *update_doc = BCON_NEW ("$set", "{", "cuisine", BCON_UTF8 ("Sandwiches and Salads"), "}");
        bson_error_t error;

        if (!mongoc_bulk_operation_update_one_with_opts (bulk, filter_doc, update_doc, NULL, &error)) {
            fprintf (stderr, "Failed to add update operation: %s\n", error.message);
        }

        bson_destroy (filter_doc);
        bson_destroy (update_doc);
        // end-bulk-update-one
    }

    {
        // Creates update many operation instructions and adds the operation to the bulk write
        // start-bulk-update-many
        bson_t *filter_doc = BCON_NEW ("name", BCON_UTF8 ("Mongo's Deli"));
        bson_t *update_doc = BCON_NEW ("$set", "{", "cuisine", BCON_UTF8 ("Sandwiches and Salads"), "}");
        bson_error_t error;

        if (!mongoc_bulk_operation_update_many_with_opts (bulk, filter_doc, update_doc, NULL, &error)) {
            fprintf (stderr, "Failed to add update operation: %s\n", error.message);
        }

        bson_destroy (filter_doc);
        bson_destroy (update_doc);
        // end-bulk-update-many
    }

    {
        // Creates replace one operation instructions and adds the operation to the bulk write
        // start-bulk-replace-one
        bson_t *filter_doc = BCON_NEW ("restaurant_id", BCON_UTF8 ("1234"));
        bson_t *replace_doc = BCON_NEW (
            "name", BCON_UTF8 ("Mongo's Deli"),
            "cuisine", BCON_UTF8 ("Sandwiches and Salads"),
            "borough", BCON_UTF8 ("Brooklyn"),
            "restaurant_id", BCON_UTF8 ("5678")
        );
        bson_error_t error;

        if (!mongoc_bulk_operation_replace_one_with_opts (bulk, filter_doc, replace_doc, NULL, &error)) {
            fprintf (stderr, "Failed to add replace operation: %s\n", error.message);
        }

        bson_destroy (filter_doc);
        bson_destroy (replace_doc);
        // end-bulk-replace-one
    }

    {
        // Creates delete one operation instructions and adds the operation to the bulk write
        // start-bulk-delete-one
        bson_t *filter_doc = BCON_NEW ("restaurant_id", BCON_UTF8 ("5678"));
        bson_error_t error;

        if (!mongoc_bulk_operation_remove_one_with_opts (bulk, filter_doc, NULL, &error)) {
            fprintf (stderr, "Failed to add delete operation: %s\n", error.message);
        }

        bson_destroy (filter_doc);
        // end-bulk-delete-one
    }

    {
        // Creates delete many operation instructions and adds the operation to the bulk write
        // start-bulk-delete-many
        bson_t *filter_doc = BCON_NEW ("borough", BCON_UTF8 ("Manhattan"));
        bson_error_t error;

        if (!mongoc_bulk_operation_remove_many_with_opts (bulk, filter_doc, NULL, &error)) {
            fprintf (stderr, "Failed to add delete operation: %s\n", error.message);
        }

        bson_destroy (filter_doc);
        // end-bulk-delete-many
    }

    {
        // Runs the bulk operation based on the operations added
        // start-bulk-run
        bson_error_t error;
        bool result = mongoc_bulk_operation_execute (bulk, NULL, &error);

        if (!result) {
            printf ("Bulk operation error: %s\n", error.message);
        }

        mongoc_bulk_operation_destroy (bulk);
        // end-bulk-run
    }

    {
        // Retrieves a bulk operation handle and instructs the operation to not run in order
        // start-bulk-write-unordered
        bson_t opts;
        BSON_APPEND_BOOL (&opts, "ordered", false);
        bulk = mongoc_collection_create_bulk_operation_with_opts (collection, &opts);

        // Perform bulk operation
        
        bson_destroy (&opts);
        mongoc_bulk_operation_destroy (bulk);
        // end-bulk-write-unordered
    }

    mongoc_collection_destroy (collection);
    mongoc_client_destroy (client);
    mongoc_cleanup ();

    return 0;
}