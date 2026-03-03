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
            name: "The Brothers Karamazov".to_string(),
            author: "Dostoyevsky".to_string(),
            length: 824,
        },
        Book {
            name: "Atlas Shrugged".to_string(),
            author: "Rand".to_string(),
            length: 1088,
        },
        Book {
            name: "Les Misérables".to_string(),
            author: "Hugo".to_string(),
            length: 1462,
        },
        Book {
            name: "A Dance with Dragons".to_string(),
            author: "Martin".to_string(),
            length: 1104,
        },
    ];

    my_coll.insert_many(books, None).await?;
// end-sample-data

// Filters the results to only include documents where the "length" field value
// is greater than 1000, then sorts results by their "length" field values, and
// limits the results to the first two documents.
// start-limit-example
    let filter = doc! { "length": { "$gt": 1000 } };

    let find_options = FindOptions::builder()
        .sort(doc! { "length": 1 })
        .limit(2)
        .build();

    let mut cursor = my_coll.find(filter, find_options).await?;

    while let Some(result) = cursor.try_next().await? {
        println!("{:?}", result);
    }
// end-limit-example

// Retrieves documents in the collection, sorts results by their "length" field
// values, then limits the results to the first document.
// start-aggregation-limit-example
let pipeline = vec![
    doc! { "$match": {} },
    doc! { "$sort": { "length": -1 } },
    doc! { "$limit": 2 },
];

let mut cursor = my_coll.aggregate(pipeline, None).await?;

while let Some(result) = cursor.try_next().await? {
    println!("{:?}", result);
}
// end-aggregation-limit-example

    Ok(())
}