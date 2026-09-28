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
        size_t num_docs = 9;
        bson_t *docs[num_docs];

        docs[0] = BCON_NEW(
            "customer_id", BCON_UTF8("elise_smith@myemail.com"),
            "orderdate", BCON_DATE_TIME(1590825352000UL), // 2020-05-30T08:35:52Z
            "value", BCON_INT32(231));

        docs[1] = BCON_NEW(
            "customer_id", BCON_UTF8("elise_smith@myemail.com"),
            "orderdate", BCON_DATE_TIME(1578904327000UL), // 2020-01-13T09:32:07Z
            "value", BCON_INT32(99));

        docs[2] = BCON_NEW(
            "customer_id", BCON_UTF8("oranieri@warmmail.com"),
            "orderdate", BCON_DATE_TIME(1577865937000UL), // 2020-01-01T08:25:37Z
            "value", BCON_INT32(63));

        docs[3] = BCON_NEW(
            "customer_id", BCON_UTF8("tj@wheresmyemail.com"),
            "orderdate", BCON_DATE_TIME(1559061212000UL), // 2019-05-28T19:13:32Z
            "value", BCON_INT32(2));

        docs[4] = BCON_NEW(
            "customer_id", BCON_UTF8("tj@wheresmyemail.com"),
            "orderdate", BCON_DATE_TIME(1606171013000UL), // 2020-11-23T22:56:53Z
            "value", BCON_INT32(187));

        docs[5] = BCON_NEW(
            "customer_id", BCON_UTF8("tj@wheresmyemail.com"),
            "orderdate", BCON_DATE_TIME(1597793088000UL), // 2020-08-18T23:04:48Z
            "value", BCON_INT32(4));

        docs[6] = BCON_NEW(
            "customer_id", BCON_UTF8("elise_smith@myemail.com"),
            "orderdate", BCON_DATE_TIME(1608963346000UL), // 2020-12-26T08:55:46Z
            "value", BCON_INT32(4));

        docs[7] = BCON_NEW(
            "customer_id", BCON_UTF8("tj@wheresmyemail.com"),
            "orderdate", BCON_DATE_TIME(1614496172000UL), // 2021-02-28T07:49:32Z
            "value", BCON_INT32(1024));

        docs[8] = BCON_NEW(
            "customer_id", BCON_UTF8("elise_smith@myemail.com"),
            "orderdate", BCON_DATE_TIME(1601722184000UL), // 2020-10-03T13:49:44Z
            "value", BCON_INT32(102));

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
            // start-match
            "{", "$match", "{",
            "orderdate", "{",
            "$gte", BCON_DATE_TIME(1577836800000UL), // Represents 2020-01-01T00:00:00Z
            "$lt", BCON_DATE_TIME(1609459200000UL),  // Represents 2021-01-01T00:00:00Z
            "}",
            "}", "}",
            // end-match
            // start-sort1
            "{", "$sort", "{", "orderdate", BCON_INT32(1), "}", "}",
            // end-sort1
            // start-group
            "{", "$group", "{",
            "_id", BCON_UTF8("$customer_id"),
            "first_purchase_date", "{", "$first", BCON_UTF8("$orderdate"), "}",
            "total_value", "{", "$sum", BCON_UTF8("$value"), "}",
            "total_orders", "{", "$sum", BCON_INT32(1), "}",
            "orders", "{", "$push", "{",
            "orderdate", BCON_UTF8("$orderdate"),
            "value", BCON_UTF8("$value"),
            "}", "}",
            "}", "}",
            // end-group
            // start-sort2
            "{", "$sort", "{", "first_purchase_date", BCON_INT32(1), "}", "}",
            // end-sort2
            // start-set
            "{", "$set", "{", "customer_id", BCON_UTF8("$_id"), "}", "}",
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
