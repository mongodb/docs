
// start-perf-client-slow
async fn handle_request() -> Result<(), Box<dyn Error>> {
    let client = Client::with_uri_str("<connection string>").await?;
    // Do something with the client
    Ok(())
}
// end-perf-client-slow

// start-perf-client-faster
async fn handle_request(client: &Client) -> Result<(), Box<dyn Error>> {
    // Do something with the client
    Ok(())
}
// end-perf-client-faster
