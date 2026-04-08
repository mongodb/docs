use mongodb::{
    bson::{ doc },
    Client, Collection,
};
use serde::{ Deserialize, Serialize };
use futures::stream::TryStreamExt;

#[derive(Serialize, Deserialize, Debug)]
struct Restaurant {
    name: String,
    cuisine: String,
}

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;
    
    let my_coll: Collection<Restaurant> = client
        .database("sample_restaurants")
        .collection("restaurants");

    // start-limit
    let mut cursor = my_coll
        .find(doc! { "cuisine": "Italian" })
        .limit(5)
        .await?;

    while let Some(result) = cursor.try_next().await? {
        println!("{:?}", result);
    }
    // end-limit

    // start-sort
    let mut cursor = my_coll
        .find(doc! { "cuisine": "Italian" })
        .sort(doc! { "name": 1 })
        .await?;

    while let Some(result) = cursor.try_next().await? {
        println!("{:?}", result);
    }
    // end-sort

    // start-skip
    let mut cursor = my_coll
        .find(doc! { "borough": "Manhattan" })
        .skip(10)
        .await?;

    while let Some(result) = cursor.try_next().await? {
        println!("{:?}", result);
    }
    // end-skip

    // start-limit-skip-sort
    let mut cursor = my_coll
        .find(doc! { "cuisine": "Italian" })
        .sort(doc! { "name": 1 })
        .skip(10)
        .limit(5)
        .await?;

    while let Some(result) = cursor.try_next().await? {
        println!("{:?}", result);
    }
    // end-limit-skip-sort

    Ok(())
}