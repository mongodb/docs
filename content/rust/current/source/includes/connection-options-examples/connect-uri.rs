 use mongodb::Client;

   let uri = "mongodb://<hostname>:<port>/?connectTimeoutMS=60000&tls=true";
   let client = Client::with_uri_str(uri).await?;