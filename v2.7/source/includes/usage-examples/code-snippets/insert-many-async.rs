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

    let my_coll: Collection<Restaurant> = client
        .database("sample_restaurants")
        .collection("restaurants");

    let docs = vec! [
        Restaurant {
            name: "While in Kathmandu".to_string(),
            cuisine: "Nepalese".to_string(),
        },
        Restaurant {
            name: "Cafe Himalaya".to_string(),
            cuisine: "Nepalese".to_string(),
        }
    ];
    
    let insert_many_result = my_coll.insert_many(docs, None).await?;
    println!("Inserted documents with _ids:");
    for (_key, value) in &insert_many_result.inserted_ids {
        println!("{}", value);
    }
        
    Ok(())
}