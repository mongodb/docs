auto const kms_providers = make_document(kvp("kmip:my_kmip_provider", make_document(
    kvp("endpoint", getenv_or_throw("KMIP_KMS_ENDPOINT")))));
