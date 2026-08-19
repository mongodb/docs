use mongodb::bson::{doc, Document};
use mongodb::sync::{Client, Collection};

fn main() -> mongodb::error::Result<()> {
    // Replace the placeholder with your connection string.
    let uri = "<connection-string>";
    let client = Client::with_uri_str(uri)?;

    // Access your database and collection.
    let my_coll: Collection<Document> = client
        .database("sample_mflix")
        .collection("movies");

    // Define the pipeline for your $vectorSearch query.
    let pipeline = vec![
        doc! {
            "$vectorSearch": doc! {
                "index": "autoembed_index",
                "path": "fullplot",
                "query": doc! {
                    "text": "young heroes caught in epic struggles between light and darkness"
                },
                "numCandidates": 100,
                "limit": 10
            }
        },
        doc! {
            "$project": doc! {
                "_id": 0,
                "title": 1,
                "fullplot": 1,
                "score": doc! { "$meta": "vectorSearchScore" }
            }
        },
    ];

    // Run the query and print the results.
    let mut cursor = my_coll.aggregate(pipeline).run()?;
    while cursor.advance()? {
        println!("{}", cursor.deserialize_current()?);
    }

    Ok(())
}
