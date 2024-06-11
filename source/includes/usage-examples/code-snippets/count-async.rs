use std::env;
use mongodb::{ bson::doc, Client, Collection };
use bson::Document;

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";

    let client = Client::with_uri_str(uri).await?;
    let my_coll: Collection<Document> = client
        .database("sample_restaurants")
        .collection("restaurants");

    let ct = my_coll.estimated_document_count().await?;
    println!("Number of documents: {}", ct);

    let ct = my_coll.count_documents(doc! { "name": doc! { "$regex": "Sunset" } }).await?;
    println!("Number of matching documents: {}", ct);

    Ok(())
}
