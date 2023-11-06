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

    let filter = doc! { "name": "Spice Market" };
    let update = doc! { "$set": doc! {"price": "$$$"} };

    let res = my_coll.update_one(filter, update, None).await?;
    println!(
        "Matched documents: {}\nUpdated documents: {}",
        res.matched_count,
        res.modified_count
    );

    Ok(())
}
