use std::{ env, sync::Arc };

use bson::Document;
use mongodb::{
    Client,
    Collection,
    event::command::{ CommandEventHandler, CommandStartedEvent },
    options::ClientOptions,
};

fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";

    let mut client_options = ClientOptions::parse_async(uri).await?;

    // begin-command
    struct CommandStartHandler;

    impl CommandEventHandler for CommandStartHandler {
        fn handle_command_started_event(&self, event: CommandStartedEvent) {
            eprintln!("Command started: {:?}", event);
        }
    }

    let handler: Arc<dyn CommandEventHandler> = Arc::new(CommandStartHandler);
    client_options.command_event_handler = Some(handler);

    let client = Client::with_options(client_options)?;

    // ... perform actions with the client to generate events

    // end-command

    Ok(())
}
