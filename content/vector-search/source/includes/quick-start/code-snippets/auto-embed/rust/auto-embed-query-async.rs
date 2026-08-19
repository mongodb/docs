use mongodb::{
    bson::{Document, doc},
    Client
};
use futures::TryStreamExt;

#[tokio::main]
pub(crate) async fn auto_embed_query() -> mongodb::error::Result<()> {
    // Replace the placeholder with your Atlas connection string
    let client = Client::with_uri_str("<connection-string>").await?;

    let pipeline = vec! [
        doc! {
            "$vectorSearch": doc! {
                "index": "autoembed_index",
                "path": "fullplot",
                "query": doc! {
                    "text": "journey through the country side"
                },
                "numCandidates": 100,
                "model": "voyage-4",
                "limit": 10
            }
        },
        doc! {
            "$project": doc! {
                "_id": 0,
                "title": 1,
                "fullplot": 1,
                "score": doc! { "$meta": "vectorSearchScore"
                }
            }
        }
    ];
    let coll = client.database("sample_mflix").collection::<Document>("movies");
    let mut results = coll.aggregate(pipeline).await?;
    while let Some(result) = results.try_next().await? {
        println!("{}", result);
    }
    Ok(())
}
