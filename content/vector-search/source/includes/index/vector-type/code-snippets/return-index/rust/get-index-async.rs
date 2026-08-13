use mongodb::bson::Document;
use mongodb::{Client, Collection};
use futures::TryStreamExt;

pub(crate) async fn get_index() -> mongodb::error::Result<()> {
    // Replace the placeholder with your connection string.
    let uri = "<connectionString>";
    let client = Client::with_uri_str(uri).await?;

    // Access your database and collection.
    let my_coll: Collection<Document> = client
        .database("<databaseName>")
        .collection("<collectionName>");

    // Retrieve the indexes on the collection.
    let mut cursor = my_coll.list_search_indexes().await?;
    while let Some(index) = cursor.try_next().await? {
        println!("{}", index);
    }

    Ok(())
}
