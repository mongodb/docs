use std::{ env, sync::Arc };

use bson::Document;
use mongodb::{
    Client,
    Collection,
    event::sdam::{ SdamEventHandler, ServerOpeningEvent },
    options::ClientOptions,
};

fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";

    let mut client_options = ClientOptions::parse(uri).await?;

    // begin-sdam
    struct ServerOpenHandler;

    impl SdamEventHandler for ServerOpenHandler {
        fn handle_server_opening_event(&self, event: ServerOpeningEvent) {
            eprintln!("Server opening: {:?}", event);
        }
    }

    let handler: Arc<dyn SdamEventHandler> = Arc::new(ServerOpenHandler);
    client_options.sdam_event_handler = Some(handler);

    let client = Client::with_options(client_options)?;

    // ... perform actions with the client to generate events

    // end-sdam

    Ok(())
}
