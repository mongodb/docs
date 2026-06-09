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
    // Replace the placeholder with your connection string
    let uri = "<connection-string>";
    let client = Client::with_uri_str(uri).await?;

    let query = vec![
        doc! {
            "$search": {
                "index": "search_idx",
                "compound": {
                    "must": [
                        {
                            "text": {
                                "query": "baseball",
                                "path": "plot"
                            }
                        }
                    ],
                    "mustNot": [
                        {
                            "text": {
                                "query": ["Comedy", "Romance"],
                                "path": "genres"
                            }
                        }
                    ]
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
                "plot": 1,
                "genres": 1
            }
        }
    ];

    let movies: Collection<Movie> = client
        .database("sample_mflix")
        .collection("movies");

    let mut result = collection.aggregate(query).await?;
    
    while let Some(doc) = result.try_next().await? {
        let movie: Movie = from_document(doc)?;
        println!("  Title: '{}'", movie.title.unwrap_or_else(|| "N/A".to_string()));
        println!("  Plot: '{}'", movie.plot.unwrap_or_else(|| "N/A".to_string()));
        println!("  Genres: {:?}", movie.genres.unwrap_or_default());
        println!();
    }
    Ok(())
}
