use mongodb::bson::{doc, DateTime};
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
    // Replace the placeholder with your connection string
    let uri = "<connection-string>";
    let client = Client::with_uri_str(uri).await?;

    let collection: Collection<Movie> = client
        .database("sample_mflix")
        .collection("movies");

    let query = vec![
        doc! {
            "$search": {
                "index": "search_idx",
                "text": {
                    "query": "baseball",
                    "path": "plot"
                }
            }
        },
        doc! {
            "$limit": 3
        },
        doc! {
            "$project": {
                "_id": 0,
                "title": 1,
                "plot": 1
            }
        }
    ];

    println!("Executing aggregation query...");
    let mut results = movies.aggregate(query).await?;
    
    println!("Processing results...");
    while let Some(doc) = results.try_next().await? {
        let movie: Movie = mongodb::bson::from_document(doc)?;
        println!("{{ \"title\": {:?}, \"plot\": {:?} }}", 
                 movie.title.unwrap_or_else(|| "N/A".to_string()),
                 movie.plot.unwrap_or_else(|| "N/A".to_string()));
    }
    Ok(())
}
