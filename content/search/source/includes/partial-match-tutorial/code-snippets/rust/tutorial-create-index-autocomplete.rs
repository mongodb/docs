use mongodb::bson::{doc, Document};
use mongodb::{Client, Collection, SearchIndexModel, SearchIndexType};

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    // Connects to your Atlas deployment
    let uri = "<connection-string>";

    let client = Client::with_uri_str(uri).await?;

    // Sets the namespace
    let collection: Collection<Document> = client
        .database("sample_mflix")
        .collection("movies");

    // Defines your MongoDB Search index for autocomplete
    let index = doc! {
        "mappings": doc! {
            "dynamic": false,
            "fields": doc! {
                "plot": doc! {
                    "type": "autocomplete",
                    "tokenization": "edgeGram",
                    "minGrams": 2,
                    "maxGrams": 15,
                    "foldDiacritics": true
                }
            }
        }
    };

    let idx_model = SearchIndexModel::builder()
        .definition(index)
        .name("partial-match-tutorial".to_string())
        .index_type(SearchIndexType::Search)
        .build();

    // Runs the helper method
    let result = collection.create_search_index(idx_model).await?;
    println!("{}", result);

    Ok(())
}
