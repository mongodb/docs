use tokio::runtime::Runtime;
use once_cell::sync::Lazy;

static CLIENT_RUNTIME: Lazy<(Client, Runtime)> = Lazy::new(|| {
    let rt = Runtime::new().unwrap();
    let client = rt.block_on(async {
        Client::with_uri_str("<connection string>").await.unwrap()
    });
    (client, rt)
});

#[test]
fn test_list_dbs() -> Result<(), Box<dyn Error>> {
    let (client, rt) = &*CLIENT_RUNTIME;
    rt.block_on(async {
        client.list_database_names(None, None).await
    })?;
    Ok(())
}
