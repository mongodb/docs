use mongodb::bson::{doc, DateTime, from_document};
use mongodb::{Client, Collection};
use serde::{Deserialize, Serialize};
use futures::TryStreamExt;

#[derive(Debug, Deserialize, Serialize)]
struct Movie {
    title: Option<String>,
    plot: Option<String>,
    genres: Option<Vec<String>>,
    released: Option<DateTime>,
}

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection-string>";
    let client = Client::with_uri_str(uri).await?;
    
let agg = vec![
        doc! {
            "$search": {
                "index": "partial-match-tutorial",
                "autocomplete": {
                    "path": "plot",
                    "query": "new purchase",
                    "tokenOrder": "any",
                    "fuzzy": {
                        "maxEdits": 2,
                        "prefixLength": 1,
                        "maxExpansions": 256
                    }
                },
                "highlight": {
                    "path": "plot"
                }
            }
        },
        doc! {
            "$limit": 5
        },
        doc! {
            "$project": {
                "_id": 0,
                "title": 1,
                "plot": 1,
                "highlights": {
                    "$meta": "searchHighlights"
                }
            }
        }
    ];

    let coll: Collection<Movie> = client
        .database("sample_mflix")
        .collection("movies");
    while let Some(doc) = result.try_next().await? {
        let movie: Movie = from_document(doc)?;
        println!("  Title: {}", movie.title.unwrap_or_else(|| "N/A".to_string()));
        println!("  Plot: {}", movie.plot.unwrap_or_else(|| "N/A".to_string()));
        println!();
    }

    Ok(())
}