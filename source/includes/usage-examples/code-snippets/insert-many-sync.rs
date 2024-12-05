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

    // Replace <T> with the <Document> or <Restaurant> type parameter
    let my_coll: Collection<T> = client
        .database("sample_restaurants")
        .collection("restaurants");

    let insert_docs = vec! [
        doc! { 
            "name": "While in Kathmandu",
            "cuisine": "Nepalese",
        },
        doc! { 
            "name": "Cafe Himalaya",
            "cuisine": "Nepalese",
        }
    ];
    let insert_structs = vec! [
        Restaurant {
            name: "While in Kathmandu".to_string(),
            cuisine: "Nepalese".to_string(),
        },
        Restaurant {
            name: "Cafe Himalaya".to_string(),
            cuisine: "Nepalese".to_string(),
        }
    ];
    
    // Replace <structs or docs> with the insert_structs or insert_docs variable
    let insert_many_result = my_coll.insert_many(<structs or docs>).run()?;
    println!("Inserted documents with _ids:");
    for (_key, value) in &insert_many_result.inserted_ids {
        println!("{}", value);
    }

    Ok(())
}