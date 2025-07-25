use futures::{ StreamExt, TryStreamExt };
use mongodb::{ bson::doc, bson::Document, Client, Collection, error::Result, options::{ FindOptions, CursorType } };

use serde::{ Deserialize, Serialize };

#[derive(Serialize, Deserialize, Debug)]
struct Fruit {
    name: String,
    color: String
}

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    // Replace the placeholder with your Atlas connection string
    let uri = "<connection string>";

    let client = Client::with_uri_str(uri).await?;

    let my_coll: Collection<Fruit> = client.database("db").collection("fruits");

    //start-sample-data
    let docs = vec! [
        Fruit { 
            name: "strawberry".to_string(), 
            color: "red".to_string() 
        },
        Fruit { 
            name: "banana".to_string(), 
            color: "yellow".to_string() 
        },
        Fruit { 
            name: "pomegranate".to_string(), 
            color: "red".to_string() 
        },
        Fruit { 
            name: "pineapple".to_string(), 
            color: "yellow".to_string() 
        }
    ];
    //end-sample-data

    // Inserts sample documents into the collection
    let insert_many_result = my_coll.insert_many(docs, None).await?;

    // start-indiv-builtin
    let mut cursor = my_coll.find(doc! { "color": "red" }, None).await?;
    while cursor.advance().await? {
        println!("{:?}", cursor.deserialize_current()?);
    }
    // end-indiv-builtin

    println!();

    // start-indiv-stream
    let mut cursor = my_coll.find(doc! { "color": "red" }, None).await?;
    println!("Output from next() iteration:");
    while let Some(doc) = cursor.next().await {
        println!("{:?}", doc?);
    }

    println!();
    let mut cursor = my_coll.find(doc! { "color": "yellow" }, None).await?;
    println!("Output from try_next() iteration:");
    while let Some(doc) = cursor.try_next().await? {
        println!("{:?}", doc);
    }
    // end-indiv-stream

    println!();
    
    // start-array
    let cursor = my_coll.find(doc! { "color": "red" }, None).await?;
    println!("Output from collect():");
    let v: Vec<Result<Fruit>> = cursor.collect().await;
    println!("{:?}", v);

    println!();
    let cursor = my_coll.find(doc! { "color": "yellow" }, None).await?;
    println!("Output from try_collect():");
    let v: Vec<Fruit> = cursor.try_collect().await?;
    println!("{:?}", v);
    // end-array

    // start-options
    let opts: FindOptions = FindOptions::builder()
        .batch_size(5)
        .cursor_type(CursorType::Tailable)
        .no_cursor_timeout(true)
        .build();
    // end-options

    Ok(())
}
