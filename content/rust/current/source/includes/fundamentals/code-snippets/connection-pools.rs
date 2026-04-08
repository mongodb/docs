use mongodb::{
    bson::{doc, oid::ObjectId, Bson},
    options::{ClientOptions, WriteConcern},
    Client
};
use futures_util::{
    io::AsyncWriteExt,
    AsyncReadExt,
    TryStreamExt
};
use std::{
    fs,
    str::FromStr,
    time::Duration,
};

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;
    let my_db = client.database("db");

    // start-default-client
    let client_default = Client::with_uri_str(uri).await?;
    // end-default-client

    // start-connection-options
    let mut client_options = ClientOptions::parse(uri).await?;
        client_options.max_pool_size = Some(20);
        client_options.max_connecting = Some(3);
        client_options.min_pool_size = Some(1);
        client_options.max_idle_time = Some(Duration::new(90, 0));
    
    let client_custom = Client::with_options(client_options)?;
    // end-connection-options

    // start-max-pool-size
    let mut client_options = ClientOptions::parse(uri).await?;
        client_options.max_pool_size = Some(20);

    let client_max_pool = Client::with_options(client_options)?;
    // end-max-pool-size
    
    // start-concurrent-connections
    let mut client_options = ClientOptions::parse(uri).await?;
        client_options.max_connecting = Some(3);

    let client_concurrent = Client::with_options(client_options)?;
    // end-concurrent-connections
    
    // start-min-pool-size
    let mut client_options = ClientOptions::parse(uri).await?;
        client_options.min_pool_size = Some(1);

    let client_min_pool = Client::with_options(client_options)?;
    // end-min-pool-size

    // start-max-idle-time
    let mut client_options = ClientOptions::parse(uri).await?;
        client_options.max_idle_time = Some(Duration::new(90, 0));
        
    let client_idle = Client::with_options(client_options)?;
    // end-max-idle-time

    Ok(())
}
