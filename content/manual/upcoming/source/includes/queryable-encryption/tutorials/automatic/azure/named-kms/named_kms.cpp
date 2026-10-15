auto const kms_providers = make_document(kvp("azure:my_azure_provider", make_document(
    kvp("tenantId", getenv_or_throw("AZURE_TENANT_ID")),
    kvp("clientId", getenv_or_throw("AZURE_CLIENT_ID")),
    kvp("clientSecret", getenv_or_throw("AZURE_CLIENT_SECRET")))));
