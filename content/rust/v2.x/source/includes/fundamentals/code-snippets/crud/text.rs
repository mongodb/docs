use std::env;
use bson::Document;
use futures::TryStreamExt;
use mongodb::{ bson::doc, Client, Collection, IndexModel, options::FindOptions };
use serde::{ Deserialize, Serialize };

// start-dish-struct
#[derive(Serialize, Deserialize, Debug)]
struct Dish {
    name: String,
    description: String,
}
// end-dish-struct

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;
    let my_coll: Collection<Dish> = client.database("db").collection("menu");
    let _ = my_coll.insert_many(
        [
            Dish {
                name: "Shepherd’s Pie".to_string(),
                description: "A vegetarian take on the classic dish that uses lentils as a base. Serves 2.".to_string(),
            },
            Dish {
                name: "Green Curry".to_string(),
                description: "A flavorful Thai curry, made vegetarian with tofu. Vegetarian and vegan friendly.".to_string(),
            },
            Dish {
                name: "Herbed Branzino".to_string(),
                description: "Grilled whole fish stuffed with herbs and pomegranate seeds. Serves 3-4.".to_string(),
            },
            Dish {
                name: "Kale Tabbouleh".to_string(),
                description: "A bright, herb-based salad. A perfect starter for vegetarians and vegans.".to_string(),
            },
            Dish {
                name: "Garlic Butter Trout".to_string(),
                description: "Baked trout seasoned with garlic, lemon, dill, and, of course, butter. Serves 2.".to_string(),
            },
        ],
        None
    ).await?;

    // begin-idx
    let index = IndexModel::builder()
        .keys(doc! { "description": "text" })
        .build();

    let idx_res = my_coll.create_index(index, None).await?;
    // end-idx

    // begin-by-term
    let filter = doc! { "$text": { "$search": "herb" } };

    let mut cursor = my_coll.find(filter, None).await?;
    while let Some(doc) = cursor.try_next().await? {
        println!("{:?}", doc);
    }
    // end-by-term

    // begin-by-phrase
    let filter = doc! { "$text": { "$search": "\"serves 2\"" } };

    let mut cursor = my_coll.find(filter, None).await?;
    while let Some(doc) = cursor.try_next().await? {
        println!("{:?}", doc);
    }
    // end-by-phrase

    // begin-exclude-term
    let filter = doc! { "$text": { "$search": "vegan -tofu" } };

    let mut cursor = my_coll.find(filter, None).await?;
    while let Some(doc) = cursor.try_next().await? {
        println!("{:?}", doc);
    }
    // end-exclude-term

    // begin-sort-relevance
    let filter = doc! { "$text": { "$search": "vegetarian" } };

    let sort = doc! { "score": { "$meta": "textScore" } };
    let projection =
        doc! { 
        "_id": 0, 
        "name": 1, 
        "score": { "$meta": "textScore" } 
    };
    let opts = FindOptions::builder().sort(sort).projection(projection).build();

    let doc_coll: Collection<Document> = my_coll.clone_with_type();
    let mut cursor = doc_coll.find(filter, opts).await?;

    while let Some(doc) = cursor.try_next().await? {
        println!("{:?}", doc);
    }
    // end-sort-relevance

    // begin-agg-term
    let match_stage = doc! { "$match": { "$text": { "$search": "herb" } } };

    let mut cursor = my_coll.aggregate([match_stage], None).await?;
    while let Some(doc) = cursor.try_next().await? {
        println!("{:?}", doc);
    }
    // end-agg-term

    // begin-agg-relevance
    let match_stage = doc! { "$match": { "$text": { "$search": "vegetarian" } } };
    let sort_stage = doc! { "$sort": { "score": { "$meta": "textScore" } } };
    let proj_stage =
        doc! { "$project": { 
        "_id": 0, 
        "name": 1, 
        "score": { "$meta": "textScore" } 
    } };

    let pipeline = [match_stage, sort_stage, proj_stage];
    let mut cursor = my_coll.aggregate(pipeline, None).await?;
    while let Some(doc) = cursor.try_next().await? {
        println!("{:?}", doc);
    }
    // end-agg-relevance

    Ok(())
}
