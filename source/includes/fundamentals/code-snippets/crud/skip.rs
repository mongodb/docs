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

    my_coll.insert_many(books).await?;
// end-sample-data

// Retrieves documents in the collection, sorts results by their "author" field
// values, and skips the first two results.
// start-skip-example
    let mut cursor = my_coll
        .find(doc! {})
        .sort(doc! { "author": 1 })
        .skip(2).await?;

    while let Some(result) = cursor.try_next().await? {
        println!("{:?}", result);
    }
// end-skip-example

// Sets the values for the `FindOptions` struct to sort results by their "name"
// field values, skip the first two results, and return the remaining results.
// start-options-skip-example
    let find_options = FindOptions::builder()
        .sort(doc! { "name": -1 })
        .skip(1)
        .build();

    let mut cursor = my_coll.find(doc! {}).with_options(find_options).await?;

    while let Some(result) = cursor.try_next().await? {
        println!("{:?}", result);
    }
// end-options-skip-example

// Retrieves documents in the collection, sorts results by their "author" field,
// then skips the first two results in an aggregation pipeline.
// start-aggregation-example
let pipeline = vec![
    doc! { "$match": {} },
    doc! { "$sort": { "author": 1 } }
    doc! { "$skip": 1 },
];

let mut cursor = my_coll.aggregate(pipeline).await?;

while let Some(result) = cursor.try_next().await? {
    println!("{:?}", result);
}
// end-aggregation-example

    Ok(())
}