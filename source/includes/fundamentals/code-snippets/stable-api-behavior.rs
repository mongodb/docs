use mongodb::{
    bson::doc,
    options::{ClientOptions, ServerApi, ServerApiVersion},
    sync::Client,
};

fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    // start-stable-api-behavior
    let mut client_options = ClientOptions::parse(uri)?;

    let server_api = ServerApi::builder()
        .version(ServerApiVersion::V1)
        .strict(true)
        .deprecation_errors(true)
        .build();
    client_options.server_api = Some(server_api);

    let client = Client::with_options(client_options)?;
    // end-stable-api-behavior

    client
        .database("admin")
        .run_command(doc! { "ping": 1 }, None)
        .run()?;
    println!("Pinged your deployment. You successfully connected to MongoDB!");

    Ok(())
}
