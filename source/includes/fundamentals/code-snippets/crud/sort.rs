use std::env;
use mongodb::{ bson::doc, bson::Document, Client, Collection, options::FindOptions };
use serde::{Deserialize, Serialize};
use futures::stream::TryStreamExt;

// start-book-struct
#[derive(Debug, Serialize, Deserialize)]
struct Book {
    name: String,
    author: String,
    length: i32,
}
// end-book-struct

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
// start-sample-data
    let uri = "connection string";
    let client = Client::with_uri_str(uri).await?;
    let my_coll: Collection<Book> = client.database("db").collection("books");

    let books = vec![
        Book {
            id: 1,
            name: "The Brothers Karamazov".to_string(),
            author: "Dostoyevsky".to_string(),
            length: 824,
        },
        Book {
            id: 2,
            name: "Atlas Shrugged".to_string(),
            author: "Rand".to_string(),
            length: 1088,
        },
        Book {
            id: 3,
            name: "Les Misérables".to_string(),
            author: "Hugo".to_string(),
            length: 1462,
        },
        Book {
            id: 4,
            name: "A Dance with Dragons".to_string(),
            author: "Martin".to_string(),
            length: 1104,
        },
    ];

    my_coll.insert_many(books, None).await?;
// end-sample-data

// start-sort-query
let opts = FindOptions::builder()
    // 1 for ascending order, -1 for descending order
    .sort(doc! { "author": 1 })
    .build();

let mut cursor = my_coll
    .find(doc! {}, opts)
    .await?;

while let Some(result) = cursor.try_next().await? {
    println!("{:?}", result);
}
// end-sort-query

// start-sort-aggregation
let pipeline = vec![
    doc! { "$match": {} },
    // 1 for ascending order, -1 for descending order
    doc! { "$sort": { "author": 1 } }
];

let mut cursor = my_coll.aggregate(pipeline, None).await?;

while let Some(result) = cursor.try_next().await? {
    println!("{:?}", result);
}
// end-sort-aggregation

// start-ascending-sort
let opts = FindOptions::builder()
    .sort(doc! { "name": 1 })
    .build();

let mut cursor = my_coll
    .find(doc! {}, opts)
    .await?;

while let Some(result) = cursor.try_next().await? {
    println!("{:?}", result);
}
// end-ascending-sort

// start-descending-sort
let opts = FindOptions::builder()
    .sort(doc! { "name": -1 })
    .build();

let mut cursor = my_coll
    .find(doc! {}, opts)
    .await?;

while let Some(result) = cursor.try_next().await? {
    println!("{:?}", result);
}
// end-descending-sort

    Ok(())
}