use std::env;
use mongodb::{
    bson::{ Document, doc },
    sync::{ Client, Collection }
};
use serde::{ Deserialize, Serialize };

// start-restaurant
#[derive(Serialize, Deserialize, Debug)]
struct Restaurant {
    name: String,
    cuisine: String,
}
// end-restaurant

fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri)?;

    // Replace <T> with the <Document> or <Restaurant> type parameter
    let my_coll: Collection<T> = client
        .database("sample_restaurants")
        .collection("restaurants");

    {
        // start-estimated-count-sync
        let ct = my_coll.estimated_document_count().run()?;
        println!("Number of documents: {}", ct);
        // end-estimated-count-sync
    }

    {
        // start-count-sync
        let ct = my_coll.count_documents().run()?;
        println!("Number of matching documents: {}", ct);
        // end-count-sync
    }

    {
        // start-count-filter-sync
        let ct = my_coll
            .count_documents(doc! { "name": doc! { "$regex": "Sunset" } })
            .run()?;
        println!("Number of matching documents: {}", ct);
        // end-count-filter-sync
    }

    Ok(())
}
