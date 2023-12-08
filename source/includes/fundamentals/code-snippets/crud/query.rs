use std::env;
use futures::TryStreamExt;
use mongodb::{ bson::{doc, Document}, Client, Collection };

use serde::{ Deserialize, Serialize };

// begin-data-struct
#[derive(Serialize, Deserialize, Debug)]
struct Fruit {
    _id: String,
    name: String,
    quantity: i32,
    #[serde(skip_serializing_if = "Option::is_none")]
    description: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    vendors: Option<Vec<String>>
}
// end-data-struct

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;
    let my_coll: Collection<Fruit> = client.database("db").collection("fruits");

    //begin-sample-docs
    let docs = vec! [
        Fruit { 
            _id: 1.to_string(), 
            name: "orange".to_string(), 
            quantity: 7,
            description: None,
            vendors: None
        },
        Fruit { 
            _id: 2.to_string(), 
            name: "apple".to_string(), 
            quantity: 4,
            description: Some("Granny Smith".to_string()),
            vendors: None
        },
        Fruit { 
            _id: 3.to_string(), 
            name: "banana".to_string(), 
            quantity: 36,
            description: None,
            vendors: None
        },
        Fruit { 
            _id: 4.to_string(), 
            name: "pear".to_string(), 
            quantity: 28,
            description: None,
            vendors: vec!["A".to_string(), "C".to_string() ].into()
        },
    ];
    //end-sample-docs

    // Inserts sample documents into the collection
    let insert_many_result = my_coll.insert_many(docs, None).await?;

    //begin-literal
    let query = doc! { "name": "pear" };
    let mut cursor = my_coll.find(query, None).await?;
    while let Some(doc) = cursor.try_next().await? {
        println!("{:?}", doc);
    }
    //end-literal
    println!("");
    //begin-comparison
    // $gt means "greater than"
    let query = doc! { "quantity": doc! { "$gt": 5 } };
    let mut cursor = my_coll.find(query, None).await?;
    while let Some(doc) = cursor.try_next().await? {
        println!("{:?}", doc);
    }
    //end-comparison
    println!("");
    //begin-logical
    let query =
        doc! { "$and": [
           doc! { "quantity": doc! { "$gt": 10 } },
           doc! { "quantity": doc! { "$mod": [ 3, 0 ] } }
       ]
    };
    let mut cursor = my_coll.find(query, None).await?;
    while let Some(doc) = cursor.try_next().await? {
        println!("{:?}", doc);
    }
    //end-logical
    println!("");
    //begin-element
    let query = doc! { "description": doc! { "$exists": true } };
    let mut cursor = my_coll.find(query, None).await?;
    while let Some(doc) = cursor.try_next().await? {
        println!("{:?}", doc);
    }
    //end-element
    println!("");
    //begin-evaluation
    // $mod means "modulo" and checks if the remainder is a specific value
    let query = doc! { "quantity": doc! { "$mod": [ 3, 0 ] } };
    let mut cursor = my_coll.find(query, None).await?;
    while let Some(doc) = cursor.try_next().await? {
        println!("{:?}", doc);
    }
    //end-evaluation
    println!("");
    //begin-bitwise
    let query = doc! { "quantity": doc! { "$bitsAllSet": 7 } };
    let mut cursor = my_coll.find(query, None).await?;
    while let Some(doc) = cursor.try_next().await? {
        println!("{:?}", doc);
    }
    //end-bitwise
    println!("");
    //begin-array
    let query = doc! { "vendors": doc! { "$elemMatch": { "$eq": "C" } } };
    let mut cursor = my_coll.find(query, None).await?;
    while let Some(doc) = cursor.try_next().await? {
        println!("{:?}", doc);
    }
    //end-array

    Ok(())
}
