kms_providers = vec![(
    KmsProvider::azure().with_name("my_azure_provider"),
    doc! {
        "tenantId": env::var("AZURE_TENANT_ID").expect("Set AZURE_TENANT_ID environment variable"),
        "clientId": env::var("AZURE_CLIENT_ID").expect("Set AZURE_CLIENT_ID environment variable"),
        "clientSecret": env::var("AZURE_CLIENT_SECRET").expect("AZURE_CLIENT_SECRET environment variable"),
    },
    None,
)];