#include <bson/bson.h>
#include <mongoc/mongoc.h>

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static char const *
getenv_or_exit (char const *name)
{
   char const *value = getenv (name);
   if (!value) {
      fprintf (stderr, "Set the %s environment variable\n", name);
      exit (EXIT_FAILURE);
   }
   return value;
}

// start-get-kms-provider-credentials
static bson_t *
get_kms_provider_credentials (char const *kms_provider_name)
{
   if (strcmp (kms_provider_name, "local") == 0) {
      // start-read-local-key
      char const *key_file_path = "customer-master-key.txt";
      uint8_t key[96];
      FILE *key_file = fopen (key_file_path, "rb");

      if (!key_file) {
         fprintf (stderr,
                  "Could not open %s. Generate a 96-byte customer master key by running "
                  "'openssl rand 96 > %s' and try again.\n",
                  key_file_path,
                  key_file_path);
         exit (EXIT_FAILURE);
      }

      size_t bytes_read = fread (key, 1, sizeof (key), key_file);
      fclose (key_file);
      if (bytes_read != sizeof (key)) {
         fprintf (stderr, "Expected the customer master key file to be 96 bytes.\n");
         exit (EXIT_FAILURE);
      }
      // end-read-local-key

      bson_t *kms_providers = BCON_NEW (
         "local", "{", "key", BCON_BIN (BSON_SUBTYPE_BINARY, key, sizeof (key)), "}");
      return kms_providers;
   }

   if (strcmp (kms_provider_name, "aws") == 0) {
      // start-aws-kms-credentials
      bson_t *kms_providers = BCON_NEW ("aws",
                                        "{",
                                        "accessKeyId",
                                        BCON_UTF8 (getenv_or_exit ("AWS_ACCESS_KEY_ID")),
                                        "secretAccessKey",
                                        BCON_UTF8 (getenv_or_exit ("AWS_SECRET_ACCESS_KEY")),
                                        "}");
      return kms_providers;
      // end-aws-kms-credentials
   }

   if (strcmp (kms_provider_name, "azure") == 0) {
      // start-azure-kms-credentials
      bson_t *kms_providers = BCON_NEW ("azure",
                                        "{",
                                        "tenantId",
                                        BCON_UTF8 (getenv_or_exit ("AZURE_TENANT_ID")),
                                        "clientId",
                                        BCON_UTF8 (getenv_or_exit ("AZURE_CLIENT_ID")),
                                        "clientSecret",
                                        BCON_UTF8 (getenv_or_exit ("AZURE_CLIENT_SECRET")),
                                        "}");
      return kms_providers;
      // end-azure-kms-credentials
   }

   if (strcmp (kms_provider_name, "gcp") == 0) {
      // start-gcp-kms-credentials
      bson_t *kms_providers = BCON_NEW ("gcp",
                                        "{",
                                        "email",
                                        BCON_UTF8 (getenv_or_exit ("GCP_EMAIL")),
                                        "privateKey",
                                        BCON_UTF8 (getenv_or_exit ("GCP_PRIVATE_KEY")),
                                        "}");
      return kms_providers;
      // end-gcp-kms-credentials
   }

   if (strcmp (kms_provider_name, "kmip") == 0) {
      // start-kmip-kms-credentials
      bson_t *kms_providers =
         BCON_NEW ("kmip", "{", "endpoint", BCON_UTF8 (getenv_or_exit ("KMIP_KMS_ENDPOINT")), "}");
      return kms_providers;
      // end-kmip-kms-credentials
   }

   fprintf (stderr, "Specify a valid KMS provider name.\n");
   exit (EXIT_FAILURE);
}
// end-get-kms-provider-credentials

// start-get-customer-master-key
static bson_t *
get_customer_master_key (char const *kms_provider_name)
{
   if (strcmp (kms_provider_name, "kmip") == 0 || strcmp (kms_provider_name, "local") == 0) {
      // start-kmip-local-cmk-credentials
      return bson_new ();
      // end-kmip-local-cmk-credentials
   }

   if (strcmp (kms_provider_name, "aws") == 0) {
      // start-aws-cmk-credentials
      return BCON_NEW ("key",
                       BCON_UTF8 (getenv_or_exit ("AWS_KEY_ARN")),
                       "region",
                       BCON_UTF8 (getenv_or_exit ("AWS_KEY_REGION")));
      // end-aws-cmk-credentials
   }

   if (strcmp (kms_provider_name, "azure") == 0) {
      // start-azure-cmk-credentials
      return BCON_NEW ("keyVaultEndpoint",
                       BCON_UTF8 (getenv_or_exit ("AZURE_KEY_VAULT_ENDPOINT")),
                       "keyName",
                       BCON_UTF8 (getenv_or_exit ("AZURE_KEY_NAME")));
      // end-azure-cmk-credentials
   }

   if (strcmp (kms_provider_name, "gcp") == 0) {
      // start-gcp-cmk-credentials
      return BCON_NEW ("projectId",
                       BCON_UTF8 (getenv_or_exit ("GCP_PROJECT_ID")),
                       "location",
                       BCON_UTF8 (getenv_or_exit ("GCP_LOCATION")),
                       "keyRing",
                       BCON_UTF8 (getenv_or_exit ("GCP_KEY_RING")),
                       "keyName",
                       BCON_UTF8 (getenv_or_exit ("GCP_KEY_NAME")));
      // end-gcp-cmk-credentials
   }

   fprintf (stderr, "Specify a valid KMS provider name.\n");
   exit (EXIT_FAILURE);
}
// end-get-customer-master-key

