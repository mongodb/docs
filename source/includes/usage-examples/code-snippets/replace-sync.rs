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

    // Replace <T> with the <Document> or <Restaurant> type parameter
    let my_coll: Collection<T> = client
        .database("sample_restaurants")
        .collection("restaurants");

    let filter = doc! { "name": "Landmark Coffee Shop" };
    let replace_doc = doc! { 
        "borough": "Brooklyn",
        "cuisine": "Café/Coffee/Tea",
        "name": "Harvest Moon Café",
    };
    let replace_struct = Restaurant {
        borough: "Brooklyn".to_string(),
        cuisine: "Café/Coffee/Tea".to_string(),
        name: "Harvest Moon Café".to_string(),
    };

    // Replace <struct or doc> with the replace_struct or replace_doc variable 
    let res = my_coll.replace_one(filter, <struct or doc>).run()?;
    println!("Replaced documents: {}", res.modified_count);

    Ok(())
}
