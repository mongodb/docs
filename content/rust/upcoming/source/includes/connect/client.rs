use mongodb::{ bson::doc, options::{ ClientOptions, ServerApi, ServerApiVersion }, sync::Client };

fn main() -> mongodb::error::Result<()> {
    // Replace the placeholder with your Atlas connection string
    let uri = "<connection string>";

    // Create a new client and connect to the server
    // start-client
    let client = Client::with_uri_str(uri)?;
    // end-client

    // Send a ping to confirm a successful connection
    client.database("admin").run_command(doc! { "ping": 1 }).run()?;
    println!("Pinged your deployment. You successfully connected to MongoDB!");

    Ok(())
}