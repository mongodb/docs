use futures::TryStreamExt;
use mongodb::{ bson::{ doc, Document }, Client, Collection };

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    // start-db-coll
    let database = client.database("sample_restaurants");
    let collection: Collection<Document> = database.collection("restaurants");
    // end-db-coll

    // Retrieves documents matching the "name" field query
    // and projects their "name", "cuisine", and "borough" values
    // start-project-include-async
    let filter = doc! { "name": "Emerald Pub" };

    let mut cursor = collection
        .find(filter)
        .projection(doc! { "name": 1, "cuisine": 1, "borough": 1 })
        .await?;

    while let Some(result) = cursor.try_next().await? {
        println!("{:?}", result);
    }
    // end-project-include-async

    // Retrieves documents matching the "name" field query
    // and projects their "name", "cuisine", and "borough" values while excluding the "_id" value
    // start-project-include-without-id-async
    let filter = doc! { "name": "Emerald Pub" };

    let mut cursor = collection.find(filter)
        .projection(doc! { "name": 1, "cuisine": 1, "borough": 1, "_id": 0 })
        .await?;

    while let Some(result) = cursor.try_next().await? {
        println!("{:?}", result);
    }
    // end-project-include-without-id-async

    // Retrieves documents matching the "name" field query
    // and excludes their "grades" and "address" values
    // start-project-exclude-async
    let filter = doc! { "name": "Emerald Pub" };
    let mut cursor = collection.find(filter)
        .projection(doc! { "grades": 0, "address": 0 })
        .await?;

    while let Some(result) = cursor.try_next().await? {
        println!("{:?}", result);
    }
    // end-project-exclude-async

    Ok(())
}
