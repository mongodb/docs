use mongodb::{
    bson::{ doc, Document }, 
    options::{ChangeStreamPreAndPostImages, ChangeStreamOptions, FullDocumentType, CreateCollectionOptions, FullDocumentBeforeChangeType},
    Client, Collection
};
use futures_util::{
    StreamExt
};
use serde::{ Deserialize, Serialize };

#[derive(Serialize, Deserialize, Debug)]
struct Director {
    name: String,
    movies: Vec<String>,
    oscar_noms: u32,
}

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;
    let my_db = client.database("db");
    let my_coll: Collection<Director> = my_db.collection("directors");

    // start-docs
    let docs = vec! [
        Director {
            name: "Todd Haynes".to_string(),
            movies: vec! ["Far From Heaven".to_string(), "Carol".to_string()],
            oscar_noms: 1,
        },
        Director {
            name: "Jane Campion".to_string(),
            movies: vec! ["The Piano".to_string(), "Bright Star".to_string()],
            oscar_noms: 5,
        }
    ];
    // end-docs
    
    let insert_many_result = my_coll.insert_many(docs, None).await?;

    // start-open
    let mut change_stream = my_coll.watch(None, None).await?;

    while let Some(event) = change_stream.next().await.transpose()? {
        println!("Operation performed: {:?}", event.operation_type);
        println!("Document: {:?}", event.full_document);
    }
    // end-open

    // start-pipeline
    let pipeline = vec![
        doc! { "$match" : doc! { "operationType" : "update" } }
    ];

    let mut update_change_stream = my_coll.watch(pipeline, None).await?;
    while let Some(event) = update_change_stream.next().await.transpose()? {
        println!("Update performed: {:?}", event.update_description);
    }
    // end-pipeline

    // start-create-coll
    let enable = ChangeStreamPreAndPostImages::builder().enabled(true).build();
    let opts = CreateCollectionOptions::builder()
        .change_stream_pre_and_post_images(enable)
        .build();

    let result = my_db.create_collection("directors", opts).await?;
    // end-create-coll

    // start-pre
    let pre_image = Some(FullDocumentBeforeChangeType::Required);
    let opts = ChangeStreamOptions::builder()
        .full_document_before_change(pre_image)
        .build();

    let mut change_stream = my_coll.watch(None, opts).await?;
    while let Some(event) = change_stream.next().await.transpose()? {
        println!("Operation performed: {:?}", event.operation_type);
        println!("Pre-image: {:?}", event.full_document_before_change);
    }
    // end-pre

    // start-post
    let post_image = Some(FullDocumentType::WhenAvailable);
    let opts = ChangeStreamOptions::builder()
        .full_document(post_image)
        .build();

    let mut change_stream = my_coll.watch(None, opts).await?;
    while let Some(event) = change_stream.next().await.transpose()? {
        println!("Operation performed: {:?}", event.operation_type);
        println!("Post-image: {:?}", event.full_document);
    }
    // end-post

    Ok(())
}