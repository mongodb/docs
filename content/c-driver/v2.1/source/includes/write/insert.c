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
    collection = mongoc_client_get_collection (client, "sample_restaurants", "restaurants");
    
    {
        // Inserts a document that stores a "name" value of "Mongo's Burgers" into the collection
        // start-insert-one
        bson_t *document = BCON_NEW ("name", BCON_UTF8 ("Mongo's Burgers"));
        bson_error_t error;

        if (!mongoc_collection_insert_one (collection, document, NULL, NULL, &error)) {
            fprintf (stderr, "Insert one operation failed: %s\n", error.message);
        }
        bson_destroy (document);
        // end-insert-one
    }

    {
        // Inserts documents representing restaurants into the collection
        // start-insert-many
        size_t num_docs = 2;
        bson_t *docs[num_docs];
        docs[0] = BCON_NEW ("name", BCON_UTF8 ("Mongo's Burgers"));
        docs[1] = BCON_NEW ("name", BCON_UTF8 ("Mongo's Pizza"));

        bson_error_t error;
        if (!mongoc_collection_insert_many (collection, (const bson_t **) docs, num_docs, NULL, NULL, &error)) {
            fprintf (stderr, "Insert many operation failed: %s\n", error.message);
        }

        bson_destroy (docs[0]);
        bson_destroy (docs[1]);
        // end-insert-many
    }

    {
        // Inserts multiple documents and instructs the insert operation to skip document-level validation
        // start-modify
        size_t num_docs = 3;
        bson_t *docs[num_docs];
        docs[0] = BCON_NEW ("name", BCON_UTF8("Mongo's Burgers"));
        docs[1] = BCON_NEW ("name", BCON_UTF8("Mongo's Pizza"));
        docs[2] = BCON_NEW ("name", BCON_UTF8("Mongo's Tacos"));

        bson_t opts;
        bson_init (&opts);
        bson_append_bool (&opts, "bypassDocumentValidation", -1, true);

        bson_error_t error;
        if (!mongoc_collection_insert_many (collection, (const bson_t **) docs, num_docs, &opts, NULL, &error)) {
            fprintf (stderr, "Insert many operation failed: %s\n", error.message);
        }

        bson_destroy (docs[0]);
        bson_destroy (docs[1]);
        bson_destroy (docs[2]);
        bson_destroy (&opts);
        // end-modify
    }

    mongoc_collection_destroy (collection);
    mongoc_client_destroy (client);
    mongoc_cleanup ();

    return EXIT_SUCCESS;
}