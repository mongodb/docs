#include <bson/bson.h>
#include <mongoc/mongoc.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
    mongoc_client_t *client;
    mongoc_database_t *database;
    mongoc_collection_t *collection;
    bson_error_t error;
    bson_t *doc;
    bool ret;

    /* Initialize the MongoDB C driver */
    mongoc_init();

    /* Create a client connection to your MongoDB cluster */
    client = mongoc_client_new("<connection-string>");
    if (!client) {
        fprintf(stderr, "Failed to create client connection.\n");
        return EXIT_FAILURE;
    }

    /* Get a handle to the sample_mflix database */
    database = mongoc_client_get_database(client, "sample_mflix");

    /* Create the transport_synonyms collection */
    collection = mongoc_database_create_collection(database, "transport_synonyms", NULL, &error);
    if (!collection) {
        fprintf(stderr, "Failed to create transport_synonyms collection: %s\n", error.message);
        return EXIT_FAILURE;
    }
    
    /* Create and insert the first transport document - equivalent mapping */
    doc = BCON_NEW(
        "mappingType", BCON_UTF8("equivalent"),
        "synonyms", "[", 
            BCON_UTF8("car"), 
            BCON_UTF8("vehicle"), 
            BCON_UTF8("automobile"), 
        "]"
    );
    
    ret = mongoc_collection_insert_one(collection, doc, NULL, NULL, &error);
    if (!ret) {
        fprintf(stderr, "Failed to insert document: %s\n", error.message);
    }
    bson_destroy(doc);
    
    /* Create and insert the second transport document - explicit mapping */
    doc = BCON_NEW(
        "mappingType", BCON_UTF8("explicit"),
        "input", "[", 
            BCON_UTF8("boat"), 
        "]",
        "synonyms", "[", 
            BCON_UTF8("boat"), 
            BCON_UTF8("vessel"), 
            BCON_UTF8("sail"), 
        "]"
    );
    
    ret = mongoc_collection_insert_one(collection, doc, NULL, NULL, &error);
    if (!ret) {
        fprintf(stderr, "Failed to insert document: %s\n", error.message);
    }
    bson_destroy(doc);
    
    /* Release the transport_synonyms collection handle */
    mongoc_collection_destroy(collection);
    
    /* Create the attire_synonyms collection */
    collection = mongoc_database_create_collection(database, "attire_synonyms", NULL, &error);
    if (!collection) {
        fprintf(stderr, "Failed to create attire_synonyms collection: %s\n", error.message);
        return EXIT_FAILURE;
    }
    
    /* Create and insert the first attire document - equivalent mapping */
    doc = BCON_NEW(
        "mappingType", BCON_UTF8("equivalent"),
        "synonyms", "[", 
            BCON_UTF8("dress"), 
            BCON_UTF8("apparel"), 
            BCON_UTF8("attire"), 
        "]"
    );
    
    ret = mongoc_collection_insert_one(collection, doc, NULL, NULL, &error);
    if (!ret) {
        fprintf(stderr, "Failed to insert document: %s\n", error.message);
    }
    bson_destroy(doc);
    
    /* Create and insert the second attire document - explicit mapping */
    doc = BCON_NEW(
        "mappingType", BCON_UTF8("explicit"),
        "input", "[", 
            BCON_UTF8("hat"), 
        "]",
        "synonyms", "[", 
            BCON_UTF8("hat"), 
            BCON_UTF8("fedora"), 
            BCON_UTF8("headgear"), 
        "]"
    );
    
    ret = mongoc_collection_insert_one(collection, doc, NULL, NULL, &error);
    if (!ret) {
        fprintf(stderr, "Failed to insert document: %s\n", error.message);
    }
    bson_destroy(doc);
    
    /* Release the attire_synonyms collection handle */
    mongoc_collection_destroy(collection);
    
    /* Clean up resources */
    mongoc_database_destroy(database);
    mongoc_client_destroy(client);
    mongoc_cleanup();
    
    printf("Synonyms collections successfully created and populated.\n");
    
    return EXIT_SUCCESS;
}
