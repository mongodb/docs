use mongodb::{ 
    bson::doc,
    Client,
    Collection
};
use futures::TryStreamExt;
use serde::{ Deserialize, Serialize };

#[derive(Serialize, Deserialize, Debug)]
struct Restaurant {
    name: String,
    cuisine: String,
}

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    // Replace <T> with the <Document> or <Restaurant> type parameter
    let my_coll: Collection<T> = client
        .database("sample_restaurants")
        .collection("restaurants");

    let mut cursor = my_coll.find(
        doc! { "cuisine": "French" }
    ).await?;

    while let Some(doc) = cursor.try_next().await? {
        println!("{:#?}", doc);
    }

    Ok(())
}


