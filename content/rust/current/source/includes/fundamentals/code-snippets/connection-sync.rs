use mongodb::{ bson::doc, options::{ ClientOptions, ServerApi, ServerApiVersion }, sync::Client };

fn main() -> mongodb::error::Result<()> {
    // Replace the placeholder with your Atlas connection string
    let uri = "<connection string>";
    let mut client_options = ClientOptions::parse(uri)?;

    // Set the server_api field of the client_options object to Stable API version 1
    let server_api = ServerApi::builder().version(ServerApiVersion::V1).build();
    client_options.server_api = Some(server_api);

    // Create a new client and connect to the server
    let client = Client::with_options(client_options)?;

    // Send a ping to confirm a successful connection
    client.database("admin").run_command(doc! { "ping": 1 }).run()?;
    println!("Pinged your deployment. You successfully connected to MongoDB!");

    Ok(())
}
