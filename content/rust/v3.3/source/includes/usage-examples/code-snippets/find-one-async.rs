use mongodb::{ 
    bson::doc,
    Client,
    Collection
};
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

    let result = my_coll.find_one(
        doc! { "name": "Tompkins Square Bagels" }
    ).await?;

    println!("{:#?}", result);

    Ok(())
}

