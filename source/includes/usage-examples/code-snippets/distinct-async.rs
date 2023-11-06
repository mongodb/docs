use std::env;

use mongodb::{ bson::doc, Client, Collection };
use serde::{ Deserialize, Serialize };

#[derive(Serialize, Deserialize, Debug)]
struct Restaurant {
    borough: String,
    cuisine: String,
}

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";

    let client = Client::with_uri_str(uri).await?;
    let my_coll: Collection<Restaurant> = client
        .database("sample_restaurants")
        .collection("restaurants");

    let filter = doc! { "cuisine": "Turkish" };
    let boroughs = my_coll.distinct("borough", filter, None).await?;

    println!("List of field values for 'borough':");
    for b in boroughs.iter() {
        println!("{:?}", b);
    }

    Ok(())
}
