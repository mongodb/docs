use mongodb::{
    bson::doc,
    Client,
    Collection,
};
use serde::{Deserialize, Serialize};
use futures::stream::TryStreamExt;

// start-structs
#[derive(Debug, Serialize, Deserialize)]
struct Product {
    prod_id: String,
    name: String,
    price: i32,
}

#[derive(Debug, Serialize, Deserialize)]
struct Order {
    order_id: i64,
    products: Vec<Product>,
}
// end-structs

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    let agg_db = client.database("agg_tutorials_db");
    agg_db.drop().await?;

    // start-insert-orders
    let orders_coll: Collection<Order> = agg_db.collection("orders");
    orders.delete_many(doc! {}).await?;

    let orders = vec![
        Order {
            order_id: 6363763262239,
            products: vec![
                Product {
                    prod_id: "abc12345".to_string(),
                    name: "Asus Laptop".to_string(),
                    price: 431,
                },
                Product {
                    prod_id: "def45678".to_string(),
                    name: "Karcher Hose Set".to_string(),
                    price: 22,
                },
            ],
        },
        Order {
            order_id: 1197372932325,
            products: vec![Product {
                prod_id: "abc12345".to_string(),
                name: "Asus Laptop".to_string(),
                price: 429,
            }],
        },
        Order {
            order_id: 9812343774839,
            products: vec![
                Product {
                    prod_id: "pqr88223".to_string(),
                    name: "Morphy Richards Food Mixer".to_string(),
                    price: 431,
                },
                Product {
                    prod_id: "def45678".to_string(),
                    name: "Karcher Hose Set".to_string(),
                    price: 21,
                },
            ],
        },
        Order {
            order_id: 4433997244387,
            products: vec![
                Product {
                    prod_id: "def45678".to_string(),
                    name: "Karcher Hose Set".to_string(),
                    price: 23,
                },
                Product {
                    prod_id: "jkl77336".to_string(),
                    name: "Picky Pencil Sharpene".to_string(),
                    price: 1,
                },
                Product {
                    prod_id: "xyz11228".to_string(),
                    name: "Russell Hobbs Chrome Kettle".to_string(),
                    price: 16,
                },
            ],
        },
    ];

    orders_coll.insert_many(orders).await?;
    // end-insert-orders

    let mut pipeline = Vec::new();

    // start-unwind
    pipeline.push(doc! {
        "$unwind": {
            "path": "$products"
        }
    });
    // end-unwind

    // start-match
    pipeline.push(doc! {
        "$match": {
            "products.price": { "$gt": 15 }
        }
    });
    // end-match

    // start-group
    pipeline.push(doc! {
        "$group": {
            "_id": "$products.prod_id",
            "product": { "$first": "$products.name" },
            "total_value": { "$sum": "$products.price" },
            "quantity": { "$sum": 1 }
        }
    });
    // end-group

    // start-set
    pipeline.push(doc! {
        "$set": {
            "prod_id": "$_id"
        }
    });
    // end-set

    // start-unset
    pipeline.push(doc! {
        "$unset": ["_id"]
    });
    // end-unset

    // start-run-agg
    let mut cursor = orders_coll.aggregate(pipeline).await?;
    // end-run-agg

    while let Some(result) = cursor.try_next().await? {
        println!("* {:?}", result);
    }

    Ok(())
}
