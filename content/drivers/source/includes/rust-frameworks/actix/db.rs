use mongodb::{options::ClientOptions, Client, Database};

pub async fn init_db(mongo_uri: &str) -> Database {
    let mut client_options = ClientOptions::parse(mongo_uri)
        .await
        .expect("Failed to parse MongoDB connection string");

    client_options.app_name = Some("actix_quickstart".to_string());

    let client = Client::with_options(client_options)
        .expect("Failed to initialize MongoDB client");

    client.database("sample_restaurants")
}