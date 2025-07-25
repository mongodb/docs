use mongodb::{ bson::doc, options::{ ClientOptions, Credential, AuthMechanism }, Client };

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let mut client_options = ClientOptions::parse_async(uri).await?;

    // start-ldap
    let plain_cred = Credential::builder()
        .username("<username>".to_string())
        .password("<password>".to_string())
        .mechanism(AuthMechanism::Plain)
        .source("$external".to_string())
        .build();

    client_options.credential = Some(plain_cred);
    let client = Client::with_options(client_options)?;
    // end-ldap

    Ok(())
}
