use mongodb::{
    bson::doc,
    sync::{Client, Collection}
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

    let my_coll: Collection<Restaurant> = client
        .database("sample_restaurants")
        .collection("restaurants");

    let mut cursor = my_coll.find(
        doc! { "cuisine": "French" }
    ).run()?;
    
    for result in cursor {
        println!("{:?}", result?);
      }

    Ok(())
}
