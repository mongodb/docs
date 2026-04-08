use mongodb::{
    bson::{doc, oid::ObjectId, raw::RawDocumentBuf, uuid::Uuid, Bson, DateTime, Document},
    Client,
    Collection,
};
use serde::{Deserialize, Serialize};
use std::fs;
use std::io::Cursor;

// begin-use-rust-types
#[derive(Serialize, Deserialize)]
struct Restaurant {
    name: String,
    cuisine: String,
    last_updated: DateTime,
}

async fn use_collection(client: &Client) -> mongodb::error::Result<()> {
    let coll: Collection<Restaurant> = client
        .database("sample_restaurants")
        .collection("restaurants");

    let doc = Restaurant {
        name: "Mongo's Pizza".to_string(),
        cuisine: "Pizza".to_string(),
        last_updated: DateTime::now(),
    };

    coll.insert_one(doc).await?;
    Ok(())
}
// end-use-rust-types

// begin-customize-serialization
#[derive(Serialize, Deserialize)]
struct Order {
    _id: ObjectId,
    item: String,
    delivery_date: DateTime,
}
// end-customize-serialization

// begin-uuid
#[derive(Serialize, Deserialize)]
struct Session {
    id: Uuid,
    user_id: Uuid,
    created_at: DateTime,
}
// end-uuid

// begin-raw-bson
fn inspect_raw(bytes: Vec<u8>) -> Result<(), mongodb::bson::error::Error> {
    let raw = RawDocumentBuf::from_bytes(bytes)?;

    if let Some(name) = raw.get_str("name").ok() {
        println!("Restaurant name: {name}");
    }

    Ok(())
}
// end-raw-bson

// begin-write-bson
fn write_bson_to_file(path: &str) -> std::io::Result<()> {
    let restaurant: Document = doc! {
        "address": {
            "street": "Pizza St",
            "zipcode": "10003",
        },
        "coord": [-73.982_419_f64, 41.579_505_f64],
        "cuisine": "Pizza",
        "name": "Mongo's Pizza",
    };

    // Encodes the document as BSON bytes
    let bytes = restaurant.to_vec()
        .expect("failed to encode document to BSON");

    fs::write(path, &bytes)
}
// end-write-bson

// begin-read-bson
fn read_bson_from_file(path: &str) -> Result<(), Box<dyn std::error::Error>> {
    let bytes = fs::read(path)?;
    let mut cursor = Cursor::new(bytes);

    // Decodes a single document from the reader
    let doc = Document::from_reader(&mut cursor)?;

    // Converts to relaxed Extended JSON for logging
    let bson_value = Bson::Document(doc);
    let json = bson_value.into_relaxed_extjson(); // serde_json::Value
    println!("{}", json);

    Ok(())
}
// end-read-bson

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    let my_coll: Collection<Document> = client.database("db").collection("restaurants");

    // begin-represent-bson
    let mut restaurant: Document = doc! {
        "address": {
            "street": "Pizza St",
            "zipcode": "10003",
        },
        "coord": [-73.982_419_f64, 41.579_505_f64],
        "cuisine": "Pizza",
        "name": "Mongo's Pizza",
    };
    // end-represent-bson

    // begin-access-fields
    let value = restaurant.get("cuisine"); // Option<&Bson>
    let name = restaurant.get_str("name")?; // &str
    let address = restaurant.get_document("address")?; // &Document
    let zipcode = address.get_str("zipcode")?; // &str
    // end-access-fields

    // begin-modify-document
    restaurant = Document = doc! {
        "address": {
            "street": "Pizza St",
            "zipcode": "10003",
        },
        "coord": [-73.982_419_f64, 41.579_505_f64],
        "cuisine": "Pizza",
        "name": "Mongo's Pizza",
    };

    // Adds a new field restaurant_id
    restaurant.insert("restaurant_id", Bson::Int32(12345));

    // Removes the cuisine field
    restaurant.remove("cuisine");

    // Updates the name field
    if let Some(name) = restaurant.get_mut("name") {
        *name = Bson::String("Mongo's Pizza Place".to_string());
    }
    // end-modify-document

    Ok(())
}
