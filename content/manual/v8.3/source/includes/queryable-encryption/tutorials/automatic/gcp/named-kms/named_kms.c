bson_t *kms_providers = BCON_NEW ("gcp:my_gcp_provider",
                                  "{",
                                  "email",
                                  BCON_UTF8 (getenv_or_exit ("GCP_EMAIL")),
                                  "privateKey",
                                  BCON_UTF8 (getenv_or_exit ("GCP_PRIVATE_KEY")),
                                  "}");