// start-get-auto-encryption-options
static mongoc_auto_encryption_opts_t *
get_auto_encryption_options (char const *kms_provider_name, char const *key_vault_db, char const *key_vault_coll, bson_t const *kms_providers)
{
   // start-auto-encryption-options
   mongoc_auto_encryption_opts_t *auto_encryption_opts = mongoc_auto_encryption_opts_new ();
   mongoc_auto_encryption_opts_set_keyvault_namespace (auto_encryption_opts, key_vault_db, key_vault_coll);
   mongoc_auto_encryption_opts_set_kms_providers (auto_encryption_opts, kms_providers);

   bson_t *extra = BCON_NEW ("cryptSharedLibPath", BCON_UTF8 (getenv_or_exit ("SHARED_LIB_PATH")));
   mongoc_auto_encryption_opts_set_extra (auto_encryption_opts, extra);
   bson_destroy (extra);
   // end-auto-encryption-options

   if (strcmp (kms_provider_name, "kmip") == 0) {
      // start-kmip-tls-options
      bson_t *tls_opts = BCON_NEW ("kmip",
                                   "{",
                                   "tlsCAFile",
                                   BCON_UTF8 (getenv_or_exit ("KMIP_TLS_CA_FILE")),
                                   "tlsCertificateKeyFile",
                                   BCON_UTF8 (getenv_or_exit ("KMIP_TLS_CERT_FILE")),
                                   "}");
      mongoc_auto_encryption_opts_set_tls_opts (auto_encryption_opts, tls_opts);
      bson_destroy (tls_opts);
      // end-kmip-tls-options
   }

   return auto_encryption_opts;
}
// end-get-auto-encryption-options

// start-get-client-encryption
static mongoc_client_encryption_t *
get_client_encryption (char const *kms_provider_name, mongoc_client_t *key_vault_client, char const *key_vault_db, char const *key_vault_coll, bson_t const *kms_providers)
{
   // start-client-encryption
   mongoc_client_encryption_opts_t *client_encryption_opts = mongoc_client_encryption_opts_new ();
   mongoc_client_encryption_opts_set_keyvault_namespace (client_encryption_opts, key_vault_db, key_vault_coll);
   mongoc_client_encryption_opts_set_keyvault_client (client_encryption_opts, key_vault_client);
   mongoc_client_encryption_opts_set_kms_providers (client_encryption_opts, kms_providers);
   // end-client-encryption

   if (strcmp (kms_provider_name, "kmip") == 0) {
      // start-kmip-client-encryption
      bson_t *tls_opts = BCON_NEW ("kmip",
                                   "{",
                                   "tlsCAFile",
                                   BCON_UTF8 (getenv_or_exit ("KMIP_TLS_CA_FILE")),
                                   "tlsCertificateKeyFile",
                                   BCON_UTF8 (getenv_or_exit ("KMIP_TLS_CERT_FILE")),
                                   "}");
      mongoc_client_encryption_opts_set_tls_opts (client_encryption_opts, tls_opts);
      bson_destroy (tls_opts);
      // end-kmip-client-encryption
   }

   bson_error_t error;
   mongoc_client_encryption_t *client_encryption = mongoc_client_encryption_new (client_encryption_opts, &error);
   if (!client_encryption) {
      fprintf (stderr, "Error creating client encryption: %s\n", error.message);
      exit (EXIT_FAILURE);
   }

   mongoc_client_encryption_opts_destroy (client_encryption_opts);
   return client_encryption;
}
// end-get-client-encryption

