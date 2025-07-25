use mongodb::{ bson::doc, options::{ ClientOptions, ServerApi, ServerApiVersion }, sync::Client };

fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    // start-stable-api
    let mut client_options = ClientOptions::parse(uri).await?;

    let server_api = ServerApi::builder().version(ServerApiVersion::V1).build();
    client_options.server_api = Some(server_api);

    let client = Client::with_options(client_options)?;
    // end-stable-api

    client
        .database("admin")
        .run_command(doc! { "ping": 1 }, None)
        .run()?;
    println!("Pinged your deployment. You successfully connected to MongoDB!");

    Ok(())
}
