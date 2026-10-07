#include <inttypes.h>
#include <stdio.h>
#include <bson/bson.h>
#include <mongoc/mongoc.h>

int main(void)
{
   mongoc_init();

   mongoc_client_t *client = mongoc_client_new("<connection string URI>");

   // Creates a bulk write operation handle
   // start-create-bulk-write-t
   mongoc_bulkwrite_t *bulk = mongoc_client_bulkwrite_new(client);
   // end-create-bulk-write-t

   {
      // Creates insert operation instructions and adds the operation to the bulk write
      // start-bulk-write-t-insert
      bson_t *insert_doc = BCON_NEW(
         "name", BCON_UTF8("Mongo's Deli"),
         "cuisine", BCON_UTF8("Sandwiches"),
         "borough", BCON_UTF8("Manhattan"),
         "restaurant_id", BCON_UTF8("1234")
      );
      bson_error_t error;

      if (!mongoc_bulkwrite_append_insertone(
             bulk, "sample_restaurants.restaurants", insert_doc, NULL, &error)) {
         fprintf(stderr, "Failed to add insert operation: %s\n", error.message);
      }

      bson_destroy(insert_doc);
      // end-bulk-write-t-insert
   }

   {
      // Bulk write generic example
      // start-bulk-write-t-generic
      bson_error_t error;

      mongoc_bulkwrite_t *bulk = mongoc_client_bulkwrite_new(client);

      bson_t *insert_doc = BCON_NEW(
         "<field name 1>", BCON_UTF8("<value 1>"),
         "<field name 2>", BCON_UTF8("<value 2>"),
         "<field name 3>", BCON_UTF8("<value 3>"),
         "<field name 4>", BCON_UTF8("<value 4>")
      );

      mongoc_bulkwrite_append_insertone(
         bulk, "sample_restaurants.restaurants", insert_doc, NULL, &error);
      bson_destroy(insert_doc);

      bson_t *query = BCON_NEW("<field to match>", BCON_UTF8("<value to match>"));
      bson_t *update = BCON_NEW("$set", "{", "<field name>", BCON_UTF8("<value>"), "}");

      mongoc_bulkwrite_append_updateone(
         bulk, "sample_restaurants.restaurants", query, update, NULL, &error);
      bson_destroy(query);
      bson_destroy(update);

      mongoc_bulkwritereturn_t result = mongoc_bulkwrite_execute(bulk, NULL);

      if (result.exc) {
         if (mongoc_bulkwriteexception_error(result.exc, &error)) {
            fprintf(stderr, "Bulk write error: %s\n", error.message);
         }
      }

      mongoc_bulkwriteresult_destroy(result.res);
      mongoc_bulkwriteexception_destroy(result.exc);
      mongoc_bulkwrite_destroy(bulk);
      // end-bulk-write-t-generic
   }

   {
      // Creates update one operation instructions and adds the operation to the bulk write
      // start-bulk-write-t-update-one
      bson_t *filter_doc = BCON_NEW("name", BCON_UTF8("Mongo's Deli"));
      bson_t *update_doc = BCON_NEW("$set", "{", "cuisine", BCON_UTF8("Sandwiches and Salads"), "}");
      bson_error_t error;

      if (!mongoc_bulkwrite_append_updateone(
             bulk, "sample_restaurants.restaurants", filter_doc, update_doc, NULL, &error)) {
         fprintf(stderr, "Failed to add update operation: %s\n", error.message);
      }

      bson_destroy(filter_doc);
      bson_destroy(update_doc);
      // end-bulk-write-t-update-one
   }

   {
      // Creates update many operation instructions and adds the operation to the bulk write
      // start-bulk-write-t-update-many
      bson_t *filter_doc = BCON_NEW("name", BCON_UTF8("Mongo's Deli"));
      bson_t *update_doc = BCON_NEW("$set", "{", "cuisine", BCON_UTF8("Sandwiches and Salads"), "}");
      bson_error_t error;

      if (!mongoc_bulkwrite_append_updatemany(
             bulk, "sample_restaurants.restaurants", filter_doc, update_doc, NULL, &error)) {
         fprintf(stderr, "Failed to add update operation: %s\n", error.message);
      }

      bson_destroy(filter_doc);
      bson_destroy(update_doc);
      // end-bulk-write-t-update-many
   }

   {
      // Creates replace one operation instructions and adds the operation to the bulk write
      // start-bulk-write-t-replace-one
      bson_t *filter_doc = BCON_NEW("restaurant_id", BCON_UTF8("1234"));
      bson_t *replace_doc = BCON_NEW(
         "name", BCON_UTF8("Mongo's Deli"),
         "cuisine", BCON_UTF8("Sandwiches and Salads"),
         "borough", BCON_UTF8("Brooklyn"),
         "restaurant_id", BCON_UTF8("5678")
      );
      bson_error_t error;

      if (!mongoc_bulkwrite_append_replaceone(
             bulk, "sample_restaurants.restaurants", filter_doc, replace_doc, NULL, &error)) {
         fprintf(stderr, "Failed to add replace operation: %s\n", error.message);
      }

      bson_destroy(filter_doc);
      bson_destroy(replace_doc);
      // end-bulk-write-t-replace-one
   }

   {
      // Creates delete one operation instructions and adds the operation to the bulk write
      // start-bulk-write-t-delete-one
      bson_t *filter_doc = BCON_NEW("name", BCON_UTF8("Mongo's Deli"));
      bson_error_t error;

      if (!mongoc_bulkwrite_append_deleteone(
             bulk, "sample_restaurants.restaurants", filter_doc, NULL, &error)) {
         fprintf(stderr, "Failed to add delete operation: %s\n", error.message);
      }

      bson_destroy(filter_doc);
      // end-bulk-write-t-delete-one
   }

   {
      // Creates delete many operation instructions and adds the operation to the bulk write
      // start-bulk-write-t-delete-many
      bson_t *filter_doc = BCON_NEW("borough", BCON_UTF8("Manhattan"));
      bson_error_t error;

      if (!mongoc_bulkwrite_append_deletemany(
             bulk, "sample_restaurants.restaurants", filter_doc, NULL, &error)) {
         fprintf(stderr, "Failed to add delete operation: %s\n", error.message);
      }

      bson_destroy(filter_doc);
      // end-bulk-write-t-delete-many
   }

   {
      // Executes the bulk write and prints the result counts
      // start-bulk-write-t-execute
      bson_error_t error;
      mongoc_bulkwritereturn_t result = mongoc_bulkwrite_execute(bulk, NULL);

      if (result.exc) {
         if (mongoc_bulkwriteexception_error(result.exc, &error)) {
            fprintf(stderr, "Bulk write error: %s\n", error.message);
         }
      } else if (result.res) {
         printf("Inserted: %" PRId64 " document(s)\n",
                mongoc_bulkwriteresult_insertedcount(result.res));
         printf("Matched: %" PRId64 " document(s)\n",
                mongoc_bulkwriteresult_matchedcount(result.res));
         printf("Modified: %" PRId64 " document(s)\n",
                mongoc_bulkwriteresult_modifiedcount(result.res));
         printf("Deleted: %" PRId64 " document(s)\n",
                mongoc_bulkwriteresult_deletedcount(result.res));
      }

      mongoc_bulkwriteresult_destroy(result.res);
      mongoc_bulkwriteexception_destroy(result.exc);
      // end-bulk-write-t-execute
   }

   {
      // Creates a bulk write operation handle and instructs the operation to not run in order
      // start-bulk-write-t-unordered
      mongoc_bulkwriteopts_t *opts = mongoc_bulkwriteopts_new();
      mongoc_bulkwriteopts_set_ordered(opts, false);

      mongoc_bulkwrite_t *bulk = mongoc_client_bulkwrite_new(client);

      // Perform bulk operation

      mongoc_bulkwritereturn_t result = mongoc_bulkwrite_execute(bulk, opts);

      mongoc_bulkwriteresult_destroy(result.res);
      mongoc_bulkwriteexception_destroy(result.exc);

      mongoc_bulkwriteopts_destroy(opts);
      mongoc_bulkwrite_destroy(bulk);
      // end-bulk-write-t-unordered
   }

   mongoc_bulkwrite_destroy(bulk);
   mongoc_client_destroy(client);
   mongoc_cleanup();

   return 0;
}
