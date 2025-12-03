use std::env;
use mongodb::{
    bson::{ Document, doc },
    sync::{ Client, Collection }
};
use serde::{ Deserialize, Serialize };

#[derive(Serialize, Deserialize, Debug)]
struct Restaurant {
    name: String,
    cuisine: String,
}

fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri)?;

    // Replace <T> with the <Document> or <Restaurant> type parameter
    let my_coll: Collection<T> = client
        .database("sample_restaurants")
        .collection("restaurants");

    let ct = my_coll.estimated_document_count().run()?;
    println!("Number of documents: {}", ct);

    let ct = my_coll
        .count_documents(doc! { "name": doc! { "$regex": "Sunset" } })
        .run()?;
    println!("Number of matching documents: {}", ct);

    Ok(())
}
