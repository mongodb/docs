#include <stdio.h>
#include <bson/bson.h>
#include <mongoc/mongoc.h>

int main(void)
{
    mongoc_init();

    char *uri = "<connection string>";
    mongoc_client_t *client = mongoc_client_new(uri);
    // start-insert-sample-data
    mongoc_collection_t *orders = mongoc_client_get_collection(client, "agg_tutorials_db", "orders");
    mongoc_collection_t *products = mongoc_client_get_collection(client, "agg_tutorials_db", "products");

    {
        bson_t *filter = bson_new();
        bson_error_t error;
        if (!mongoc_collection_delete_many(orders, filter, NULL, NULL, &error))
        {
            fprintf(stderr, "Delete error: %s\n", error.message);
        }
        if (!mongoc_collection_delete_many(products, filter, NULL, NULL, &error))
        {
            fprintf(stderr, "Delete error: %s\n", error.message);
        }
        bson_destroy(filter);
    }

    {
        size_t num_docs = 4;
        bson_t *order_docs[num_docs];

        order_docs[0] = BCON_NEW(
            "customer_id", BCON_UTF8("elise_smith@myemail.com"),
            "orderdate", BCON_DATE_TIME(1590822952000UL), // 2020-05-30T08:35:52Z
            "product_id", BCON_UTF8("a1b2c3d4"),
            "value", BCON_DOUBLE(431.43));

        order_docs[1] = BCON_NEW(
            "customer_id", BCON_UTF8("tj@wheresmyemail.com"),
            "orderdate", BCON_DATE_TIME(1559063612000UL), // 2019-05-28T19:13:32Z
            "product_id", BCON_UTF8("z9y8x7w6"),
            "value", BCON_DOUBLE(5.01));

        order_docs[2] = BCON_NEW(
            "customer_id", BCON_UTF8("oranieri@warmmail.com"),
            "orderdate", BCON_DATE_TIME(1577869537000UL), // 2020-01-01T08:25:37Z
            "product_id", BCON_UTF8("ff11gg22hh33"),
            "value", BCON_DOUBLE(63.13));

        order_docs[3] = BCON_NEW(
            "customer_id", BCON_UTF8("jjones@tepidmail.com"),
            "orderdate", BCON_DATE_TIME(1608976546000UL), // 2020-12-26T08:55:46Z
            "product_id", BCON_UTF8("a1b2c3d4"),
            "value", BCON_DOUBLE(429.65));

        bson_error_t error;
        if (!mongoc_collection_insert_many(orders, (const bson_t **)order_docs, num_docs, NULL, NULL, &error))
        {
            fprintf(stderr, "Insert error: %s\n", error.message);
        }

        for (int i = 0; i < num_docs; i++)
        {
            bson_destroy(order_docs[i]);
        }
    }

    {
        size_t num_docs = 4;
        bson_t *product_docs[num_docs];

        product_docs[0] = BCON_NEW(
            "id", BCON_UTF8("a1b2c3d4"),
            "name", BCON_UTF8("Asus Laptop"),
            "category", BCON_UTF8("ELECTRONICS"),
            "description", BCON_UTF8("Good value laptop for students"));

        product_docs[1] = BCON_NEW(
            "id", BCON_UTF8("z9y8x7w6"),
            "name", BCON_UTF8("The Day Of The Triffids"),
            "category", BCON_UTF8("BOOKS"),
            "description", BCON_UTF8("Classic post-apocalyptic novel"));

        product_docs[2] = BCON_NEW(
            "id", BCON_UTF8("ff11gg22hh33"),
            "name", BCON_UTF8("Morphy Richardds Food Mixer"),
            "category", BCON_UTF8("KITCHENWARE"),
            "description", BCON_UTF8("Luxury mixer turning good cakes into great"));

        product_docs[3] = BCON_NEW(
            "id", BCON_UTF8("pqr678st"),
            "name", BCON_UTF8("Karcher Hose Set"),
            "category", BCON_UTF8("GARDEN"),
            "description", BCON_UTF8("Hose + nozzles + winder for tidy storage"));

        bson_error_t error;
        if (!mongoc_collection_insert_many(products, (const bson_t **)product_docs, num_docs, NULL, NULL, &error))
        {
            fprintf(stderr, "Insert error: %s\n", error.message);
        }

        for (int i = 0; i < num_docs; i++)
        {
            bson_destroy(product_docs[i]);
        }
    }
    // end-insert-sample-data

    {
        const bson_t *doc;
        bson_t *pipeline = BCON_NEW(
            "pipeline", "[",
            // start-match
            "{", "$match", "{",
            "orderdate", "{",
            "$gte", BCON_DATE_TIME(1577836800000UL),
            "$lt", BCON_DATE_TIME(1609459200000UL),
            "}",
            "}", "}",
            // end-match
            // start-lookup
            "{", "$lookup", "{",
            "from", BCON_UTF8("products"),
            "localField", BCON_UTF8("product_id"),
            "foreignField", BCON_UTF8("id"),
            "as", BCON_UTF8("product_mapping"),
            "}", "}",
            // end-lookup
            // start-set
            "{", "$set", "{", "product_mapping", "{", "$first", BCON_UTF8("$product_mapping"), "}", "}", "}",
            "{", "$set", "{",
            "product_name", BCON_UTF8("$product_mapping.name"),
            "product_category", BCON_UTF8("$product_mapping.category"),
            "}", "}",
            // end-set
            // start-unset
            "{", "$unset", "[", BCON_UTF8("_id"), BCON_UTF8("product_id"), BCON_UTF8("product_mapping"), "]", "}",
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
    mongoc_collection_destroy(products);
    // end-cleanup
    mongoc_client_destroy(client);
    mongoc_cleanup();

    return EXIT_SUCCESS;
}
