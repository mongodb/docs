use mongodb::{
    bson::{doc, DateTime, Document},
    options::ClientOptions,
    Client,
};
use serde::{Deserialize, Serialize};
use std::{error::Error};
use futures::stream::TryStreamExt;

// start-structs
#[derive(Debug, Serialize, Deserialize)]
struct Order {
    customer_id: String,
    order_date: DateTime,
    product_id: String,
    value: f32,
}

#[derive(Debug, Serialize, Deserialize)]
struct Product {
    id: String,
    name: String,
    category: String,
    description: String,
}
// end-structs

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    let agg_db = client.database("agg_tutorials_db");

    // start-insert-sample-data
    let orders: Collection<Order> = agg_db.collection("orders");
    let products: Collection<Product> = agg_db.collection("products");

    orders.delete_many(doc! {}).await?;
    products.delete_many(doc! {}).await?;

    let order_docs = vec![
        Order {
            customer_id: "elise_smith@myemail.com".to_string(),
            order_date: DateTime::builder().year(2020).month(5).day(30).hour(8).minute(35).second(52).build().unwrap(),
            product_id: "a1b2c3d4".to_string(),
            value: 431.43,
        },
        Order {
            customer_id: "tj@wheresmyemail.com".to_string(),
            order_date: DateTime::builder().year(2019).month(5).day(28).hour(19).minute(13).second(32).build().unwrap(),
            product_id: "z9y8x7w6".to_string(),
            value: 5.01,
        },
        Order {
            customer_id: "oranieri@warmmail.com".to_string(),
            order_date: DateTime::builder().year(2020).month(1).day(1).hour(8).minute(25).second(37).build().unwrap(),
            product_id: "ff11gg22hh33".to_string(),
            value: 63.13,
        },
        Order {
            customer_id: "jjones@tepidmail.com".to_string(),
            order_date: DateTime::builder().year(2020).month(12).day(26).hour(8).minute(55).second(46).build().unwrap(),
            product_id: "a1b2c3d4".to_string(),
            value: 429.65,
        },
    ];
    orders.insert_many(order_docs).await?;

    let product_docs = vec![
        Product {
            id: "a1b2c3d4".to_string(),
            name: "Asus Laptop".to_string(),
            category: "ELECTRONICS".to_string(),
            description: "Good value laptop for students".to_string(),
        },
        Product {
            id: "z9y8x7w6".to_string(),
            name: "The Day Of The Triffids".to_string(),
            category: "BOOKS".to_string(),
            description: "Classic post-apocalyptic novel".to_string(),
        },
        Product {
            id: "ff11gg22hh33".to_string(),
            name: "Morphy Richardds Food Mixer".to_string(),
            category: "KITCHENWARE".to_string(),
            description: "Luxury mixer turning good cakes into great".to_string(),
        },
        Product {
            id: "pqr678st".to_string(),
            name: "Karcher Hose Set".to_string(),
            category: "GARDEN".to_string(),
            description: "Hose + nosels + winder for tidy storage".to_string(),
        },
    ];
    products.insert_many(product_docs).await?;
    // end-insert-sample-data

    let mut pipeline = Vec::new();

    // start-match
    pipeline.push(doc! {
        "$match": {
            "order_date": {
                "$gte": DateTime::builder().year(2020).month(1).day(1).build().unwrap(),
                "$lt": DateTime::builder().year(2021).month(1).day(1).build().unwrap()
            }
        }
    });
    // end-match

    // start-lookup
    pipeline.push(doc! {
        "$lookup": {
            "from": "products",
            "localField": "product_id",
            "foreignField": "id",
            "as": "product_mapping"
        }
    });
    // end-lookup

    // start-set
    pipeline.push(doc! {
        "$set": {
            "product_mapping": { "$first": "$product_mapping" }
        }
    });

    pipeline.push(doc! {
        "$set": {
            "product_name": "$product_mapping.name",
            "product_category": "$product_mapping.category"
        }
    });
    // end-set

    // start-unset
    pipeline.push(doc! {
        "$unset": ["_id", "product_id", "product_mapping"]
    });
    // end-unset

    // start-run-agg
    let mut cursor = orders.aggregate(pipeline).await?;
    // end-run-agg

    while let Some(result) = cursor.try_next().await? {
        println!("* {:?}", result);
    }

    Ok(())
}
