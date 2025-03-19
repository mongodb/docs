use std::env;

use bson::{binary::Vector, DateTime};
use mongodb::{bson::doc, Client, Collection};
use serde::{Deserialize, Serialize};

// begin-struct
#[derive(Serialize, Deserialize)]
struct Article {
    title: String,
    date: DateTime,
    content: String,
    content_embeddings: Vector,
}
// end-struct

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
    let my_coll: Collection<Article> = client
        .database("db")
        .collection("articles");
    // end-access-coll

    // begin-insert-struct
    let article = Article {
        title: "Mainting Your Garden in Winter".to_string(),
        date: DateTime::now(),
        content: "As fall winds down, you might be wondering what you should be doing in your garden in the coming months ...".to_string(),
        content_embeddings: Vector::Float32(vec! [0.01020927,-0.011224265,0.015686288,-0.018586276,-0.023160344])
    };

    my_coll.insert_one(article).await?;
    // end-insert-struct

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
