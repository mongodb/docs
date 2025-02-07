use std::env;
use mongodb::{ 
    bson::{ Document, doc },
    sync::{ Client, Collection }
};
use serde::{ Deserialize, Serialize };

#[derive(Serialize, Deserialize, Debug)]
struct Restaurant {
    name: String,
    cuisine: String,
    borough: String,
}

fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri)?;

    // Replace <T> with the <Document> or <Restaurant> type parameter
    let my_coll: Collection<T> = client
        .database("sample_restaurants")
        .collection("restaurants");

    let filter = doc! { "cuisine": "Turkish" };
    let boroughs = my_coll.distinct("borough", filter).run()?;

    println!("List of field values for 'borough':");
    for b in boroughs.iter() {
        println!("{:?}", b);
    }

    Ok(())
}
