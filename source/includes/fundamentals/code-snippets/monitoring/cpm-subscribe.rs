use std::{ env, sync::Arc };

use bson::Document;
use mongodb::{
    Client,
    Collection,
    event::cmap::{ CmapEventHandler, ConnectionCreatedEvent },
    options::ClientOptions,
};

fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";

    let mut client_options = ClientOptions::parse(uri).await?;

    // begin-cmap
    struct ConnectionCreatedHandler;

    impl CmapEventHandler for ConnectionCreatedHandler {
        fn handle_connection_created_event(&self, event: ConnectionCreatedEvent) {
            eprintln!("Connection created: {:?}", event);
        }
    }

    let handler: Arc<dyn CmapEventHandler> = Arc::new(ConnectionCreatedHandler);
    client_options.cmap_event_handler = Some(handler);

    let client = Client::with_options(client_options)?;

    // ... perform actions with the client to generate events

    // end-cmap

    Ok(())
}
