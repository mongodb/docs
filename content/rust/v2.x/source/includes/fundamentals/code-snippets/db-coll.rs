use bson::{ Document };
use mongodb::{ bson::doc, options::{ CollectionOptions, WriteConcern }, Client, Collection };
use std::env;

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";

    let client = Client::with_uri_str(uri).await?;

    // begin-list-db
    let db_list = client.list_database_names(doc! {}, None).await?;
    println!("{:?}", db_list);
    // end-list-db

    // begin-database
    let db = client.database("test_db");
    // end-database

    // begin-drop-db
    db.drop(None).await?;
    // end-drop-db

    let db = client.database("db");
    // begin-list-coll
    let coll_list = db.list_collection_names(doc! {}).await?;
    println!("{:?}", coll_list);
    // end-list-coll

    // begin-coll
    let wc = WriteConcern::builder().journal(true).build();
    let coll_opts = CollectionOptions::builder().write_concern(wc).build();
    let my_coll: Collection<Document> = db.collection_with_options("coll_xyz", coll_opts);
    // end-coll

    // begin-drop-coll
    my_coll.drop(None).await?;
    // end-drop-coll

    // begin-create-coll
    db.create_collection("coll_abc", None).await?;
    // end-create-coll

    Ok(())
}
