use bson::{doc, Document};
use futures::TryStreamExt;
use mongodb::{Client, Collection, SearchIndexModel, SearchIndexType};

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    let my_coll: Collection<Document> = client
        .database("sample_mflix")
        .collection("embedded_movies");

    // begin-as-model
    let def = doc! { "mappings": doc! {
        "dynamic": false,
        "fields": {
            "title": {"type": "string"},
            "released": {"type": "date"}
        }
    }};

    let idx_model = SearchIndexModel::builder()
        .definition(def)
        .name("search_idx".to_string())
        .index_type(SearchIndexType::Search)
        .build();
    // end-as-model

    // begin-avs-model
    let def = doc! {
        "fields": [{
            "type": "vector",
            "path": "plot_embedding",
            "numDimensions": 1536,
            "similarity": "euclidean",
        }]
    };

    let idx_model = SearchIndexModel::builder()
        .definition(def)
        .name("vs_idx".to_string())
        .index_type(SearchIndexType::VectorSearch)
        .build();
    // end-avs-model

    // begin-atlas-create-one
    let idx_model = SearchIndexModel::builder()
        .definition(doc! { "mappings": doc! {"dynamic": true} })
        .name("example_index".to_string())
        .build();

    let result = my_coll.create_search_index(idx_model).await?;
    println!("Created Atlas Search index:\n{}", result);
    // end-atlas-create-one

    // begin-atlas-create-many
    let as_idx = SearchIndexModel::builder()
        .definition(doc! { "mappings": doc! {"dynamic": true} })
        .name("as_idx".to_string())
        .build();

    let vs_idx = SearchIndexModel::builder()
        .definition(doc! {
            "fields": [{
                "type": "vector",
                "path": "plot_embedding",
                "numDimensions": 1536,
                "similarity": "euclidean",
            }]
        })
        .name("vs_idx".to_string())
        .index_type(SearchIndexType::VectorSearch)
        .build();

    let models = vec![as_idx, vs_idx];
    let result = my_coll.create_search_indexes(models).await?;
    println!("Created indexes:\n{:?}", result);
    // end-atlas-create-many

    // begin-atlas-list
    let mut cursor = my_coll.list_search_indexes().await?;
    while let Some(index) = cursor.try_next().await? {
        println!("{}\n", index);
    }
    // end-atlas-list

    // begin-atlas-update
    let name = "vs_index";
    let updated_def = doc! {
        "fields": [{
            "type": "vector",
            "path": "plot_embedding",
            "numDimensions": 1536,
            "similarity": "dotProduct",
        }]
    };
    my_coll.update_search_index(name, updated_def).await?;
    // end-atlas-update

    // begin-atlas-drop
    let name = "example_index";
    my_coll.drop_search_index(name).await?;
    // end-atlas-drop

    Ok(())
}
