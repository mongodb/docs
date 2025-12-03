#include <bson/bson.h>
#include <mongoc/mongoc.h>
#include <stdio.h>

int
main (void)
{
    mongoc_client_t *client;
    mongoc_collection_t *collection;
    char *str;
    bson_error_t error;

    mongoc_init ();

    client =
        mongoc_client_new ("<connection string URI>");
    collection =
        mongoc_client_get_collection (client, "<database name>", "collection name");

{
    // start-insert-one
    bson_t *document = BCON_NEW ("<field name>", BCON_UTF8 ("<value>"));
    bson_error_t error;

    if (!mongoc_collection_insert_one (
        collection, document, NULL, NULL, &error)) {
        fprintf (stderr, "Insert one operation failed: %s\n", error.message);
    }
    bson_destroy (document);
    //end-insert-one
}

{
    // start-insert-many
    size_t num_docs = 2;
    bson_t *docs[num_docs];
    docs[0] = BCON_NEW ("<field name>", BCON_UTF8 ("<value>"));
    docs[1] = BCON_NEW ("<field name>", BCON_UTF8 ("<value>"));

    bson_error_t error;
    if (!mongoc_collection_insert_many (collection, (const bson_t **) docs, num_docs, NULL, NULL, &error)) {
        fprintf (stderr, "Insert many operation failed: %s\n", error.message);
    }

    bson_destroy (docs[0]);
    bson_destroy (docs[1]);
    // end-insert-many
}

{
    // start-update-one
    bson_t *query = BCON_NEW ("<field to match>", BCON_UTF8 ("<value to match>"));
    bson_t *update = BCON_NEW ("$set", "{", "<field name>", BCON_UTF8 ("<value>"), "}");
    bson_error_t error;

    if (!mongoc_collection_update_one (collection, query, update, NULL, NULL, &error)) {
        fprintf (stderr, "Update one operation failed: %s\n", error.message);
    }

    bson_destroy (query);
    bson_destroy (update);
    // end-update-one
}

{
    // start-update-many
    bson_t *query = BCON_NEW ("<field to match>", BCON_UTF8 ("<value to match>"));
    bson_t *update = BCON_NEW ("$set", "{", "<field name>", BCON_UTF8 ("<value>"), "}");
    bson_error_t error;

    if (!mongoc_collection_update_many (collection, query, update, NULL, NULL, &error)) {
        fprintf (stderr, "Update many operation failed: %s\n", error.message);
    }

    bson_destroy (query);
    bson_destroy (update);
    // end-update-many
}

{
    // start-delete-one
    bson_t *filter = BCON_NEW ("<field name>", BCON_UTF8 ("<value>"));
    bson_error_t error;

    if (!mongoc_collection_delete_one (collection, filter, NULL, NULL, &error)) {
        fprintf (stderr, "Delete error: %s\n", error.message);
    }

    bson_destroy (filter);
    // end-delete-one
}

{
    // start-delete-many
    bson_t *filter = BCON_NEW ("<field name>", BCON_UTF8 ("<value>"));
    bson_error_t error;

    if (!mongoc_collection_delete_many (collection, filter, NULL, NULL, &error)) {
        fprintf (stderr, "Delete error: %s\n", error.message);
    }

    bson_destroy (filter);
    // end-delete-many
}

{
    // start-bulk-write
    bson_error_t error;

    mongoc_bulk_operation_t *bulk =
       mongoc_collection_create_bulk_operation_with_opts (collection, NULL);
    
    bson_t *insert_doc = BCON_NEW (
        "<field name>", BCON_UTF8 ("<value>"),
        "<field name>", BCON_UTF8 ("<value>"),
        "<field name>", BCON_UTF8 ("<value>"),
        "<field name>", BCON_UTF8 ("<value>")
    );

    mongoc_bulk_operation_insert(bulk, insert_doc);
    bson_destroy (insert_doc);
        
    bson_t *query = BCON_NEW ("<field to match>", BCON_UTF8 ("<value to match>"));
    bson_t *update = BCON_NEW ("$set", "{", "<field name>", BCON_UTF8 ("<value>"), "}");

    mongoc_bulk_operation_update_one(bulk, query, update, false);
    bson_destroy(query);
    bson_destroy(update);

    bool result = mongoc_bulk_operation_execute(bulk, NULL, &error);
    if (!result) {
        fprintf (stderr, "Bulk operation error: %s\n", error.message);
    }

    mongoc_bulk_operation_destroy (bulk);
    // end-bulk-write
}

    mongoc_collection_destroy (collection);
    mongoc_client_destroy (client);
    mongoc_cleanup ();

    return EXIT_SUCCESS;
}