bson_t *kms_providers =
   BCON_NEW ("kmip:my_kmip_provider", "{", "endpoint", BCON_UTF8 (getenv_or_exit ("KMIP_KMS_ENDPOINT")), "}");
