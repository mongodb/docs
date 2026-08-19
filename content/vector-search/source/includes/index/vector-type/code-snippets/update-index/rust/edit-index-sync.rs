use mongodb::bson::{doc, Document};
use mongodb::sync::{Client, Collection};

pub(crate) fn edit_index() -> mongodb::error::Result<()> {
    // Replace the placeholder with your connection string.
    let uri = "<connectionString>";
    let client = Client::with_uri_str(uri)?;

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

    my_coll.update_search_index(index_name, definition).run()?;
    println!("Successfully updated the search index.");

    Ok(())
}
