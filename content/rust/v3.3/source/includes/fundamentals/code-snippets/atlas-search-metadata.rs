use mongodb::{
    bson::{doc, Document, DateTime},
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

    // Defines the $searchMeta pipeline stage
    let pipeline = vec![
        doc! {
            "$searchMeta": {
                "index": "<search index name>",
                "near": {
                    "path": "released",
                    "origin": DateTime::parse_rfc3339_str("2011-09-01T00:00:00.000Z")
                        .unwrap(),
                    "pivot": 7776000000i64
                }
            }
        }
    ];

    let mut cursor = my_coll.aggregate(pipeline).await?;

    while let Some(doc) = cursor.try_next().await? {
        println!("{}", doc);
    }

    Ok(())
}