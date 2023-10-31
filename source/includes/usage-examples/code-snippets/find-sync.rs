use mongodb::{
    bson::{doc, Document},
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
        doc! { "cuisine": "French" },
        None
    )?;
    
    for result in cursor {
        println!("{:?}", result?);
      }

    Ok(())
}
