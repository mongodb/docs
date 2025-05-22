kms_providers = vec![(
    KmsProvider::kmip().with_name("my_kmip_provider"),
    doc! {
        "endpoint": env::var("KMIP_KMS_ENDPOINT").expect("Set KMIP_KMS_ENDPOINT environment variable")
    },
    Some(get_kmip_tls_options()),
)];