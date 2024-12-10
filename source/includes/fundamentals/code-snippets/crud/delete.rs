use bson::{ Document, bson };
use mongodb::{ bson::doc, options::{ DeleteOptions, Hint }, Client, Collection };
use std::{ env };

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    let my_coll: Collection<Document> = client.database("db").collection("inventory");

    // begin-delete-one
    let filter = doc! { "item": "placemat" };

    let res = my_coll.delete_one(filter).await?;
    println!("Deleted documents: {}", res.deleted_count);
    // end-delete-one

    // begin-delete-many
    let filter = doc! { "category": "garden" };
    let hint = Hint::Name("_id_".to_string());

    let res = my_coll
        .delete_many(filter)
        .hint(hint)
        .await?;
    println!("Deleted documents: {}", res.deleted_count);
    // end-delete-many

    // begin-options
    let res = my_coll
        .delete_one(filter)
        .comment(bson!("hello!"))
        .await?;
    // end-options

    Ok(())
}
