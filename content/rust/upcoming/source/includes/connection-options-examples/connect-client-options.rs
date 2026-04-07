  use std::time::Duration;
  use mongodb::{Client, options::ClientOptions};

  let uri = "mongodb://<hostname>:<port>/";
  let mut client_options = ClientOptions::parse(uri).await?;
  client_options.connect_timeout = Some(Duration::from_secs(60000));

  //Set additional options on client_options here
  let client = Client::with_options(client_options)?;