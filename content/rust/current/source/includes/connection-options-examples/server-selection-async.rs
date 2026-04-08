use mongodb::{
    options::{ClientOptions, SelectionCriteria, ServerAddress},
    sdam::public::ServerInfo,
    Client,
};
use std::sync::Arc;

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    // start-localhost-predicate
    let mut options = ClientOptions::parse(
        "mongodb://<db_username>:<db_password>@<hostname>:<port>",
    )
    .await?;

    let prefer_localhost = Arc::new(|server_info: &ServerInfo| {
        matches!(
            server_info.address(),
            ServerAddress::Tcp { host, .. } if host == "localhost"
        )
    });

    options.selection_criteria = Some(
        SelectionCriteria::Predicate(prefer_localhost),
    );

    let client = Client::with_options(options)?;
    // end-localhost-predicate
    
    Ok(())
}
