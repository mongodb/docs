use bson::{doc, Document};
use mongodb::{
    bson,
    options::{ClusteredIndex, IndexOptions},
    Client, Collection, IndexModel,
};

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    let my_coll: Collection<Document> = client.database("sample_training").collection("zips");
    // begin-single-field
    let index = IndexModel::builder().keys(doc! { "city": 1 }).build();

    let idx = my_coll.create_index(index).await?;
    println!("Created index:\n{}", idx.index_name);
    // end-single-field

    let my_coll: Collection<Document> = client.database("sample_training").collection("zips");
    // begin-compound
    let index = IndexModel::builder()
        .keys(doc! { "city": 1, "pop": -1 })
        .build();

    let idx = my_coll.create_index(index).await?;
    println!("Created index:\n{}", idx.index_name);
    // end-compound

    let my_coll: Collection<Document> = client.database("sample_training").collection("posts");
    // begin-multikey
    let index = IndexModel::builder().keys(doc! { "tags": 1 }).build();

    let idx = my_coll.create_index(index).await?;
    println!("Created index:\n{}", idx.index_name);
    // end-multikey
    // begin-clustered
    let db = client.database("sample_training");
    let cl_idx = ClusteredIndex::default();

    db.create_collection("items")
        .clustered_index(cl_idx)
        .await?;
    // end-clustered

    let my_coll: Collection<Document> = client.database("sample_training").collection("posts");
    // begin-text
    let idx_opts = IndexOptions::builder()
        .default_language("spanish".to_string())
        .build();

    let index = IndexModel::builder()
        .keys(doc! { "body": "text" })
        .options(idx_opts)
        .build();

    let idx = my_coll.create_index(index).await?;
    println!("Created index:\n{}", idx.index_name);
    // end-text

    let my_coll: Collection<Document> = client.database("sample_mflix").collection("theaters");
    // begin-geo
    let index = IndexModel::builder()
        .keys(doc! { "location.geo": "2dsphere" })
        .build();

    let idx = my_coll.create_index(index).await?;
    println!("Created index:\n{}", idx.index_name);
    // end-geo

    // begin-unique
    let opts = IndexOptions::builder().unique(true).build();
    let index = IndexModel::builder()
        .keys(doc! { "_id": -1 })
        .options(opts)
        .build();
    // end-unique

    let my_coll: Collection<Document> = client.database("sample_training").collection("zips");
    // begin-drop
    my_coll.drop_index("city_1".to_string()).await?;
    // end-drop

    Ok(())
}
