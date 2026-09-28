kms_providers = vec![(
    KmsProvider::gcp().with_name("my_gcp_provider"),
    doc! {
        "email": env::var("GCP_EMAIL").expect("Set GCP_EMAIL environment variable"),
        "privateKey": env::var("GCP_PRIVATE_KEY").expect("Set GCP_PRIVATE_KEY environment variable"),
    },
    None,
)];