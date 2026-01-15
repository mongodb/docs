use mongodb::{
    bson::{doc, Document},
    event::EventHandler,
    options::ClientOptions,
    Client, Collection,
};

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    // begin-cmap
    let mut client_options = ClientOptions::parse("<connection string>").await?;
    client_options.cmap_event_handler = Some(EventHandler::callback(|ev| println!("{:?}", ev)));

    let client = Client::with_options(client_options)?;

    // ... perform actions with the client to generate events

    // end-cmap
    Ok(())
}
