use mongodb::{ 
    bson::{doc, Document},
    options::{Collation, IndexOptions, CollationStrength, CreateCollectionOptions, FindOptions},
    Client,
    Collection,
    IndexModel
};
use futures::TryStreamExt;

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    let my_coll: Collection<Document> = client.database("db").collection("books");

    let docs = vec![
        doc! {"name" : "Emma", "length" : "474"},
        doc! {"name" : "Les Misérables", "length": "1462"},
        doc! {"name" : "Infinite Jest", "length" : "1104"},
        doc! {"name" : "Cryptonomicon", "length" : "918"},
        doc! {"name" : "Ça", "length" : "1138"}
    ];
    let result = my_coll.insert_many(docs, None).await?;

    // start-collation
    let collation = Collation::builder()
        .locale("en_US")
        .build();
    // end-collation

    // start-create-collection
    let collation = Collation::builder()
        .locale("fr")
        .strength(CollationStrength::Primary)
        .build();

    let opts = CreateCollectionOptions::builder()
        .collation(collation)
        .build();

    let result = my_db.create_collection("books", opts).await?;
    // end-create-collection

    // start-default-query
    let query = doc! { "name": doc! { "$lt": "Infinite Jest" } };
    let mut cursor = my_coll.find(query, None).await?;
    
    while let Some(doc) = cursor.try_next().await? {
       println!("{}", doc);
    }
    // end-default-query

    // start-index
    let collation = Collation::builder()
        .locale("en_US")
        .build();

    let index_opts = IndexOptions::builder()
        .collation(collation)
        .build();

    let index = IndexModel::builder()
        .keys(doc! { "name": 1 })
        .options(index_opts)
        .build();

    let result = my_coll.create_index(index, None).await?;
    println!("Created index: {}", result.index_name);
    // end-index

    // start-op-collation
    let collation = Collation::builder()
        .locale("en_US")
        .numeric_ordering(true)
        .build();

    let opts = FindOptions::builder()
        .collation(collation)
        .build();
    
    let filter = doc! { "length": doc! { "$gt": "1000" } };
    let mut cursor = my_coll.find(filter, opts).await?;

    while let Some(result) = cursor.try_next().await? {
        println!("{}", result);
    };
    // end-op-collation

    Ok(())
}