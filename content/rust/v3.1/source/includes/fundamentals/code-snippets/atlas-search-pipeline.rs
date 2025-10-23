use mongodb::{
    bson::{doc, Document},
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

    // Creates a complex search using multiple operators
    let search_stage = doc! {
        "$search": {
            "index": "<search index name>",
            "compound": {
                "must": [
                    {
                        "equals": {
                            "path": "genres",
                            "value": "Comedy"
                        }
                    },
                    {
                        "phrase": {
                            "path": "fullplot",
                            "query": "new york"
                        }
                    },
                    {
                        "range": {
                            "path": "year",
                            "gte": 1950,
                            "lte": 2000
                        }
                    },
                    {
                        "wildcard": {
                            "path": "title",
                            "query": "Love*"
                        }
                    }
                ]
            }
        }
    };

    let project_stage = doc! {
        "$project": {
            "title": 1,
            "year": 1,
            "genres": 1,
            "_id": 1
        }
    };

    let pipeline = vec![search_stage, project_stage];
    let mut cursor = my_coll.aggregate(pipeline).await?;

    while let Some(doc) = cursor.try_next().await? {
        println!("{}", doc);
    }

    Ok(())
}