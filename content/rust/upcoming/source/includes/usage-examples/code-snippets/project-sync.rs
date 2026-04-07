use mongodb::{ bson::{ doc, Document }, sync::Client, sync::Collection };

fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri)?;

    // start-db-coll
    let database = client.database("sample_restaurants");
    let collection: Collection<Document> = database.collection("restaurants");
    // end-db-coll

    // Retrieves documents matching the "name" field query
    // and projects their "name", "cuisine", and "borough" values
    // start-project-include-sync
    let filter = doc! { "name": "Emerald Pub" };

    let mut cursor = collection
        .find(filter)
        .projection(doc! { "name": 1, "cuisine": 1, "borough": 1 })
        .run()?;

    for result in cursor {
        println!("{:?}", result?);
    }
    // end-project-include-sync

    // Retrieves documents matching the "name" field query
    // and projects their "name", "cuisine", and "borough" values while excluding the "_id" value
    // start-project-include-without-id-sync
    let filter = doc! { "name": "Emerald Pub" };

    let mut cursor = collection.find(filter)
        .projection(doc! { "name": 1, "cuisine": 1, "borough": 1, "_id": 0 })
        .run()?;

    for result in cursor {
        println!("{:?}", result?);
    }
    // end-project-include-without-id-sync

    // Retrieves documents matching the "name" field query
    // and excludes their "grades" and "address" values
    // start-project-exclude-sync
    let filter = doc! { "name": "Emerald Pub" };
    let mut cursor = collection.find(filter)
        .projection(doc! { "grades": 0, "address": 0 })
        .run()?;

    for result in cursor {
        println!("{:?}", result?);
    }
    // end-project-exclude-sync

    Ok(())
}
