use mongodb::{ bson::doc, options::{ ClientOptions, Credential, AuthMechanism }, Client };

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    // start-default
    let uri = "<connection string>";
    let mut client_options = ClientOptions::parse(uri).await?;

    let default_cred = Credential::builder()
        .username("<db_username>".to_string())
        .password("<db_password>".to_string())
        .source("<db>".to_string())
        .build();

    client_options.credential = Some(default_cred);
    let client = Client::with_options(client_options)?;
    // end-default

    // start-scramsha256
    let uri = "<connection string>";
    let mut client_options = ClientOptions::parse(uri).await?;

    let scram_sha_256_cred = Credential::builder()
        .username("<db_username>".to_string())
        .password("<db_password>".to_string())
        .mechanism(AuthMechanism::ScramSha256)
        .source("<db>".to_string())
        .build();

    client_options.credential = Some(scram_sha_256_cred);
    let client = Client::with_options(client_options)?;
    // end-scramsha256

    // start-scramsha1
    let uri = "<connection string>";
    let mut client_options = ClientOptions::parse(uri).await?;

    let scram_sha_1_cred = Credential::builder()
        .username("<db_username>".to_string())
        .password("<db_password>".to_string())
        .mechanism(AuthMechanism::ScramSha1)
        .source("<db>".to_string())
        .build();

    client_options.credential = Some(scram_sha_1_cred);
    let client = Client::with_options(client_options)?;
    // end-scramsha1

    // start-aws
    let uri = "<connection string>";
    let mut client_options = ClientOptions::parse(uri).await?;

    let aws_cred = Credential::builder()
        .username("<access key ID>".to_string())
        .password("<secret access key>".to_string())
        .source("<db>".to_string())
        .mechanism(AuthMechanism::MongoDbAws)
        .mechanism_properties(doc!("AWS_SESSION_TOKEN": "<session token>"))
        .build();

    client_options.credential = Some(aws_cred);
    let client = Client::with_options(client_options)?;
    // end-aws

    // start-aws-env-var
    let uri = "<connection string>";
    let mut client_options = ClientOptions::parse(uri).await?;

    let aws_cred = Credential::builder().mechanism(AuthMechanism::MongoDbAws).build();

    client_options.credential = Some(aws_cred);
    let client = Client::with_options(client_options)?;
    // end-aws-env-var

    // start-x509
    let uri = format!(
        "mongodb://<hostname>:<port>/?tlsCAFile={tlsCAFile}\
        &tlsCertificateKeyFile={tlsCertificateKeyFile}",
        tlsCAFile = "<path to CA certificate>",
        tlsCertificateKeyFile = "<path to private client key>"
    );
    let mut client_options = ClientOptions::parse(uri).await?;
    let x509_cred = Credential::builder().mechanism(AuthMechanism::MongoDbX509).build();

    client_options.credential = Some(x509_cred);
    let client = Client::with_options(client_options)?;
    // end-x509

    Ok(())
}
