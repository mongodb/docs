use std::env;

use bson::{binary::Vector, DateTime};
use mongodb::{bson::doc, Client, Collection};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Article {
    title: String,
    date: DateTime,
    content: String,
    content_embeddings: Vector,
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