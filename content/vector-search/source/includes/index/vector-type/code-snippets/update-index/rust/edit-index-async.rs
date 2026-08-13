use mongodb::bson::{doc, Document};
use mongodb::{Client, Collection};

pub(crate) async fn edit_index() -> mongodb::error::Result<()> {
    // Replace the placeholder with your connection string.
    let uri = "<connectionString>";
    let client = Client::with_uri_str(uri).await?;

    // Access your database and collection.
    let my_coll: Collection<Document> = client
        .database("<databaseName>")
        .collection("<collectionName>");

    let index_name = "<indexName>";

    // Define the updated index fields.
    let definition = doc! {
        "fields": [
            {
                "type": "vector",
                "path": "<fieldToIndex>",
                "numDimensions": <numberOfDimensions>,
                "similarity": "<vectorSimilarity>"
            }
        ]
    };

    my_coll.update_search_index(index_name, definition).await?;
    println!("Successfully updated the search index.");

    Ok(())
}
