use std::env;
use mongodb::{ 
    bson::{doc, Document},
    Client,
    Collection 
};
use serde::{ Deserialize, Serialize };

#[derive(Serialize, Deserialize, Debug)]
struct Restaurant {
    borough: String,
    cuisine: String,
    name: String,
}

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";

    let client = Client::with_uri_str(uri).await?;

    // Replace <T> with the <Document> or <Restaurant> type parameter
    let my_coll: Collection<T> = client
        .database("sample_restaurants")
        .collection("restaurants");

    let insert_doc = doc! { 
        "name": "Sea Stone Tavern",
        "cuisine": "Greek",
        "borough": "Queens",
    };
    let insert_struct = Restaurant {
        name: "Sea Stone Tavern".to_string(),
        cuisine: "Greek".to_string(),
        borough: "Queens".to_string(),
    };

    // Replace <struct or doc> with the insert_struct or insert_doc variable
    let res = my_coll.insert_one(<struct or doc>).await?;
    println!("Inserted a document with _id: {}", res.inserted_id);

    Ok(())
}
