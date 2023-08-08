use std::env;
use mongodb::{
    bson::doc,
    options::{ ClientOptions, ServerApi, ServerApiVersion, Compressor },
    Client,
};

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    // begin-clientoptions
    let uri = "<connection string>";
    let mut client_options = ClientOptions::parse(uri).await?;

    let compressors = vec![
        Compressor::Snappy,
        Compressor::Zstd { level: Some(1) },
        Compressor::Zlib { level: None }
    ];

    client_options.compressors = Some(compressors);
    let client = Client::with_options(client_options)?;
    // end-clientoptions

    client.database("admin").run_command(doc! { "ping": 1 }, None).await?;
    println!("Pinged your deployment. You successfully connected to MongoDB!");

    Ok(())
}
