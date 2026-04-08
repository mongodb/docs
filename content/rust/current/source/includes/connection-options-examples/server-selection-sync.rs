use mongodb::{
    options::{ClientOptions, SelectionCriteria, ServerAddress},
    sdam::public::ServerInfo,
    sync::Client,
};
use std::sync::Arc;

fn main() -> mongodb::error::Result<()> {
    // start-localhost-predicate
    let prefer_localhost = Arc::new(|server_info: &ServerInfo| {
        matches!(
            server_info.address(),
            ServerAddress::Tcp { host, .. } if host == "localhost"
        )
    });

    let options = ClientOptions::builder()
        .hosts(vec![ServerAddress::Tcp {
            host: "<hostname>".to_string(),
            port: Some(27017),
        }])
        .selection_criteria(SelectionCriteria::Predicate(prefer_localhost))
        .build();

    let client = Client::with_options(options)?;
    // end-localhost-predicate

    Ok(())
}
