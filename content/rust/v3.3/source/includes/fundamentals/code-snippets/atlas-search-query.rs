use mongodb::{
       bson::{doc, Document},
       Client, Collection,
   };

use futures::stream::TryStreamExt;

#[tokio::main]
  async fn main() -> mongodb::error::Result<()> {
    // Replace the uri string with your connection string
    let uri = "<connection string uri>";
    let client = Client::with_uri_str(uri).await?;

    let my_coll: Collection<Document> = client
        .database("sample_mflix")
        .collection("movies");

    // Defines the MongoDB Search query
    let pipeline = vec![
        doc! {
          "$search": {
            "index": "<search index name>",
              "text": {
                "query": "Alabama",
                "path": "title"
              }
          }
        },
        doc! {
          "$project": {
            "title": 1,
            "_id": 1
            }
        }
    ];

    // Runs the aggregation pipeline
    let mut cursor = my_coll.aggregate(pipeline).await?;

    // Prints the results
    while let Some(doc) = cursor.try_next().await? {
      println!("{}", doc);
    }

    Ok(())
  }