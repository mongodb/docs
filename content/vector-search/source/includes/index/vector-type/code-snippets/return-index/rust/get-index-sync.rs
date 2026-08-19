use mongodb::bson::Document;
use mongodb::sync::{Client, Collection};

pub(crate) fn get_index() -> mongodb::error::Result<()> {
    // Replace the placeholder with your connection string.
    let uri = "<connectionString>";
    let client = Client::with_uri_str(uri)?;

    // Access your database and collection.
    let my_coll: Collection<Document> = client
        .database("<databaseName>")
        .collection("<collectionName>");

    // Retrieve the indexes on the collection.
    for result in my_coll.list_search_indexes().run()? {
        let index = result?;
        println!("{}", index);
    }

    Ok(())
}
