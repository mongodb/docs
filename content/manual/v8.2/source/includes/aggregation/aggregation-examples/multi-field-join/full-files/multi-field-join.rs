use mongodb::{
    bson::{doc, DateTime, Bson, Document},
    Client,
    Collection,
};
use serde::{Deserialize, Serialize};
use futures::stream::TryStreamExt;
use std::error::Error;

// start-structs
#[derive(Debug, Serialize, Deserialize)]
struct Product {
    name: String,
    variation: String,
    category: String,
    description: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Order {
    customer_id: String,
    order_date: DateTime,
    product_name: String,
    product_variation: String,
    value: f32,
}
// end-structs

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;
    let agg_db = client.database("agg_tutorials_db");

    // start-insert-sample-data
    let products: Collection<Product> = agg_db.collection("products");
    let orders: Collection<Order> = agg_db.collection("orders");

    products.delete_many(doc! {}).await?;
    orders.delete_many(doc! {}).await?;

    let product_docs = vec![
        Product {
            name: "Asus Laptop".to_string(),
            variation: "Ultra HD".to_string(),
            category: "ELECTRONICS".to_string(),
            description: "Great for watching movies".to_string(),
        },
        Product {
            name: "Asus Laptop".to_string(),
            variation: "Standard Display".to_string(),
            category: "ELECTRONICS".to_string(),
            description: "Good value laptop for students".to_string(),
        },
        Product {
            name: "The Day Of The Triffids".to_string(),
            variation: "1st Edition".to_string(),
            category: "BOOKS".to_string(),
            description: "Classic post-apocalyptic novel".to_string(),
        },
        Product {
            name: "The Day Of The Triffids".to_string(),
            variation: "2nd Edition".to_string(),
            category: "BOOKS".to_string(),
            description: "Classic post-apocalyptic novel".to_string(),
        },
        Product {
            name: "Morphy Richards Food Mixer".to_string(),
            variation: "Deluxe".to_string(),
            category: "KITCHENWARE".to_string(),
            description: "Luxury mixer turning good cakes into great".to_string(),
        },
    ];
    products.insert_many(product_docs).await?;

    let order_docs = vec![
        Order {
            customer_id: "elise_smith@myemail.com".to_string(),
            order_date: DateTime::builder().year(2020).month(5).day(30).hour(8).minute(35).second(52).build().unwrap(),
            product_name: "Asus Laptop".to_string(),
            product_variation: "Standard Display".to_string(),
            value: 431.43,
        },
        Order {
            customer_id: "tj@wheresmyemail.com".to_string(),
            order_date: DateTime::builder().year(2019).month(5).day(28).hour(19).minute(13).second(32).build().unwrap(),
            product_name: "The Day Of The Triffids".to_string(),
            product_variation: "2nd Edition".to_string(),
            value: 5.01,
        },
        Order {
            customer_id: "oranieri@warmmail.com".to_string(),
            order_date: DateTime::builder().year(2020).month(1).day(1).hour(8).minute(25).second(37).build().unwrap(),
            product_name: "Morphy Richards Food Mixer".to_string(),
            product_variation: "Deluxe".to_string(),
            value: 63.13,
        },
        Order {
            customer_id: "jjones@tepidmail.com".to_string(),
            order_date: DateTime::builder().year(2020).month(12).day(26).hour(8).minute(55).second(46).build().unwrap(),
            product_name: "Asus Laptop".to_string(),
            product_variation: "Standard Display".to_string(),
            value: 429.65,
        },
    ];
    orders.insert_many(order_docs).await?;
    // end-insert-sample-data

    let mut pipeline = Vec::new();

    // start-embedded-pl-match1
    let mut embedded_pipeline = Vec::new();
    embedded_pipeline.push(doc! {
        "$match": {
            "$expr": {
                "$and": [
                    { "$eq": ["$product_name", "$$prdname"] },
                    { "$eq": ["$product_variation", "$$prdvartn"] }
                ]
            }
        }
    });
    // end-embedded-pl-match1

    // start-embedded-pl-match2
    embedded_pipeline.push(doc! {
        "$match": {
            "order_date": {
                "$gte": DateTime::builder().year(2020).month(1).day(1).build().unwrap(),
                "$lt": DateTime::builder().year(2021).month(1).day(1).build().unwrap()
            }
        }
    });
    // end-embedded-pl-match2

    // start-embedded-pl-unset
    embedded_pipeline.push(doc! {
        "$unset": ["_id", "product_name", "product_variation"]
    });
    // end-embedded-pl-unset

    // start-lookup
    pipeline.push(doc! {
        "$lookup": {
            "from": "orders",
            "let": {
                "prdname": "$name",
                "prdvartn": "$variation"
            },
            "pipeline": embedded_pipeline,
            "as": "orders"
        }
    });
    // end-lookup

    // start-match
    pipeline.push(doc! {
        "$match": {
            "orders": { "$ne": [] }
        }
    });
    // end-match

    // start-unset
    pipeline.push(doc! {
        "$unset": ["_id", "description"]
    });
    // end-unset

    // start-run-agg
    let mut cursor = products.aggregate(pipeline).await?;
    // end-run-agg

    while let Some(result) = cursor.try_next().await? {
        println!("* {:?}", result);
    }

    Ok(())
}