int
main (void)
{
   mongoc_init ();

   // start-setup-application-variables
   char const *kms_provider_name = "<KMS provider name>";
   char const *uri_string = getenv_or_exit ("MONGODB_URI");
   char const *key_vault_db_name = "encryption";
   char const *key_vault_coll_name = "__keyVault";
   char const *encrypted_db_name = "medicalRecords";
   char const *encrypted_coll_name = "patients";
   // end-setup-application-variables

   // start-get-credentials-and-options
   bson_t *kms_providers = get_kms_provider_credentials (kms_provider_name);
   bson_t *customer_master_key = get_customer_master_key (kms_provider_name);

   mongoc_auto_encryption_opts_t *auto_encryption_opts =
      get_auto_encryption_options (kms_provider_name, key_vault_db_name, key_vault_coll_name, kms_providers);
   // end-get-credentials-and-options

   // start-create-client
   mongoc_client_t *encrypted_client = mongoc_client_new (uri_string);

   bson_error_t error;
   if (!mongoc_client_enable_auto_encryption (encrypted_client, auto_encryption_opts, &error)) {
      fprintf (stderr, "Error enabling auto encryption: %s\n", error.message);
      exit (EXIT_FAILURE);
   }
   // end-create-client

   mongoc_collection_t *key_vault_coll = mongoc_client_get_collection (encrypted_client, key_vault_db_name, key_vault_coll_name);
   mongoc_collection_drop (key_vault_coll, NULL);
   mongoc_collection_destroy (key_vault_coll);

   mongoc_collection_t *encrypted_coll = mongoc_client_get_collection (encrypted_client, encrypted_db_name, encrypted_coll_name);
   mongoc_collection_drop (encrypted_coll, NULL);
   mongoc_collection_destroy (encrypted_coll);

   // start-create-client-encryption
   mongoc_client_encryption_t *client_encryption =
      get_client_encryption (kms_provider_name, encrypted_client, key_vault_db_name, key_vault_coll_name, kms_providers);
   // end-create-client-encryption

   // start-encrypted-fields-map
   bson_t *encrypted_fields = BCON_NEW ("fields",
                                        "[",
                                        "{",
                                        "path",
                                        BCON_UTF8 ("patientRecord.ssn"),
                                        "bsonType",
                                        BCON_UTF8 ("string"),
                                        "keyId",
                                        BCON_NULL,
                                        "queries",
                                        "{",
                                        "queryType",
                                        BCON_UTF8 ("equality"),
                                        "}",
                                        "}",
                                        "{",
                                        "path",
                                        BCON_UTF8 ("patientRecord.billing"),
                                        "bsonType",
                                        BCON_UTF8 ("object"),
                                        "keyId",
                                        BCON_NULL,
                                        "}",
                                        "]");
   // end-encrypted-fields-map

   // start-create-encrypted-collection
   bson_t *create_collection_opts = BCON_NEW ("encryptedFields", BCON_DOCUMENT (encrypted_fields));
   bson_t created_collection_opts = BSON_INITIALIZER;

   mongoc_database_t *encrypted_db = mongoc_client_get_database (encrypted_client, encrypted_db_name);
   mongoc_collection_t *encrypted_collection = mongoc_client_encryption_create_encrypted_collection (
      client_encryption,
      encrypted_db,
      encrypted_coll_name,
      create_collection_opts,
      &created_collection_opts,
      kms_provider_name,
      customer_master_key,
      &error);

   if (!encrypted_collection) {
      fprintf (stderr, "Error creating encrypted collection: %s\n", error.message);
      exit (EXIT_FAILURE);
   }
   // end-create-encrypted-collection

   // start-insert-document
   bson_t *patient_document = BCON_NEW ("patientName",
                                        BCON_UTF8 ("Jon Doe"),
                                        "patientId",
                                        BCON_INT32 (12345678),
                                        "patientRecord",
                                        "{",
                                        "ssn",
                                        BCON_UTF8 ("987-65-4320"),
                                        "billing",
                                        "{",
                                        "type",
                                        BCON_UTF8 ("Visa"),
                                        "number",
                                        BCON_UTF8 ("4111111111111111"),
                                        "}",
                                        "billAmount",
                                        BCON_INT32 (1500),
                                        "}");

   if (!mongoc_collection_insert_one (encrypted_collection, patient_document, NULL, NULL, &error)) {
      fprintf (stderr, "Error inserting document: %s\n", error.message);
      exit (EXIT_FAILURE);
   }
   // end-insert-document

   // start-find-document
   bson_t *filter = BCON_NEW ("patientRecord.ssn", BCON_UTF8 ("987-65-4320"));
   mongoc_cursor_t *cursor = mongoc_collection_find_with_opts (encrypted_collection, filter, NULL, NULL);

   bson_t const *doc;
   if (mongoc_cursor_next (cursor, &doc)) {
      char *json = bson_as_canonical_extended_json (doc, NULL);
      printf ("%s\n", json);
      bson_free (json);
   } else {
      printf ("Document not found\n");
   }
   // end-find-document

   bson_destroy (filter);
   mongoc_cursor_destroy (cursor);
   bson_destroy (patient_document);
   bson_destroy (create_collection_opts);
   bson_destroy (&created_collection_opts);
   bson_destroy (encrypted_fields);
   mongoc_collection_destroy (encrypted_collection);
   mongoc_database_destroy (encrypted_db);
   mongoc_client_encryption_destroy (client_encryption);
   mongoc_auto_encryption_opts_destroy (auto_encryption_opts);
   bson_destroy (kms_providers);
   bson_destroy (customer_master_key);
   mongoc_client_destroy (encrypted_client);

   mongoc_cleanup ();
   return 0;
}
