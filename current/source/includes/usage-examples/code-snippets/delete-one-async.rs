use mongodb::{ 
    bson::{ Document, doc }, 
    Client, 
    Collection 
};
use serde::{ Deserialize, Serialize };

#[derive(Serialize, Deserialize, Debug)]
struct Restaurant {
    name: String,
    borough: String,
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
           doc! { "name": "Haagen-Dazs" },
           doc! { "borough": "Brooklyn" }
       ]
    };

    let result = my_coll.delete_one(filter).await?;

    println!("Deleted documents: {}", result.deleted_count);

    Ok(())
}
