auto const kms_providers = make_document(kvp("aws:my_aws_provider", make_document(
    kvp("accessKeyId", getenv_or_throw("AWS_ACCESS_KEY_ID")),
    kvp("secretAccessKey", getenv_or_throw("AWS_SECRET_ACCESS_KEY")))));
