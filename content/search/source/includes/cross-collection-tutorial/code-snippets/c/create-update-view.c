   #include <mongoc/mongoc.h>
   #include <stdio.h>
   #include <stdlib.h>
   #include <time.h>
   #include <unistd.h>

   /* Function to update the materialized view */
   void update_monthly_phone_transactions(mongoc_client_t *client, mongoc_collection_t *collection);

   int main(int argc, char *argv[])
   {
       mongoc_client_t *client;
       mongoc_collection_t *sales;
       mongoc_collection_t *purchase_orders;
       
       /* Initialize the MongoDB C Driver */
       mongoc_init();
       
       /* Connect to MongoDB */
       client = mongoc_client_new("<connection-string>");
       sales = mongoc_client_get_collection(client, "sample_supplies", "sales");
       purchase_orders = mongoc_client_get_collection(client, "sample_supplies", "purchaseOrders");
       
       /* Update immediately on startup */
       update_monthly_phone_transactions(client, sales);
       update_monthly_phone_transactions(client, purchase_orders);
       printf("Initial update completed. Materialized view is ready.\n");
       
       /* Example of a simple scheduler that updates monthly */
       time_t now;
       struct tm *local_time;
       int day_of_month = 1; /* Update on the 1st of each month */
       
       while (1) {
           time(&now);
           local_time = localtime(&now);
           
           if (local_time->tm_mday == day_of_month && local_time->tm_hour == 0 && local_time->tm_min == 0) {
               /* It's midnight on the 1st of the month - update the view */
               update_monthly_phone_transactions(client, sales);
               update_monthly_phone_transactions(client, sales);
               printf("Scheduled update completed at %s", ctime(&now));
               
               /* Sleep for an hour to avoid multiple updates */
               sleep(3600);
           } else {
               /* Check again in a minute */
               sleep(60);
           }
       }
       
       /* Clean up */
       mongoc_client_destroy(client);
       mongoc_cleanup();
       
       return 0;
   }

  void update_monthly_phone_transactions(mongoc_client_t *client, mongoc_collection_t *collection)
   {
       bson_t *pipeline;
       mongoc_cursor_t *cursor;
       const bson_t *doc;
       bson_error_t error;
       
       /* Create the aggregation pipeline */
       pipeline = BCON_NEW (
           "pipeline", "[",
               "{", "$match", "{", "purchaseMethod", BCON_UTF8("Phone"), "}", "}",
               "{", "$unwind", "{", "path", BCON_UTF8("$items"), "}", "}",
               "{", "$group", "{",
                   "_id", "{", "$dateToString", "{", 
                       "format", BCON_UTF8("%Y-%m"), 
                       "date", BCON_UTF8("$saleDate"),
                   "}", "}",
                   "sales_quantity", "{", "$sum", BCON_UTF8("$items.quantity"), "}",
                   "sales_price", "{", "$sum", BCON_UTF8("$items.price"), "}",
               "}", "}",
               "{", "$set", "{", "sales_price", "{", "$toDouble", BCON_UTF8("$sales_price"), "}", "}", "}",
               "{", "$merge", "{", "into", BCON_UTF8("monthlyPhoneTransactions"), "whenMatched", BCON_UTF8("replace"), "}", "}",
           "]"
       );
       
       /* Run the aggregation */
       cursor = mongoc_collection_aggregate(
           collection, MONGOC_QUERY_NONE, pipeline, NULL, NULL);

       while (mongoc_cursor_next(cursor, &doc)) {
        /* Consume the cursor to execute the pipeline */
       }
       
       
       if (mongoc_cursor_error(cursor, &error)) {
           fprintf(stderr, "Aggregation error: %s\n", error.message);
       }
       
       /* Clean up */
       bson_destroy(pipeline);
       mongoc_cursor_destroy(cursor);
       mongoc_collection_destroy(collection);
   }