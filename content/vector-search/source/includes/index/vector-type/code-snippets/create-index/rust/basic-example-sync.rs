use std::time::Duration;
use std::thread::sleep;
use mongodb::bson::{doc, Document};
use mongodb::sync::{Client, Collection};
use mongodb::SearchIndexModel;
use mongodb::SearchIndexType::VectorSearch;

pub(crate) fn vector_index() {
    // Replace the placeholder with your connection string
    let uri = "<connection_string>";

    // Create a new client and connect to the server
    let client = Client::with_uri_str(uri).unwrap();

    // Get a handle on the movies collection
    let database = client.database("sample_mflix");
    let my_coll: Collection<Document> = database.collection("embedded_movies");

    let index_name = "vector_index";
    let search_index_def = SearchIndexModel::builder()
        .definition(doc! {
            "fields": vec! {doc! {
                "type": "vector",
                "path": "plot_embedding_voyage_3_large",
                "numDimensions": 2048,
                "similarity": "dotProduct",
                "quantization": "scalar"
            }}
        })
        .name(index_name.to_string())
        .index_type(VectorSearch)
        .build();

    let models = vec![search_index_def];
    match my_coll.create_search_indexes(models).run() {
        Err(e) => {
            eprintln!("There was an error creating the search index: {}", e);
            std::process::exit(1)
        }
        Ok(names) => {
            println!("New search index named {} is building.", names[0]);
        }
    }

    // Polling for the index to become queryable
    println!("Polling to check if the index is ready. This may take up to a minute.");
    let mut is_index_queryable = false;
    while !is_index_queryable {
        // List the search indexes
        let search_indexes = my_coll.list_search_indexes().run().unwrap();

        // Check if the index is present and queryable
        for index in search_indexes {
            let index = index.unwrap();
            if index.get_str("name") == Ok(index_name) {
                is_index_queryable = index.get_bool("queryable").unwrap_or(false);
            }
        }

        if !is_index_queryable {
            sleep(Duration::from_secs(5)); // Wait for 5 seconds before polling again
        }
    }
    println!("{} is ready for querying.", index_name);
}
