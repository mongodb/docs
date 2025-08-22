use mongodb::bson::{doc, Document, DateTime};
use mongodb::{Client, Collection};
use futures::TryStreamExt;

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    // Connect to your Atlas cluster
    let uri = "<connection-string>";
    let client = Client::with_uri_str(uri).await?;

    // Defines the pipeline
    let pipeline = vec![
        doc! {
            "$search": {
                "index": "facet-tutorial",
                "facet": {
                    "operator": {
                        "near": {
                            "path": "released",
                            "origin": DateTime::from_millis(-1529971200000i64), // 1921-11-01T00:00:00.000Z
                            "pivot": 7776000000i64
                        }
                    },
                    "facets": {
                        "genresFacet": {
                            "type": "string", "path": "genres"
                        },
                        "yearFacet": {
                            "type": "number", "path": "year", "boundaries": [1910, 1920, 1930, 1940]
                        }
                    }
                }
            }
        },
        doc! {
            "$facet": {
                "meta": [
                    {"$replaceWith": "$$SEARCH_META"},
                    {"$limit": 1}
                ]
            }
        },
        doc! {
            "$set": {
                "meta": {"$arrayElemAt": ["$meta", 0]}
            }
        }
    ];

    // Runs the pipeline
    let collection: Collection<Document> = client
        .database("sample_mflix")
        .collection("movies");    
    let mut cursor = collection.aggregate(pipeline).await?;

    // Prints the results
    while let Some(doc) = cursor.try_next().await? {
        println!("{:#?}", doc);
    }

    Ok(())
}