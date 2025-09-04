use std::env;

use bson::{binary::Vector, DateTime};
use bson::serde_helpers::{object_id, datetime, u32};
use mongodb::{bson::doc, Client, Collection};
use serde::{Deserialize, Serialize};
use serde_with::serde_as;

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
        title: "Maintaining Your Garden in Winter".to_string(),
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
#[serde_as]
#[derive(Serialize, Deserialize)]
struct Order {
    #[serde_as(as = "object_id::FromHexString")]
    _id: String,
    item: String,
}
// end-hex-to-objectid

// begin-dt-to-string
#[serde_as]
#[derive(Serialize, Deserialize)]
struct Order {
    item: String,
    #[serde_as(as = "datetime::AsRfc3339String")]
    delivery_date: DateTime,
}
// end-dt-to-string

// begin-u32-f64
#[serde_as]
#[derive(Serialize, Deserialize)]
struct Order {
    item: String,
    #[serde_as(as = "u32::AsF64")]
    quantity: u32,
}
// end-u32-f64
