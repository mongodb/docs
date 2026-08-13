use mongodb::bson::{doc, Document};
use mongodb::sync::{Client, Collection};
use mongodb::{SearchIndexModel, SearchIndexType};
use std::thread::sleep;
use std::time::Duration;

pub(crate) fn create_index() -> mongodb::error::Result<()> {
    // Replace the placeholder with your connection string.
    let uri = "<connectionString>";
    let client = Client::with_uri_str(uri)?;

    // Access your database and collection.
    let my_coll: Collection<Document> = client
        .database("<databaseName>")
        .collection("<collectionName>");

    let index_name = "<indexName>";

    // Define the index fields.
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

    // Set the index name and the "vectorSearch" index type.
    let index_model = SearchIndexModel::builder()
        .definition(definition)
        .name(index_name.to_string())
        .index_type(SearchIndexType::VectorSearch)
        .build();

    my_coll.create_search_index(index_model).run()?;
    println!("New search index named {} is building.", index_name);

    // Wait until the index is queryable (initial sync complete).
    println!("Polling to check if the index is ready. This may take up to a minute.");
    while !is_queryable(&my_coll, index_name)? {
        sleep(Duration::from_secs(5));
    }
    println!("{} is ready for querying.", index_name);

    Ok(())
}

fn is_queryable(
    coll: &Collection<Document>,
    name: &str,
) -> mongodb::error::Result<bool> {
    for result in coll.list_search_indexes().run()? {
        let index = result?;
        if index.get_str("name").unwrap_or_default() == name {
            return Ok(index.get_bool("queryable").unwrap_or(false));
        }
    }
    Ok(false)
}
