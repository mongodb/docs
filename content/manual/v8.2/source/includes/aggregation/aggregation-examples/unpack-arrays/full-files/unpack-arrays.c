#include <stdio.h>
#include <bson/bson.h>
#include <mongoc/mongoc.h>

int main(void)
{
    mongoc_init();

    char *uri = "<connection string>";
    mongoc_client_t *client = mongoc_client_new(uri);
    // start-insert-orders
    mongoc_collection_t *orders = mongoc_client_get_collection(client, "agg_tutorials_db", "orders");

    {
        bson_t *filter = bson_new();
        bson_error_t error;
        if (!mongoc_collection_delete_many(orders, filter, NULL, NULL, &error))
        {
            fprintf(stderr, "Delete error: %s\n", error.message);
        }
        bson_destroy(filter);
    }

    {
        size_t num_docs = 4;
        bson_t *docs[num_docs];

        docs[0] = BCON_NEW(
            "order_id", BCON_INT64(6363763262239),
            "products", "[",
            "{",
            "prod_id", BCON_UTF8("abc12345"),
            "name", BCON_UTF8("Asus Laptop"),
            "price", BCON_INT32(431),
            "}",
            "{",
            "prod_id", BCON_UTF8("def45678"),
            "name", BCON_UTF8("Karcher Hose Set"),
            "price", BCON_INT32(22),
            "}",
            "]");

        docs[1] = BCON_NEW(
            "order_id", BCON_INT64(1197372932325),
            "products", "[",
            "{",
            "prod_id", BCON_UTF8("abc12345"),
            "name", BCON_UTF8("Asus Laptop"),
            "price", BCON_INT32(429),
            "}",
            "]");

        docs[2] = BCON_NEW(
            "order_id", BCON_INT64(9812343774839),
            "products", "[",
            "{",
            "prod_id", BCON_UTF8("pqr88223"),
            "name", BCON_UTF8("Morphy Richards Food Mixer"),
            "price", BCON_INT32(431),
            "}",
            "{",
            "prod_id", BCON_UTF8("def45678"),
            "name", BCON_UTF8("Karcher Hose Set"),
            "price", BCON_INT32(21),
            "}",
            "]");

        docs[3] = BCON_NEW(
            "order_id", BCON_INT64(4433997244387),
            "products", "[",
            "{",
            "prod_id", BCON_UTF8("def45678"),
            "name", BCON_UTF8("Karcher Hose Set"),
            "price", BCON_INT32(23),
            "}",
            "{",
            "prod_id", BCON_UTF8("jkl77336"),
            "name", BCON_UTF8("Picky Pencil Sharpener"),
            "price", BCON_INT32(1),
            "}",
            "{",
            "prod_id", BCON_UTF8("xyz11228"),
            "name", BCON_UTF8("Russell Hobbs Chrome Kettle"),
            "price", BCON_INT32(16),
            "}",
            "]");

        bson_error_t error;
        if (!mongoc_collection_insert_many(orders, (const bson_t **)docs, num_docs, NULL, NULL, &error))
        {
            fprintf(stderr, "Insert error: %s\n", error.message);
        }

        for (int i = 0; i < num_docs; i++)
        {
            bson_destroy(docs[i]);
        }
    }
    // end-insert-orders

    {
        const bson_t *doc;
        bson_t *pipeline = BCON_NEW(
            "pipeline", "[",
            // start-unwind
            "{", "$unwind", "{", "path", BCON_UTF8("$products"), "}", "}",
            // end-unwind
            // start-match
            "{", "$match", "{", "products.price", "{", "$gt", BCON_INT32(15), "}", "}", "}",
            // end-match
            // start-group
            "{", "$group", "{",
            "_id", BCON_UTF8("$products.prod_id"),
            "product", "{", "$first", BCON_UTF8("$products.name"), "}",
            "total_value", "{", "$sum", BCON_UTF8("$products.price"), "}",
            "quantity", "{", "$sum", BCON_INT32(1), "}",
            "}", "}",
            // end-group
            // start-set
            "{", "$set", "{", "product_id", BCON_UTF8("$_id"), "}", "}",
            // end-set
            // start-unset
            "{", "$unset", "[", BCON_UTF8("_id"), "]", "}",
            // end-unset
            "]");

        // start-run-agg
        mongoc_cursor_t *results =
            mongoc_collection_aggregate(orders, MONGOC_QUERY_NONE, pipeline, NULL, NULL);

        bson_destroy(pipeline);
        // end-run-agg

        while (mongoc_cursor_next(results, &doc))
        {
            char *str = bson_as_canonical_extended_json(doc, NULL);
            printf("%s\n", str);
            bson_free(str);
        }
        bson_error_t error;
        if (mongoc_cursor_error(results, &error))
        {
            fprintf(stderr, "Aggregation error: %s\n", error.message);
        }

        mongoc_cursor_destroy(results);
    }

    // start-cleanup
    mongoc_collection_destroy(orders);
    // end-cleanup
    mongoc_client_destroy(client);
    mongoc_cleanup();

    return EXIT_SUCCESS;
}
