use bson::Document;
use mongodb::{
    bson::doc,
    Client,
    Collection,
};

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    let my_coll: Collection<Document> = client.database("db").collection("students");

    // begin-positional
    let filter = doc! { "test_scores": 62 };
    let update = doc! { "$set": { "test_scores.$": 65 } };

    let res = my_coll
        .update_one(filter, update)
        .await?;
    println!("Modified documents: {}", res.modified_count);
    // end-positional

    // begin-all-positional
    let filter = doc! { "student": "Kai Ling" };
    let update = doc! { "$inc": { "test_scores.$[]": 5 } };

    let res = my_coll
        .update_one(filter, update)
        .await?;
    println!("Modified documents: {}", res.modified_count);
    // end-all-positional

    // begin-filtered-positional
    let filter = doc! {};
    let update = doc! { "$inc": { "test_scores.$[score]": 8 } };

    let res = my_coll
        .update_many(filter, update)
        .array_filters(vec![doc! { "score": { "$lt": 70 } }])
        .await?;
    println!("Modified documents: {}", res.modified_count);
    // end-filtered-positional

    Ok(())
}
