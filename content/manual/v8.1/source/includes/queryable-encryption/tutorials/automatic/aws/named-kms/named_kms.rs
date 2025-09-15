kms_providers = vec![(
    KmsProvider::aws().with_name("my_aws_provider"),
    doc! {
        "accessKeyId": env::var("AWS_ACCESS_KEY_ID").expect("Set AWS_ACCESS_KEY_ID environment variable"),
        "secretAccessKey": env::var("AWS_SECRET_ACCESS_KEY").expect("Set AWS_SECRET_ACCESS_KEY environment variable"),
    },
    None,
)];