use std::env;
use mongodb::{
    bson::{ doc, Document },
    Client,
    Collection
};
use serde::{ Deserialize, Serialize };

#[derive(Serialize, Deserialize, Debug)]
struct Restaurant {
    name: String,
    cuisine: String,
}

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    // Replace <T> with the <Document> or <Restaurant> type parameter
    let my_coll: Collection<T> = client
        .database("sample_restaurants")
        .collection("restaurants");

    {
        // start-estimated-count-async
        let ct = my_coll.estimated_document_count().await?;
        println!("Number of documents: {}", ct);
        // end-estimated-count-async
    }

    {
        // start-count-async
        let ct = my_coll.count_documents().await?;
        println!("Number of matching documents: {}", ct);
        // end-count-async
    }

    {
        // start-count-filter-async
        let ct = my_coll
            .count_documents(doc! { "name": doc! { "$regex": "Sunset" } })
            .await?;
        println!("Number of matching documents: {}", ct);
        // end-count-filter-async
    }

    Ok(())
}
