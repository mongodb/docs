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

static mongoc_oidc_credential_t *
oidc_callback_fn(mongoc_oidc_callback_params_t *params)
{
   FILE *token_file = fopen("/tmp/tokens/test_machine", "r");
   ASSERT(token_file);

   // Determine length of token:
   ASSERT(0 == fseek(token_file, 0, SEEK_END));
   long token_len = ftell(token_file);
   ASSERT(token_len > 0);
   ASSERT(0 == fseek(token_file, 0, SEEK_SET));

   // Read file into buffer:
   char *token = bson_malloc(token_len + 1);
   size_t nread = fread(token, 1, token_len, token_file);
   ASSERT(nread == (size_t)token_len);
   token[token_len] = '\0';
   fclose(token_file);
   mongoc_oidc_credential_t *cred = mongoc_oidc_credential_new(token);
   bson_free(token);
   return cred;
}

int main(void)
{
   bson_error_t error;

   // Create client configured with OIDC callback:
   mongoc_client_t *client;
   {
      mongoc_uri_t *uri = mongoc_uri_new_with_error(getenv("MONGODB_URI"), &error);
      ASSERT_WITH_ERROR(uri, error);
      mongoc_uri_set_auth_mechanism(uri, "MONGODB-OIDC");
      mongoc_oidc_callback_t *oidc_callback = mongoc_oidc_callback_new(oidc_callback_fn);
      client = mongoc_client_new_from_uri_with_error(uri, &error);
      ASSERT_WITH_ERROR(client, error);
      ASSERT(mongoc_client_set_oidc_callback(client, oidc_callback));
      mongoc_oidc_callback_destroy(oidc_callback);
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
