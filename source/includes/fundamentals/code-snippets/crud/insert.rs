use std::env;
use bson::{ Document, bson };
use mongodb::{
    bson::doc,
    Client,
    Collection,
    results::{ InsertOneResult, InsertManyResult },
    options::{ InsertOneOptions, InsertManyOptions },
};

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";

    let client = Client::with_uri_str(uri).await?;

    // begin-insert-one
    let my_coll: Collection<Document> = client.database("db").collection("books");
    let doc = doc! { "title": "Atonement", "author": "Ian McEwan" };

    let insert_one_result: InsertOneResult = my_coll.insert_one(doc, None).await?;
    println!("Inserted document with _id: {}", insert_one_result.inserted_id);
    // end-insert-one

    // begin-one-options
    let _opts: InsertOneOptions = InsertOneOptions::builder()
        .bypass_document_validation(true)
        .build();
    // end-one-options

    // begin-insert-many
    let my_coll: Collection<Document> = client.database("db").collection("books");
    let docs = vec![
        doc! { "title": "Cat's Cradle", "author": "Kurt Vonnegut Jr." },
        doc! { "title": "In Memory of Memory", "author": "Maria Stepanova" },
        doc! { "title": "Pride and Prejudice", "author": "Jane Austen" }
    ];

    let insert_many_result: InsertManyResult = my_coll.insert_many(docs, None).await?;
    println!("Inserted documents with _ids:");
    for (_key, value) in &insert_many_result.inserted_ids {
        println!("{}", value);
    }
    // end-insert-many

    // begin-many-options
    let _opts: InsertManyOptions = InsertManyOptions::builder()
        .comment(bson!("hello world"))
        .build();
    // end-many-options

    // begin-unordered
    let docs = vec![
        doc! { "_id": 1, "title": "Where the Wild Things Are" },
        doc! { "_id": 2, "title": "The Very Hungry Caterpillar" },
        doc! { "_id": 1, "title": "Blueberries for Sal" },
        doc! { "_id": 3, "title": "Goodnight Moon" }
    ];

    let opts: InsertManyOptions = InsertManyOptions::builder().ordered(false).build();
    my_coll.insert_many(docs, opts).await?;
    // end-unordered

    Ok(())
}
