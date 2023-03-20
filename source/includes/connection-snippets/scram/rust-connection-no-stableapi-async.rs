use mongodb::{bson::doc, options::ClientOptions, Client};

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    // Replace the placeholder with your Atlas connection string
    let uri = "<connection string>";
    let mut client_options =
        ClientOptions::parse(uri)
            .await?;

    // Create a new client and connect to the server
    let client = Client::with_options(client_options)?;

    // Send a ping to confirm a successful connection
    client
        .database("admin")
        .run_command(doc! {"ping": 1}, None)
        .await?;
    println!("Pinged your deployment. You successfully connected to MongoDB!");

    Ok(())
}