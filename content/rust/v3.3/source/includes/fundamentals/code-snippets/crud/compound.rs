use mongodb::{
    bson::{ Document, bson, doc },
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
    let res = my_coll.find_one_and_delete(filter)
        .comment(bson!("hello"))
        .await?;
    // end-find-delete-options

    // begin-find_one_and_delete
    let filter = doc! { "age": doc! { "$lte": 10 } };

    let res = my_coll.find_one_and_delete(filter).await?;
    println!("Deleted document:\n{:?}", res);
    // end-find_one_and_delete

    let filter = doc! { "name": "xxx" };
    let update = doc! { "$set": doc! { "check": true } };
    // begin-find-update-options
    let res = my_coll.find_one_and_update(filter, update)
        .comment(bson!("hello"))
        .await?;
    // end-find-update-options

    // begin-find_one_and_update
    let filter = doc! { "school": "Aurora High School" };
    let update =
        doc! { "$set": doc! { "school": "Durango High School" },
               "$inc": doc! { "age": 1 } };

    let res = my_coll.find_one_and_update(filter, update)
        .return_document(ReturnDocument::After)
        .await?;
    println!("Updated document:\n{:?}", res);
    // end-find_one_and_update

    let filter = doc! { "name": "xxx" };
    let replacement = doc! { "name": "yyy", "age": 10 };
    // begin-find-replace-options
    let res = my_coll.find_one_and_replace(filter, replacement)
        .comment(bson!("hello"))
        .await?;
    // end-find-replace-options

    // begin-find_one_and_replace
    let filter = doc! { "name": doc! { "$regex": "Johnson" } };
    let replacement =
        doc! { "name": "Toby Fletcher", 
               "age": 14,
               "school": "Durango High School" };

    let res = my_coll.find_one_and_replace(filter, replacement)
        .return_document(ReturnDocument::After)
        .projection(doc! { "name": 1, "school": 1, "_id": 0 })
        .await?;
    println!("Document after replacement:\n{:?}", res);
    // end-find_one_and_replace

    Ok(())
}
