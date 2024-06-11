use bson::{doc, Document};
use futures::TryStreamExt;
use mongodb::{
    options::{ClientOptions, ClusteredIndex, CreateCollectionOptions, IndexOptions},
    Client, Collection, IndexModel, SearchIndexModel,
};
use std::env;

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

    let my_coll: Collection<Document> = client.database("sample_training").collection("posts");

    // begin-atlas-model
    let def = doc! { "mappings": doc! {
        "dynamic": false,
        "fields": {
            "body": {"type": "string"},
            "date": {"type": "date"}
        }
    }};

    let idx_model = SearchIndexModel::builder()
        .definition(def)
        .name("example_index".to_string())
        .build();
    // end-atlas-model

    // begin-atlas-create-one
    let idx_model = SearchIndexModel::builder()
        .definition(doc! { "mappings": doc! {"dynamic": true} })
        .name("example_index".to_string())
        .build();

    let result = my_coll.create_search_index(idx_model).await?;
    println!("Created Atlas Search index:\n{}", result);
    // end-atlas-create-one

    // begin-atlas-create-many
    let dyn_idx = SearchIndexModel::builder()
        .definition(doc! { "mappings": doc! {"dynamic": true} })
        .name("dynamic_index".to_string())
        .build();

    let static_idx = SearchIndexModel::builder()
        .definition(doc! {"mappings": doc! { "dynamic": false, "fields": {
        "title": {"type": "string"}}}})
        .name("static_index".to_string())
        .build();

    let models = vec![dyn_idx, static_idx];
    let result = my_coll.create_search_indexes(models).await?;
    println!("Created Atlas Search indexes:\n{:?}", result);
    // end-atlas-create-many

    // begin-atlas-list
    let mut cursor = my_coll.list_search_indexes().await?;
    while let Some(index) = cursor.try_next().await? {
        println!("{}\n", index);
    }
    // end-atlas-list

    // begin-atlas-update
    let name = "static_index";
    let definition = doc! { "mappings": doc! {"dynamic": true} };
    my_coll.update_search_index(name, definition).await?;
    // end-atlas-update

    // begin-atlas-drop
    let name = "example_index";
    my_coll.drop_search_index(name).await?;
    // end-atlas-drop

    let my_coll: Collection<Document> = client.database("sample_mflix").collection("theaters");
    // begin-geo
    let index = IndexModel::builder()
        .keys(doc! { "location.geo": "2dsphere" })
        .build();

    let idx = my_coll.create_index(index).await?;
    println!("Created index:\n{}", idx.index_name);
    // end-geo

    let my_coll: Collection<Document> = client.database("sample_training").collection("zips");
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