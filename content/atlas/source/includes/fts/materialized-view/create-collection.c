#include <mongoc/mongoc.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
    mongoc_client_t *client;
    mongoc_collection_t *collection;
    mongoc_cursor_t *cursor;
    bson_error_t error;
    bson_t *doc1, *doc2;
    bson_t *query;
    bson_t *sort;
    const bson_t *doc;
    char *str;

    /* Initialize the MongoDB C Driver. */
    mongoc_init();

    /* Connect to your MongoDB deployment. */
    client = mongoc_client_new("<connection-string>");
    collection = mongoc_client_get_collection(client, "sample_supplies", "purchaseOrders");

    if (!client) {
        fprintf(stderr, "Failed to create client.\n");
        return 1;
    }

    /* Create the first document */
    doc1 = BCON_NEW(
        "saleDate", BCON_DATE_TIME(1516741609506), /* 2018-01-23T21:06:49.506Z */
        "items", "[", 
            "{", 
                "name", BCON_UTF8("printer paper"), 
                "tags", "[", 
                    BCON_UTF8("office"), 
                    BCON_UTF8("stationary"), 
                "]", 
                "price", BCON_DOUBLE(40.01), 
                "quantity", BCON_INT32(2), 
            "}", 
            "{", 
                "name", BCON_UTF8("notepad"), 
                "tags", "[", 
                    BCON_UTF8("office"), 
                    BCON_UTF8("writing"), 
                    BCON_UTF8("school"), 
                "]", 
                "price", BCON_DOUBLE(35.29), 
                "quantity", BCON_INT32(2), 
            "}", 
            "{", 
                "name", BCON_UTF8("pens"), 
                "tags", "[", 
                    BCON_UTF8("writing"), 
                    BCON_UTF8("office"), 
                    BCON_UTF8("school"), 
                    BCON_UTF8("stationary"), 
                "]", 
                "price", BCON_DOUBLE(56.12), 
                "quantity", BCON_INT32(5), 
            "}", 
            "{", 
                "name", BCON_UTF8("backpack"), 
                "tags", "[", 
                    BCON_UTF8("school"), 
                    BCON_UTF8("travel"), 
                    BCON_UTF8("kids"), 
                "]", 
                "price", BCON_DOUBLE(77.71), 
                "quantity", BCON_INT32(2), 
            "}", 
            "{", 
                "name", BCON_UTF8("notepad"), 
                "tags", "[", 
                    BCON_UTF8("office"), 
                    BCON_UTF8("writing"), 
                    BCON_UTF8("school"), 
                "]", 
                "price", BCON_DOUBLE(18.47), 
                "quantity", BCON_INT32(2), 
            "}", 
            "{", 
                "name", BCON_UTF8("envelopes"), 
                "tags", "[", 
                    BCON_UTF8("stationary"), 
                    BCON_UTF8("office"), 
                    BCON_UTF8("general"), 
                "]", 
                "price", BCON_DOUBLE(19.95), 
                "quantity", BCON_INT32(8), 
            "}", 
            "{", 
                "name", BCON_UTF8("envelopes"), 
                "tags", "[", 
                    BCON_UTF8("stationary"), 
                    BCON_UTF8("office"), 
                    BCON_UTF8("general"), 
                "]", 
                "price", BCON_DOUBLE(8.08), 
                "quantity", BCON_INT32(3), 
            "}", 
            "{", 
                "name", BCON_UTF8("binder"), 
                "tags", "[", 
                    BCON_UTF8("school"), 
                    BCON_UTF8("general"), 
                    BCON_UTF8("organization"), 
                "]", 
                "price", BCON_DOUBLE(14.16), 
                "quantity", BCON_INT32(3), 
            "}", 
        "]",
        "storeLocation", BCON_UTF8("Denver"),
        "customer", "{", 
            "gender", BCON_UTF8("M"), 
            "age", BCON_INT32(42), 
            "email", BCON_UTF8("cauho@witwuta.sv"), 
            "satisfaction", BCON_INT32(4),
        "}",
        "couponUsed", BCON_BOOL(true),
        "purchaseMethod", BCON_UTF8("Phone")
    );
    
    /* Create the second document */
    doc2 = BCON_NEW(
        "saleDate", BCON_DATE_TIME(1516874462918), /* 2018-01-25T10:01:02.918Z */
        "items", "[", 
            "{", 
                "name", BCON_UTF8("envelopes"), 
                "tags", "[", 
                    BCON_UTF8("stationary"), 
                    BCON_UTF8("office"), 
                    BCON_UTF8("general"), 
                "]", 
                "price", BCON_DOUBLE(8.05), 
                "quantity", BCON_INT32(10), 
            "}", 
            "{", 
                "name", BCON_UTF8("binder"), 
                "tags", "[", 
                    BCON_UTF8("school"), 
                    BCON_UTF8("general"), 
                    BCON_UTF8("organization"), 
                "]", 
                "price", BCON_DOUBLE(28.31), 
                "quantity", BCON_INT32(9), 
            "}", 
            "{", 
                "name", BCON_UTF8("notepad"), 
                "tags", "[", 
                    BCON_UTF8("office"), 
                    BCON_UTF8("writing"), 
                    BCON_UTF8("school"), 
                "]", 
                "price", BCON_DOUBLE(20.95), 
                "quantity", BCON_INT32(3), 
            "}", 
            "{", 
                "name", BCON_UTF8("laptop"), 
                "tags", "[", 
                    BCON_UTF8("electronics"), 
                    BCON_UTF8("school"), 
                    BCON_UTF8("office"), 
                "]", 
                "price", BCON_DOUBLE(866.5), 
                "quantity", BCON_INT32(4), 
            "}", 
            "{", 
                "name", BCON_UTF8("notepad"), 
                "tags", "[", 
                    BCON_UTF8("office"), 
                    BCON_UTF8("writing"), 
                    BCON_UTF8("school"), 
                "]", 
                "price", BCON_DOUBLE(33.09), 
                "quantity", BCON_INT32(4), 
            "}", 
            "{", 
                "name", BCON_UTF8("printer paper"), 
                "tags", "[", 
                    BCON_UTF8("office"), 
                    BCON_UTF8("stationary"), 
                "]", 
                "price", BCON_DOUBLE(37.55), 
                "quantity", BCON_INT32(1), 
            "}", 
            "{", 
                "name", BCON_UTF8("backpack"), 
                "tags", "[", 
                    BCON_UTF8("school"), 
                    BCON_UTF8("travel"), 
                    BCON_UTF8("kids"), 
                "]", 
                "price", BCON_DOUBLE(83.28), 
                "quantity", BCON_INT32(2), 
            "}", 
            "{", 
                "name", BCON_UTF8("pens"), 
                "tags", "[", 
                    BCON_UTF8("writing"), 
                    BCON_UTF8("office"), 
                    BCON_UTF8("school"), 
                    BCON_UTF8("stationary"), 
                "]", 
                "price", BCON_DOUBLE(42.9), 
                "quantity", BCON_INT32(4), 
            "}", 
            "{", 
                "name", BCON_UTF8("envelopes"), 
                "tags", "[", 
                    BCON_UTF8("stationary"), 
                    BCON_UTF8("office"), 
                    BCON_UTF8("general"), 
                "]", 
                "price", BCON_DOUBLE(16.68), 
                "quantity", BCON_INT32(2), 
            "}", 
        "]",
        "storeLocation", BCON_UTF8("Seattle"),
        "customer", "{", 
            "gender", BCON_UTF8("M"), 
            "age", BCON_INT32(50), 
            "email", BCON_UTF8("keecade@hem.uy"), 
            "satisfaction", BCON_INT32(5),
        "}",
        "couponUsed", BCON_BOOL(false),
        "purchaseMethod", BCON_UTF8("Phone")
    );

    /* Insert the documents */
    if (!mongoc_collection_insert_one(collection, doc1, NULL, NULL, &error)) {
        fprintf(stderr, "Insert failed: %s\n", error.message);
        return 1;
    }
    
    if (!mongoc_collection_insert_one(collection, doc2, NULL, NULL, &error)) {
        fprintf(stderr, "Insert failed: %s\n", error.message);
        return 1;
    }
    
    printf("Successfully inserted purchase order documents.\n");
    
    /* Query the new collection */
    query = BCON_NEW(NULL);  /* Empty query to match all documents */
    sort = BCON_NEW("saleDate", BCON_INT32(-1));
    
    cursor = mongoc_collection_find_with_opts(collection, query, 
                                           BCON_NEW("sort", BCON_DOCUMENT(sort)), NULL);
    
    printf("\nQuery results:\n");
    while (mongoc_cursor_next(cursor, &doc)) {
        str = bson_as_canonical_extended_json(doc, NULL);
        printf("%s\n", str);
        bson_free(str);
    }
    
    if (mongoc_cursor_error(cursor, &error)) {
        fprintf(stderr, "Cursor Failure: %s\n", error.message);
    }

    /* Clean up. */
    bson_destroy(doc1);
    bson_destroy(doc2);
    bson_destroy(query);
    bson_destroy(sort);
    mongoc_cursor_destroy(cursor);
    mongoc_collection_destroy(collection);
    mongoc_client_destroy(client);
    mongoc_cleanup();

    return 0;
}
