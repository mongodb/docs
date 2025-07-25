use futures::TryStreamExt;
use mongodb::{
    bson::doc,
    Client, 
    Collection, 
    results::{ InsertOneResult, InsertManyResult },
    options::{ InsertOneOptions, InsertManyOptions }, 
};
use std::env;

use serde::{ Deserialize, Serialize };

#[derive(Serialize, Deserialize, Debug)]
struct Book {
    _id: i32,
    title: String,
    author: String
}

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";

    let client = Client::with_uri_str(uri).await?;

    // begin-insert-one
    let my_coll: Collection<Book> = client.database("db").collection("books");
    let doc = Book { _id: 8, title: "Atonement".to_string(), author: "Ian McEwan".to_string() };

    let insert_one_result = my_coll.insert_one(doc, None).await?;
    println!("Inserted document with _id: {}", insert_one_result.inserted_id);
    // end-insert-one

    // begin-one-options
    let _opts = InsertOneOptions::builder()
        .bypass_document_validation(true)
        .build();
    // end-one-options

    // begin-insert-many
    let docs = vec![
        Book {
            _id: 5,
            title: "Cat's Cradle".to_string(),
            author: "Kurt Vonnegut Jr.".to_string()
        },
        Book {
            _id: 6,
            title: "In Memory of Memory".to_string(),
            author: "Maria Stepanova".to_string()
        },
        Book {
            _id: 7,
            title: "Pride and Prejudice".to_string(),
            author: "Jane Austen".to_string()
        }
    ];

    let insert_many_result = my_coll.insert_many(docs, None).await?;
    println!("Inserted documents with _ids:");
    for (_key, value) in &insert_many_result.inserted_ids {
        println!("{:?}", value);
    }
    // end-insert-many

    // begin-many-options
    let _opts = InsertManyOptions::builder()
        .comment(Some("hello world".into()))
        .build();
    // end-many-options

    // begin-unordered
    let docs = vec![
        Book { _id: 1, title: "Where the Wild Things Are".to_string(), author: "".to_string() },
        Book { _id: 2, title: "The Very Hungry Caterpillar".to_string(), author: "".to_string() },
        Book { _id: 4, title: "Blueberries for Sal".to_string(), author: "".to_string() },
        Book { _id: 3, title: "Goodnight Moon".to_string(), author: "".to_string() }
    ];

    let opts = InsertManyOptions::builder().ordered(false).build();
    my_coll.insert_many(docs, opts).await?;
    // end-unordered

    Ok(())
}
