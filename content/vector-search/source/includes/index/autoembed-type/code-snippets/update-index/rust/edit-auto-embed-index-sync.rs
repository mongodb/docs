use mongodb::bson::{doc, Document};
use mongodb::sync::{Client, Collection};

pub(crate) fn edit_index() -> mongodb::error::Result<()> {
    // Replace the placeholder with your connection string.
    let uri = "<connection-string>";
    let client = Client::with_uri_str(uri)?;

    // Access your database and collection.
    let my_coll: Collection<Document> = client
        .database("<database-name>")
        .collection("<collection-name>");

    let index_name = "<index-name>";

    // Define the updated index fields.
    let definition = doc! {
        "fields": [
            {
                "type": "autoEmbed",
                "modality": "text",
                "path": "<indexed-field>",
                "model": "<embedding-model>"
            },
            {
                "type": "filter",
                "path": "<field-to-index>"
            }
        ]
    };

    my_coll.update_search_index(index_name, definition).run()?;
    println!("Successfully updated the search index.");

    Ok(())
}
