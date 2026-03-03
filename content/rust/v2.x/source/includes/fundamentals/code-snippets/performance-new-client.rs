#[tokio::test]
async fn test_list_dbs() -> Result<(), Box<dyn Error>> {
    let client = Client::with_uri_str("<connection string>").await?;
    client.list_database_names(None, None).await?;
    Ok(())
}
