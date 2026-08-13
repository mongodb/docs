use mongodb::bson::{doc, Document};
use mongodb::{Client, Collection, SearchIndexModel, SearchIndexType};
use futures::TryStreamExt;
use std::time::Duration;
use tokio::time::sleep;

pub(crate) async fn create_index() -> mongodb::error::Result<()> {
    // Replace the placeholder with your connection string.
    let uri = "<connectionString>";
    let client = Client::with_uri_str(uri).await?;

    // Access your database and collection.
    let my_coll: Collection<Document> = client
        .database("sample_mflix")
        .collection("embedded_movies");

    let index_name = "vector_index";

    // Define the vector embeddings field to index.
    let definition = doc! {
        "fields": [
            {
                "type": "vector",
                "path": "plot_embedding_voyage_3_large",
                "numDimensions": 2048,
                "similarity": "dotProduct",
                "quantization": "scalar",
                "indexingMethod": "hnsw"
            }
        ]
    };

    // Set the index name and the "vectorSearch" index type.
    let index_model = SearchIndexModel::builder()
        .definition(definition)
        .name(index_name.to_string())
        .index_type(SearchIndexType::VectorSearch)
        .build();

    my_coll.create_search_index(index_model).await?;
    println!("New search index named {} is building.", index_name);

    // Wait until the index is queryable (initial sync complete).
    println!("Polling to check if the index is ready. This may take up to a minute.");
    while !is_queryable(&my_coll, index_name).await? {
        sleep(Duration::from_secs(5)).await;
    }
    println!("{} is ready for querying.", index_name);

    Ok(())
}

async fn is_queryable(
    coll: &Collection<Document>,
    name: &str,
) -> mongodb::error::Result<bool> {
    let mut cursor = coll.list_search_indexes().await?;
    while let Some(index) = cursor.try_next().await? {
        if index.get_str("name").unwrap_or_default() == name {
            return Ok(index.get_bool("queryable").unwrap_or(false));
        }
    }
    Ok(false)
}
