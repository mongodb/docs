use mongodb::{
    bson::{ Document, doc },
    Client,
    Collection
};

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    let my_coll: Collection<Document> = client
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
