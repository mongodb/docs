use mongodb::{
    bson::{doc, DateTime},
    Client,
    Collection,
};
use serde::{Deserialize, Serialize};
use tokio;
use futures::stream::TryStreamExt;

// start-structs
#[derive(Debug, Serialize, Deserialize)]
struct Order {
    customer_id: String,
    orderdate: DateTime,
    value: i32,
}
// end-structs

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";

    let client = Client::with_uri_str(uri).await?;
    let agg_db = client.database("agg_tutorials_db");

    // start-insert-orders
    let orders: Collection<Order> = agg_db.collection("orders");
    orders.delete_many(doc! {}).await?;

    let docs = vec![
        Order {
            customer_id: "elise_smith@myemail.com".to_string(),
            orderdate: DateTime::builder().year(2020).month(5).day(30).hour(8).minute(35).second(53).build().unwrap(),
            value: 231,
        },
        Order {
            customer_id: "elise_smith@myemail.com".to_string(),
            orderdate: DateTime::builder().year(2020).month(1).day(13).hour(9).minute(32).second(7).build().unwrap(),
            value: 99,
        },
        Order {
            customer_id: "oranieri@warmmail.com".to_string(),
            orderdate: DateTime::builder().year(2020).month(1).day(1).hour(8).minute(25).second(37).build().unwrap(),
            value: 63,
        },
        Order {
            customer_id: "tj@wheresmyemail.com".to_string(),
            orderdate: DateTime::builder().year(2019).month(5).day(28).hour(19).minute(13).second(32).build().unwrap(),
            value: 2,
        },
        Order {
            customer_id: "tj@wheresmyemail.com".to_string(),
            orderdate: DateTime::builder().year(2020).month(11).day(23).hour(22).minute(56).second(53).build().unwrap(),
            value: 187,
        },
        Order {
            customer_id: "tj@wheresmyemail.com".to_string(),
            orderdate: DateTime::builder().year(2020).month(8).day(18).hour(23).minute(4).second(48).build().unwrap(),
            value: 4,
        },
        Order {
            customer_id: "elise_smith@myemail.com".to_string(),
            orderdate: DateTime::builder().year(2020).month(12).day(26).hour(8).minute(55).second(46).build().unwrap(),
            value: 4,
        },
        Order {
            customer_id: "tj@wheresmyemail.com".to_string(),
            orderdate: DateTime::builder().year(2021).month(2).day(28).hour(7).minute(49).second(32).build().unwrap(),
            value: 1024,
        },
        Order {
            customer_id: "elise_smith@myemail.com".to_string(),
            orderdate: DateTime::builder().year(2020).month(10).day(3).hour(13).minute(49).second(44).build().unwrap(),
            value: 102,
        },
    ];

    orders.insert_many(docs).await?;
    // end-insert-orders

    // Create empty pipeline
    let mut pipeline = Vec::new();

    // start-match
    pipeline.push(doc! {
        "$match": {
            "orderdate": {
                "$gte": DateTime::builder().year(2020).month(1).day(1).build().unwrap(),
                "$lt": DateTime::builder().year(2021).month(1).day(1).build().unwrap(),
            }
        }
    });
    // end-match

    // start-sort1
    pipeline.push(doc! {
        "$sort": {
            "orderdate": 1
        }
    });
    // end-sort1

    // start-group
    pipeline.push(doc! {
        "$group": {
            "_id": "$customer_id",
            "first_purchase_date": { "$first": "$orderdate" },
            "total_value": { "$sum": "$value" },
            "total_orders": { "$sum": 1 },
            "orders": {
                "$push": {
                    "orderdate": "$orderdate",
                    "value": "$value"
                }
            }
        }
    });
    // end-group

    // start-sort2
    pipeline.push(doc! {
        "$sort": {
            "first_purchase_date": 1
        }
    });
    // end-sort2
    
    // start-set
    pipeline.push(doc! {
        "$set": {
            "customer_id": "$_id"
        }
    });
    // end-set

    // start-unset
    pipeline.push(doc! {"$unset": ["_id"] });
    // end-unset

    // start-run-agg
    let mut cursor = orders.aggregate(pipeline).await?;
    // end-run-agg

    while let Some(result) = cursor.try_next().await? {
        println!("* {:?}", result);
    }

    Ok(())
}
