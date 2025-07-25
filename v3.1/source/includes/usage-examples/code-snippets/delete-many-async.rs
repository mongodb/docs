use mongodb::{
    bson::{ Document, doc },
    Client,
    Collection
};
use serde::{ Deserialize, Serialize };

#[derive(Debug, Serialize, Deserialize)]
struct Address {
    street: String,
    city: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct Restaurant {
    name: String,
    borough: String,
    address: Address,
}

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    // Replace <T> with the <Document> or <Restaurant> type parameter
    let my_coll: Collection<T> = client
        .database("sample_restaurants")
        .collection("restaurants");

    let filter =
        doc! { "$and": [
           doc! { "borough": "Manhattan" },
           doc! { "address.street": "Broadway" }
       ]
    };

    let result = my_coll.delete_many(filter).await?;

    println!("Deleted documents: {}", result.deleted_count);

    Ok(())
}
