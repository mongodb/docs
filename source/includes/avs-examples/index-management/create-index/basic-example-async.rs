use std::ops::Index;
use std::time::Duration;
use futures::{TryStreamExt};
use mongodb::{bson::{Document, doc}, Client, Collection, SearchIndexModel};
use mongodb::SearchIndexType::VectorSearch;
use tokio::time::sleep;

#[tokio::main]
pub(crate) async fn vector_index() {
    // Replace the placeholder with your Atlas connection string
    let uri = "<connection_string>";

    // Create a new client and connect to the server
    let client = Client::with_uri_str(uri).await.unwrap();

    // Get a handle on the movies collection
    let database = client.database("sample_mflix");
    let my_coll: Collection<Document> = database.collection("embedded_movies");

    let index_name = "vector_index";
    let search_index_def = SearchIndexModel::builder()
        .definition(doc! {
            "fields": vec! {doc! {
                "type": "vector",
                "path": "plot_embedding",
                "numDimensions": 1536,
                "similarity": "dotProduct",
                "quantization": "scalar"
            }}
        })
        .name(index_name.to_string())
        .index_type(VectorSearch)
        .build();

    let models = vec![search_index_def];
    let result = my_coll.create_search_indexes(models).await;
    if let Err(e) = result {
        eprintln!("There was an error creating the search index: {}", e);
        std::process::exit(1)
    } else {
        println!("New search index named {} is building.", result.unwrap().index(0));
    }

    // Polling for the index to become queryable
    println!("Polling to check if the index is ready. This may take up to a minute.");
    let mut is_index_queryable = false;
    while !is_index_queryable {
        // List the search indexes
        let mut search_indexes = my_coll.list_search_indexes().await.unwrap();
        // Check if the index is present and queryable
        while let Some(index) = search_indexes.try_next().await.unwrap() {
            let retrieved_name = index.get_str("name");
            if retrieved_name.unwrap().to_string() == index_name {
                is_index_queryable = index.get_bool("queryable").unwrap();
            }
        }
        if !is_index_queryable {
            sleep(Duration::from_secs(5)).await; // Wait for 5 seconds before polling again
        }
    }
    println!("{} is ready for querying.", index_name);
}
