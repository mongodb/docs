use mongodb::{ bson::doc, Client, Collection };
use serde::{ Deserialize, Serialize };
use std::env;

// begin-veg-struct
#[derive(Serialize, Deserialize)]
struct Vegetable {
    name: String,
    category: String,
    tropical: bool,
}
// end-veg-struct

#[derive(Serialize, Deserialize)]
struct Square {
    side_length: f32,
}

#[derive(Serialize, Deserialize)]
struct Circle {
    radius: f32,
}

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri: &str = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    // begin-access-coll
    let my_coll: Collection<Vegetable> = client
        .database("db")
        .collection("vegetables");
    // end-access-coll

    // begin-insert-veg
    let calabash = Vegetable {
        name: "calabash".to_string(),
        category: "gourd".to_string(),
        tropical: true,
    };

    my_coll.insert_one(calabash).await?;
    // end-insert-veg

    // begin-multiple-types
    let shapes_coll: Collection<Square> = client
        .database("db")
        .collection("shapes");
    // ... perform some operations with Square

    let shapes_coll: Collection<Circle> = shapes_coll.clone_with_type();
    // ... perform some operations with Circle
    // end-multiple-types

    Ok(())
}

// begin-hex-to-objectid
#[derive(Serialize, Deserialize)]
struct Order {
    #[serde(serialize_with = "serialize_hex_string_as_object_id")]
    _id: String,
    item: String,
}
// end-hex-to-objectid

// begin-dt-to-string
#[derive(Serialize, Deserialize)]
struct Order {
    item: String,
    #[serde(serialize_with = "serialize_bson_datetime_as_rfc3339_string")]
    delivery_date: DateTime,
}
// end-dt-to-string

// begin-u32-f64
#[derive(Serialize, Deserialize)]
struct Order {
    item: String,
    #[serde(serialize_with = "serialize_u32_as_f64")]
    quantity: u32,
}
// end-u32-f64
