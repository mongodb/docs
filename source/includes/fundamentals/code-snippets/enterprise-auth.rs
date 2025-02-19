use mongodb::options::oidc::{self, Callback, CallbackContext, IdpServerResponse};
use mongodb::{ 
    bson::doc, 
    bson::Document,
    options::{ClientOptions, Credential, AuthMechanism}, 
    Client,
};
use std::error::Error;
use futures::FutureExt;

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let mut client_options = ClientOptions::parse(uri).await?;

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

    // start-azure-imds
    let credential = Credential::builder()
        .username("<username>".to_owned())
        .mechanism(AuthMechanism::MongoDbOidc)
        .mechanism_properties(
            doc! { "ENVIRONMENT": "azure", "TOKEN_RESOURCE": "<audience>" }
        )
        .build();
    
    client_options.credential = Some(credential);
    let client = Client::with_options(client_options)?;
    let res = client
        .database("test")
        .collection::<Document>("test")
        .find_one(doc! {})
        .await?;
    // end-azure-imds

    // start-gcp-imds
    let credential = Credential::builder()
        .mechanism(AuthMechanism::MongoDbOidc)
        .mechanism_properties(
            doc! { "ENVIRONMENT": "gcp", "TOKEN_RESOURCE": "<audience>" }
        )
        .build();
    
    client_options.credential = Some(credential);
    let client = Client::with_options(client_options)?;
    let res = client
        .database("test")
        .collection::<Document>("test")
        .find_one(doc! {})
        .await?;
    // end-gcp-imds

    // start-kubernetes
    let credential = Credential::builder()
    .mechanism(AuthMechanism::MongoDbOidc)
    .mechanism_properties(
        doc! { "ENVIRONMENT": "k8s" }
    )
    .build();

    client_options.credential = Some(credential);
    let client = Client::with_options(client_options)?;
    let res = client
        .database("test")
        .collection::<Document>("test")
        .find_one(doc! {})
        .await?;
    // end-kubernetes

    // start-custom-callback-machine
    let credential = Credential::builder()
    .mechanism(AuthMechanism::MongoDbOidc)
    .oidc_callback(oidc::Callback::machine(move |_| {
        async move {
            let token_file_path = std::env::var("AWS_WEB_IDENTITY_TOKEN_FILE").map_err(mongodb::error::Error::custom)?;
            let access_token = tokio::fs::read_to_string(token_file_path).await?;
            Ok(IdpServerResponse::builder().access_token(access_token).build())
        }
        .boxed()
    }))
    .build()
    .into();

    client_options.credential = Some(credential);
    let client = Client::with_options(client_options)?;

    let res = client
        .database("test")
        .collection::<Document>("test")
        .find_one(doc! {})
        .await?;
    // end-custom-callback-machine

    // start-custom-callback-user
    let callback = Callback::human(move |context| {
        async move {
            "<human flow>";
            todo!("human flow")
        }
        .boxed()
    });
    let credential = Credential::builder()
        .mechanism(AuthMechanism::MongoDbOidc)
        .oidc_callback(callback)
        .build();
    client_options.credential = Some(credential);
    let client = Client::with_options(client_options)?;

    let res = client
        .database("test")
        .collection::<Document>("test")
        .find_one(doc! {})
        .await?;
    // end-custom-callback-user

    Ok(())
}
