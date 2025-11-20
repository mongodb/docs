#include <mongoc/mongoc.h>

#define ASSERT_WITH_ERROR(stmt, err)                                                \
   if (!(stmt)) {                                                                   \
      fprintf(stderr, "Error on line %d (%s): %s\n", __LINE__, #stmt, err.message); \
      abort();                                                                      \
   }

#define ASSERT(stmt)                                               \
   if (!(stmt)) {                                                  \
      fprintf(stderr, "Error on line %d (%s)\n", __LINE__, #stmt); \
      abort();                                                     \
   }

int main(void)
{
   bson_error_t error;

   // Create client configured with Azure OIDC:
   mongoc_client_t *client;
   {
      mongoc_uri_t *uri = mongoc_uri_new_with_error(getenv("MONGODB_URI"), &error);
      ASSERT_WITH_ERROR(uri, error);
      mongoc_uri_set_auth_mechanism(uri, "MONGODB-OIDC");
      bson_t mechanism_properties = BSON_INITIALIZER;
      BSON_APPEND_UTF8(&mechanism_properties, "ENVIRONMENT", "azure");
      BSON_APPEND_UTF8(&mechanism_properties, "TOKEN_RESOURCE", "<managed_identity_client_id>");
      ASSERT(mongoc_uri_set_mechanism_properties(uri, &mechanism_properties));
      client = mongoc_client_new_from_uri_with_error(uri, &error);
      ASSERT_WITH_ERROR(client, error);
      bson_destroy(&mechanism_properties);
      mongoc_uri_destroy(uri);
   }

   // Insert a document:
   {
      bson_t doc = BSON_INITIALIZER;
      mongoc_collection_t *coll = mongoc_client_get_collection(client, "db", "coll");
      ASSERT_WITH_ERROR(mongoc_collection_insert_one(coll, &doc, NULL, NULL, &error), error);
      mongoc_collection_destroy(coll);
   }

   mongoc_client_destroy(client);
   return 0;
}
