use std::path::PathBuf;
use mongodb::{ options::{ ClientOptions, TlsOptions, Tls }, Client };

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";

    let mut client_options = ClientOptions::parse(uri).await?;

    let ca_file = PathBuf::from(r"<path to CA certificate>");
    let key_file = PathBuf::from(r"<path to client certificate>");

    let tls_opts = TlsOptions::builder()
        .ca_file_path(ca_file)
        .cert_key_file_path(key_file)
        .build();

    client_options.tls = Some(Tls::Enabled(tls_opts));
    let _client = Client::with_options(client_options)?;

    Ok(())
}
