use bson::{ Document, bson };
use mongodb::{
    bson::doc,
    options::{
        FindOneAndDeleteOptions,
        FindOneAndUpdateOptions,
        FindOneAndReplaceOptions,
        ReturnDocument,
    },
    Client,
    Collection,
};

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    let my_coll: Collection<Document> = client.database("db").collection("students");

    let filter = doc! { "name": "xxx" };
    // begin-find-delete-options
    let opts = FindOneAndDeleteOptions::builder().comment(bson!("hello")).build();
    let res = my_coll.find_one_and_delete(filter, opts).await?;
    // end-find-delete-options

    // begin-find_one_and_delete
    let filter = doc! { "age": doc! { "$lte": 10 } };

    let res = my_coll.find_one_and_delete(filter, None).await?;
    println!("Deleted document:\n{:?}", res);
    // end-find_one_and_delete

    let filter = doc! { "name": "xxx" };
    let update = doc! { "$set": doc! { "check": true } };
    // begin-find-update-options
    let opts = FindOneAndUpdateOptions::builder().comment(bson!("hello")).build();
    let res = my_coll.find_one_and_update(filter, update, opts).await?;
    // end-find-update-options

    // begin-find_one_and_update
    let filter = doc! { "school": "Aurora High School" };
    let update =
        doc! { "$set": doc! { "school": "Durango High School" },
               "$inc": doc! { "age": 1 } };
    let opts = FindOneAndUpdateOptions::builder()
        .return_document(Some(ReturnDocument::After))
        .build();

    let res = my_coll.find_one_and_update(filter, update, opts).await?;
    println!("Updated document:\n{:?}", res);
    // end-find_one_and_update

    let filter = doc! { "name": "xxx" };
    let replacement = doc! { "name": "yyy", "age": 10 };
    // begin-find-replace-options
    let opts = FindOneAndReplaceOptions::builder().comment(bson!("hello")).build();
    let res = my_coll.find_one_and_replace(filter, replacement, opts).await?;
    // end-find-replace-options

    // begin-find_one_and_replace
    let filter = doc! { "name": doc! { "$regex": "Johnson" } };
    let replacement =
        doc! { "name": "Toby Fletcher", 
               "age": 14,
               "school": "Durango High School" };
    let opts = FindOneAndReplaceOptions::builder()
        .return_document(Some(ReturnDocument::After))
        .projection(doc! { "name": 1, "school": 1, "_id": 0 })
        .build();

    let res = my_coll.find_one_and_replace(filter, replacement, opts).await?;
    println!("Document after replacement:\n{:?}", res);
    // end-find_one_and_replace

    Ok(())
}
