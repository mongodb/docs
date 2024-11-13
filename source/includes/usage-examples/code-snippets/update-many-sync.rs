use std::env;
use mongodb::{
    bson::{ Document, doc },
    sync::{ Client, Collection } 
};
use serde::{ Deserialize, Serialize };

#[derive(Debug, Serialize, Deserialize)]
struct Address {
    street: String,
    city: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct Restaurant {
    name: String,
    borough: String,
    address: Address,
}

fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";

    let client = Client::with_uri_str(uri)?;

    // Replace <T> with the <Document> or <Restaurant> type parameter
    let my_coll: Collection<T> = client
        .database("sample_restaurants")
        .collection("restaurants");

    let filter =
        doc! { 
        "address.street": "Sullivan Street", 
        "borough": "Manhattan" 
    };
    let update = doc! { "$set": doc! { "near_me": true } };

    let res = my_coll.update_many(filter, update).run()?;
    println!("Updated documents: {}", res.modified_count);

    Ok(())
}
