use bson::Document;
use futures::{ StreamExt, TryStreamExt };
use mongodb::{ bson::doc, Client, error::Result, options::{ FindOptions, CursorType } };

#[tokio::main]
async fn main() -> Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    let my_coll = client.database("db").collection::<Document>("fruits");

    // start-indiv-builtin
    let mut cursor = my_coll.find(doc! { "color": "red" }, None).await?;
    while cursor.advance().await? {
        println!("{}", cursor.deserialize_current()?);
    }
    // end-indiv-builtin

    println!();

    // start-indiv-stream
    let mut cursor = my_coll.find(doc! { "color": "red" }, None).await?;
    println!("Output from next() iteration:");
    while let Some(doc) = cursor.next().await {
        println!("{}", doc?);
    }

    println!();
    let mut cursor = my_coll.find(doc! { "color": "yellow" }, None).await?;
    println!("Output from try_next() iteration:");
    while let Some(doc) = cursor.try_next().await? {
        println!("{}", doc);
    }
    // end-indiv-stream

    println!();
    
    // start-array
    let cursor = my_coll.find(doc! { "color": "red" }, None).await?;
    println!("Output from collect():");
    let v: Vec<Result<Document>> = cursor.collect().await;
    println!("{:?}", v);

    println!();
    let cursor = my_coll.find(doc! { "color": "yellow" }, None).await?;
    println!("Output from try_collect():");
    let v: Vec<Document> = cursor.try_collect().await?;
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
