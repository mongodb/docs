use bson::Document;
use chrono::{ TimeZone, Utc };
use futures::TryStreamExt;
use mongodb::{ bson::doc, Client, Collection, options::{ FindOptions, FindOneOptions } };
use std::env;

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;
    let my_coll: Collection<Document> = client.database("db").collection("inventory");

    let docs = vec![
        doc! { "item": "candle", "category": "decor", "unit_price": 2.89 },
        doc! { "item": "blender", "category": "kitchen", "unit_price": 38.49 },
        doc! { "item": "placemat", "category": "kitchen", "unit_price": 3.19 },
        doc! { "item": "watering can", "category": "garden", "unit_price": 11.99 }
    ];

    my_coll.insert_many(docs, None).await?;

    // begin-find-many
    let opts = FindOptions::builder()
        .sort(doc! { "unit_price": -1 })
        .build();

    let mut cursor = my_coll.find(
        doc! { "$and": vec!
            [
                doc! { "unit_price": doc! { "$lt": 12.00 } },
                doc! { "category": doc! { "$ne": "kitchen" } }
            ] },
        opts
    ).await?;

    while let Some(result) = cursor.try_next().await? {
        let doc = bson::from_document(result)?;
        println!("{}", serde_json::to_string_pretty(&doc).unwrap());
    }
    // end-find-many
    print!("\n");

    // begin-find-one
    let opts = FindOneOptions::builder().skip(2).build();
    let result = my_coll.find_one(
        doc! { "unit_price":
            doc! { "$lte": 20.00 } },
        opts
    ).await?;

    println!("{}", serde_json::to_string_pretty(&result).unwrap());
    // end-find-one
    print!("\n");

    // begin-agg
    let pipeline = vec![
        doc! { "$group": doc! { "_id" : doc! {"category": "$category"} ,
                                "avg_price" : doc! { "$avg" : "$unit_price" } } },
        doc! { "$sort": { "_id.avg_price" : 1 } }
    ];

    let mut cursor = my_coll.aggregate(pipeline, None).await?;
    while let Some(result) = cursor.try_next().await? {
        let doc = bson::from_document(result)?;
        println!("{}", serde_json::to_string_pretty(&doc).unwrap());
    }
    // end-agg

    Ok(())
}
