use std::env;
use mongodb::{ bson::doc, Client, Collection };
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
    let my_coll: Collection<Restaurant> = client
        .database("sample_restaurants")
        .collection("restaurants");

    let filter = doc! { "name": "Landmark Coffee Shop" };
    let replacement = Restaurant {
        borough: "Brooklyn".to_string(),
        cuisine: "Café/Coffee/Tea".to_string(),
        name: "Harvest Moon Café".to_string(),
    };

    let res = my_coll.replace_one(filter, replacement, None).await?;
    println!("Replaced documents: {}", res.modified_count);

    Ok(())
}
