use mongodb::bson::Document;
use mongodb::{Client, Collection};

pub(crate) async fn delete_index() -> mongodb::error::Result<()> {
    // Replace the placeholder with your connection string.
    let uri = "<connectionString>";
    let client = Client::with_uri_str(uri).await?;

    // Access your database and collection.
    let my_coll: Collection<Document> = client
        .database("<databaseName>")
        .collection("<collectionName>");

    let index_name = "<indexName>";

    // Delete the index.
    my_coll.drop_search_index(index_name).await?;
    println!("Successfully deleted the search index.");

    Ok(())
}
