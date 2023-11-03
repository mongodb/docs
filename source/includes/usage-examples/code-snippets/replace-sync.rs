use std::env;
use mongodb::{ bson::doc, sync::{ Client, Collection } };
use serde::{ Deserialize, Serialize };

#[derive(Serialize, Deserialize, Debug)]
struct Restaurant {
    borough: String,
    cuisine: String,
    name: String,
}

fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";

    let client = Client::with_uri_str(uri)?;
    let my_coll: Collection<Restaurant> = client
        .database("sample_restaurants")
        .collection("restaurants");

    let filter = doc! { "name": "Landmark Coffee Shop" };
    let replacement = Restaurant {
        borough: "Brooklyn".to_string(),
        cuisine: "Café/Coffee/Tea".to_string(),
        name: "Harvest Moon Café".to_string(),
    };

    let res = my_coll.replace_one(filter, replacement, None)?;
    println!(
        "Matched documents: {}\nReplaced documents: {}",
        res.matched_count,
        res.modified_count
    );

    Ok(())
}
