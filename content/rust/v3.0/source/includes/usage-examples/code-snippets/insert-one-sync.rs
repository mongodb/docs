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

    let doc = Restaurant {
        name: "Sea Stone Tavern".to_string(),
        cuisine: "Greek".to_string(),
        borough: "Queens".to_string(),
    };

    let res = my_coll.insert_one(doc).run()?;
    println!("Inserted a document with _id: {}", res.inserted_id);

    Ok(())
}
