use futures::TryStreamExt;
use mongodb::{ bson::doc, bson::Document, Client, Collection, options::{ FindOptions, FindOneOptions } };
use std::env;

use serde::{ Deserialize, Serialize };

#[derive(Serialize, Deserialize, Debug)]
struct Inventory {
    item: String,
    category: String,
    unit_price: f32
}

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "connection string";
    let client = Client::with_uri_str(uri).await?;
    let my_coll: Collection<Inventory> = client.database("db").collection("inventory");

    // start-sample
    let docs = vec![
        Inventory {
            item: "candle".to_string(),
            category: "decor".to_string(),
            unit_price: 2.89,
        },
        Inventory {
            item: "blender".to_string(),
            category: "kitchen".to_string(),
            unit_price: 38.49,
        },
        Inventory {
            item: "placemat".to_string(),
            category: "kitchen".to_string(),
            unit_price: 3.19,
        },
        Inventory {
            item: "watering can".to_string(),
            category: "garden".to_string(),
            unit_price: 11.99,
        },
    ];
    // end-sample

    // Inserts sample documents into the collection
    let insert_many_result = my_coll.insert_many(docs).await?;

    // begin-find-many
    let mut cursor = my_coll
        .find(doc! { "$and": vec!
        [
            doc! { "unit_price": doc! { "$lt": 12.00 } },
            doc! { "category": doc! { "$ne": "kitchen" } }
        ] })
        .sort(doc! { "unit_price": -1 })
        .await?;

    while let Some(result) = cursor.try_next().await? {
        println!("{:?}", result);
    }

    // end-find-many
    print!("\n");

    // begin-find-one
    let result = my_coll
        .find_one(doc! { "unit_price": doc! { "$lte": 20.00 } })
        .skip(2)
        .await?;

    println!("{:#?}", result);
    // end-find-one
    print!("\n");

    // begin-agg
    let pipeline = vec![
        doc! { "$group": doc! { "_id" : doc! {"category": "$category"} ,
        "avg_price" : doc! { "$avg" : "$unit_price" } } },
        doc! { "$sort": { "_id.avg_price" : 1 } },
    ];

    let mut cursor = my_coll.aggregate(pipeline).await?;
    while let Some(result) = cursor.try_next().await? {
        println!("{:?}", result);
    }
    // end-agg

    Ok(())
}
