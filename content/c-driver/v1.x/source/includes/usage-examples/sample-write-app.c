#include <bson/bson.h>
#include <mongoc/mongoc.h>
#include <stdio.h>

int
main(void)
{
    char *str;
    bson_error_t error;

    mongoc_init();

    mongoc_client_t *client =
        mongoc_client_new("<connection string URI>");
    mongoc_collection_t *collection =
        mongoc_client_get_collection(client, "<database name>", "collection name");

    // Start example code here

    // End example code here

    mongoc_collection_destroy(collection);
    mongoc_client_destroy(client);
    mongoc_cleanup();

    return EXIT_SUCCESS;
}