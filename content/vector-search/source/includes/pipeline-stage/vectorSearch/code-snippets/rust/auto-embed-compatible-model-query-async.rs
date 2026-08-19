use mongodb::bson::{doc, Document};
use mongodb::{Client, Collection};
use futures::TryStreamExt;

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    // Replace the placeholder with your connection string.
    let uri = "<connection-string>";
    let client = Client::with_uri_str(uri).await?;

    // Access your database and collection.
    let my_coll: Collection<Document> = client
        .database("sample_mflix")
        .collection("movies");

    // Specify a compatible model to override the model in the index.
    let pipeline = vec![
        doc! {
            "$vectorSearch": doc! {
                "index": "autoembed_index",
                "path": "fullplot",
                "query": doc! {
                    "text": "young heroes caught in epic struggles between light and darkness"
                },
                "model": "voyage-4-large",
                "numCandidates": 100,
                "limit": 10
            }
        },
        doc! {
            "$project": doc! {
                "_id": 0,
                "title": 1,
                "fullplot": 1,
                "year": 1,
                "genres": 1,
                "score": doc! { "$meta": "vectorSearchScore" }
            }
        },
    ];

    // Run the query and print the results.
    let mut results = my_coll.aggregate(pipeline).await?;
    while let Some(result) = results.try_next().await? {
        println!("{}", result);
    }

    Ok(())
}
