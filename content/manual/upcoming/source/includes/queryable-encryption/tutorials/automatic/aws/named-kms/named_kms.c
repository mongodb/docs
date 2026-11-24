bson_t *kms_providers = BCON_NEW ("aws:my_aws_provider",
                                  "{",
                                  "accessKeyId",
                                  BCON_UTF8 (getenv_or_exit ("AWS_ACCESS_KEY_ID")),
                                  "secretAccessKey",
                                  BCON_UTF8 (getenv_or_exit ("AWS_SECRET_ACCESS_KEY")),
                                  "}");
