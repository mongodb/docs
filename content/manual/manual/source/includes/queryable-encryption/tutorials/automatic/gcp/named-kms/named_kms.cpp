auto const kms_providers = make_document(kvp("gcp:my_gcp_provider", make_document(
    kvp("email", getenv_or_throw("GCP_EMAIL")),
    kvp("privateKey", getenv_or_throw("GCP_PRIVATE_KEY")))));
