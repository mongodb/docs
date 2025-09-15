#include <stdio.h>
#include <bson/bson.h>
#include <mongoc/mongoc.h>

int main(void)
{
    mongoc_init();

    char *uri = "<connection string>";
    mongoc_client_t *client = mongoc_client_new(uri);
    // start-insert-sample-data
    mongoc_collection_t *products = mongoc_client_get_collection(client, "agg_tutorials_db", "products");
    mongoc_collection_t *orders = mongoc_client_get_collection(client, "agg_tutorials_db", "orders");

    {
        bson_t *filter = bson_new();
        bson_error_t error;
        if (!mongoc_collection_delete_many(products, filter, NULL, NULL, &error))
        {
            fprintf(stderr, "Delete error: %s\n", error.message);
        }
        if (!mongoc_collection_delete_many(orders, filter, NULL, NULL, &error))
        {
            fprintf(stderr, "Delete error: %s\n", error.message);
        }
        bson_destroy(filter);
    }

    {
        size_t num_docs = 5;
        bson_t *product_docs[num_docs];

        product_docs[0] = BCON_NEW(
            "name", BCON_UTF8("Asus Laptop"),
            "variation", BCON_UTF8("Ultra HD"),
            "category", BCON_UTF8("ELECTRONICS"),
            "description", BCON_UTF8("Great for watching movies"));

        product_docs[1] = BCON_NEW(
            "name", BCON_UTF8("Asus Laptop"),
            "variation", BCON_UTF8("Standard Display"),
            "category", BCON_UTF8("ELECTRONICS"),
            "description", BCON_UTF8("Good value laptop for students"));

        product_docs[2] = BCON_NEW(
            "name", BCON_UTF8("The Day Of The Triffids"),
            "variation", BCON_UTF8("1st Edition"),
            "category", BCON_UTF8("BOOKS"),
            "description", BCON_UTF8("Classic post-apocalyptic novel"));

        product_docs[3] = BCON_NEW(
            "name", BCON_UTF8("The Day Of The Triffids"),
            "variation", BCON_UTF8("2nd Edition"),
            "category", BCON_UTF8("BOOKS"),
            "description", BCON_UTF8("Classic post-apocalyptic novel"));

        product_docs[4] = BCON_NEW(
            "name", BCON_UTF8("Morphy Richards Food Mixer"),
            "variation", BCON_UTF8("Deluxe"),
            "category", BCON_UTF8("KITCHENWARE"),
            "description", BCON_UTF8("Luxury mixer turning good cakes into great"));

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

    {
        size_t num_docs = 4;
        bson_t *order_docs[num_docs];

        order_docs[0] = BCON_NEW(
            "customer_id", BCON_UTF8("elise_smith@myemail.com"),
            "orderdate", BCON_DATE_TIME(1590822952000UL), // 2020-05-30T08:35:52Z
            "product_name", BCON_UTF8("Asus Laptop"),
            "product_variation", BCON_UTF8("Standard Display"),
            "value", BCON_DOUBLE(431.43));

        order_docs[1] = BCON_NEW(
            "customer_id", BCON_UTF8("tj@wheresmyemail.com"),
            "orderdate", BCON_DATE_TIME(1559063612000UL), // 2019-05-28T19:13:32Z
            "product_name", BCON_UTF8("The Day Of The Triffids"),
            "product_variation", BCON_UTF8("2nd Edition"),
            "value", BCON_DOUBLE(5.01));

        order_docs[2] = BCON_NEW(
            "customer_id", BCON_UTF8("oranieri@warmmail.com"),
            "orderdate", BCON_DATE_TIME(1577869537000UL), // 2020-01-01T08:25:37Z
            "product_name", BCON_UTF8("Morphy Richards Food Mixer"),
            "product_variation", BCON_UTF8("Deluxe"),
            "value", BCON_DOUBLE(63.13));

        order_docs[3] = BCON_NEW(
            "customer_id", BCON_UTF8("jjones@tepidmail.com"),
            "orderdate", BCON_DATE_TIME(1608976546000UL), // 2020-12-26T08:55:46Z
            "product_name", BCON_UTF8("Asus Laptop"),
            "product_variation", BCON_UTF8("Standard Display"),
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
    // end-insert-sample-data

    {
        const bson_t *doc;
        // start-embedded-pl-match1
        bson_t embedded_pipeline;
        bson_array_builder_t *bab = bson_array_builder_new();

        bson_array_builder_append_document(bab, BCON_NEW(
                                                    "$match", "{",
                                                    "$expr", "{", "$and",
                                                    "[",
                                                    "{", "$eq", "[", BCON_UTF8("$product_name"), BCON_UTF8("$$prdname"), "]", "}",
                                                    "{", "$eq", "[", BCON_UTF8("$product_variation"), BCON_UTF8("$$prdvartn"), "]", "}",
                                                    "]",
                                                    "}",
                                                    "}"));
        // end-embedded-pl-match1

        // start-embedded-pl-match2
        bson_array_builder_append_document(bab, BCON_NEW(
                                                    "$match", "{", "orderdate",
                                                    "{",
                                                    "$gte", BCON_DATE_TIME(1577836800000UL),
                                                    "$lt", BCON_DATE_TIME(1609459200000UL),
                                                    "}",
                                                    "}"));
        // end-embedded-pl-match2

        // start-embedded-pl-unset
        bson_array_builder_append_document(bab, BCON_NEW(
                                                    "$unset",
                                                    "[", BCON_UTF8("_id"), BCON_UTF8("product_name"), BCON_UTF8("product_variation"),
                                                    "]"));

        // Builds the embedded pipeline array and cleans up resources
        bson_array_builder_build(bab, &embedded_pipeline);
        bson_array_builder_destroy(bab);
        // end-embedded-pl-unset

        bson_t *pipeline = BCON_NEW(
            "pipeline", "[",
            // start-lookup
            "{", "$lookup", "{",
            "from", BCON_UTF8("orders"),
            "let", "{",
            "prdname", BCON_UTF8("$name"),
            "prdvartn", BCON_UTF8("$variation"),
            "}",
            "pipeline", BCON_ARRAY(&embedded_pipeline),
            "as", BCON_UTF8("orders"),
            "}", "}",
            // end-lookup
            // start-match
            "{",
            "$match", "{",
            "orders", "{", "$ne", "[", "]", "}",
            "}", "}",
            // end-match
            // start-unset
            "{", "$unset", "[", BCON_UTF8("_id"), BCON_UTF8("description"), "]", "}",
            // end-unset
            "]");

        // start-run-agg
        mongoc_cursor_t *results =
            mongoc_collection_aggregate(products, MONGOC_QUERY_NONE, pipeline, NULL, NULL);

        bson_destroy(&embedded_pipeline);
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
    mongoc_collection_destroy(products);
    mongoc_collection_destroy(orders);
    // end-cleanup
    mongoc_client_destroy(client);
    mongoc_cleanup();

    return EXIT_SUCCESS;
}
