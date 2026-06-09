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
                "wildcard": {
                    "path": "plot",
                    "query": "*new* pur*"
                }
            }
        },
        doc! {
            "$limit": 5
        },
        doc! {
            "$project": {
                "_id": 0,
                "plot": 1,
                "title": 1
            }
        }
    ];

    let coll: Collection<Movie> = client
        .database("sample_mflix")
        .collection("movies");
    let mut result = coll.aggregate(agg).await?;
    while let Some(doc) = result.try_next().await? {
        let movie: Movie = from_document(doc)?;
        println!("  Title: {}", movie.title.unwrap_or_else(|| "N/A".to_string()));
        println!("  Plot: {}", movie.plot.unwrap_or_else(|| "N/A".to_string()));
        println!();
    }
    Ok(())
}