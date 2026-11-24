bson_t *kms_providers = BCON_NEW ("azure:my_azure_provider",
                                  "{",
                                  "tenantId",
                                  BCON_UTF8 (getenv_or_exit ("AZURE_TENANT_ID")),
                                  "clientId",
                                  BCON_UTF8 (getenv_or_exit ("AZURE_CLIENT_ID")),
                                  "clientSecret",
                                  BCON_UTF8 (getenv_or_exit ("AZURE_CLIENT_SECRET")),
                                  "}");
