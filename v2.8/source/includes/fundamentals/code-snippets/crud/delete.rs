use bson::{ Document, bson };
use mongodb::{ bson::doc, options::{ DeleteOptions, Hint }, Client, Collection };
use std::{ env };

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    let my_coll: Collection<Document> = client.database("db").collection("inventory");

    // begin-delete
    let filter = doc! { "category": "garden" };
    let hint = Hint::Name("_id_".to_string());
    let opts: DeleteOptions = DeleteOptions::builder().hint(hint).build();

    let res = my_coll.delete_many(filter, opts).await?;
    println!("Deleted documents: {}", res.deleted_count);
    // end-delete

    // begin-options
    let opts: DeleteOptions = DeleteOptions::builder().comment(bson!("hello!")).build();
    let res = my_coll.delete_one(filter, opts).await?;
    // end-options

    Ok(())
}
