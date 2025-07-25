use std::env;
use mongodb::{
    bson::{ Document, doc },
    sync::{ Client, Collection }
};

fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";

    let client = Client::with_uri_str(uri)?;
    let my_coll: Collection<Document> = client
        .database("sample_restaurants")
        .collection("restaurants");

    let ct = my_coll.estimated_document_count(None)?;
    println!("Number of documents: {}", ct);

    let ct = my_coll.count_documents(doc! { "name": doc! { "$regex": "Sunset" } }, None)?;
    println!("Number of matching documents: {}", ct);

    Ok(())
}
