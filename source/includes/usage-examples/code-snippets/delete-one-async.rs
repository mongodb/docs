use mongodb::{ 
    bson::doc,
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

    let my_coll: Collection<Restaurant> = client
        .database("sample_restaurants")
        .collection("restaurants");

    let filter =
        doc! { "$and": [
           doc! { "name": "Haagen-Dazs" },
           doc! { "borough": "Brooklyn" }
       ]
    };

    let result = my_coll.delete_one(filter, None).await?;

    println!("Deleted documents: {}", result.deleted_count);
        
    Ok(())
}
    