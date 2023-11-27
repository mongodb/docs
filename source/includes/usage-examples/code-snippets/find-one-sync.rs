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

    let result = my_coll.find_one(
        doc! { "name": "Tompkins Square Bagels" },
        None
    )?;

    println!("{:#?}", result);

    Ok(())
}
