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
struct Address {
    number: i32,
    street: String,
    city: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Person {
    person_id: String,
    firstname: String,
    lastname: String,
    dateofbirth: DateTime,
    vocation: String,
    address: Address,
}
// end-structs

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";

    let client = Client::with_uri_str(uri).await?;
    let agg_db = client.database("agg_tutorials_db");

    // start-insert-persons
    let persons: Collection<Person> = agg_db.collection("persons");
    persons.delete_many(doc! {}).await?;

    let data = vec![
        Person {
            person_id: "6392529400".to_string(),
            firstname: "Elise".to_string(),
            lastname: "Smith".to_string(),
            dateofbirth: DateTime::builder().year(1972).month(1).day(13).hour(9).minute(32).second(7).build().unwrap(),
            vocation: "ENGINEER".to_string(),
            address: Address {
                number: 5625,
                street: "Tipa Circle".to_string(),
                city: "Wojzinmoj".to_string(),
            },
        },
        Person {
            person_id: "1723338115".to_string(),
            firstname: "Olive".to_string(),
            lastname: "Ranieri".to_string(),
            gender: "FEMALE".to_string(),
            dateofbirth: DateTime::builder().year(1985).month(5).day(12).hour(23).minute(14).second(30).build().unwrap(),
            vocation: "ENGINEER".to_string(),
            address: Address {
                number: 9303,
                street: "Mele Circle".to_string(),
                city: "Tobihbo".to_string(),
            },
        },
        Person {
            person_id: "8732762874".to_string(),
            firstname: "Toni".to_string(),
            lastname: "Jones".to_string(),
            dateofbirth: DateTime::builder().year(1991).month(11).day(23).hour(16).minute(53).second(56).build().unwrap(),
            vocation: "POLITICIAN".to_string(),
            address: Address {
                number: 1,
                street: "High Street".to_string(),
                city: "Upper Abbeywoodington".to_string(),
            },
        },
        Person {
            person_id: "7363629563".to_string(),
            firstname: "Bert".to_string(),
            lastname: "Gooding".to_string(),
            dateofbirth: DateTime::builder().year(1941).month(4).day(7).hour(22).minute(11).second(52).build().unwrap(),
            vocation: "FLORIST".to_string(),
            address: Address {
                number: 13,
                street: "Upper Bold Road".to_string(),
                city: "Redringtonville".to_string(),
            },
        },
        Person {
            person_id: "1029648329".to_string(),
            firstname: "Sophie".to_string(),
            lastname: "Celements".to_string(),
            dateofbirth: DateTime::builder().year(1959).month(7).day(6).hour(17).minute(35).second(45).build().unwrap(),
            vocation: "ENGINEER".to_string(),
            address: Address {
                number: 5,
                street: "Innings Close".to_string(),
                city: "Basilbridge".to_string(),
            },
        },
        Person {
            person_id: "7363626383".to_string(),
            firstname: "Carl".to_string(),
            lastname: "Simmons".to_string(),
            dateofbirth: DateTime::builder().year(1998).month(12).day(26).hour(13).minute(13).second(55).build().unwrap(),
            vocation: "ENGINEER".to_string(),
            address: Address {
                number: 187,
                street: "Hillside Road".to_string(),
                city: "Kenningford".to_string(),
            },
        },
    ];

    persons.insert_many(data).await?;
    // end-insert-persons

    // Create empty pipeline
    let mut pipeline = Vec::new();

    // start-match
    pipeline.push(doc! { "$match": { "vocation": "ENGINEER" } });
    // end-match

    // start-sort
    pipeline.push(doc! { "$sort": { "dateofbirth": -1 } });
    // end-sort

    // start-limit
    pipeline.push(doc! { "$limit": 3 });
    // end-limit

    // start-unset
    pipeline.push(doc! { "$unset": ["_id", "address"] });
    // end-unset

    // start-run-agg
    let mut cursor = persons.aggregate(pipeline).await?;
    // end-run-agg

    println!("Aggregation results:");
    while let Some(result) = cursor.try_next().await? {
        println!("* {:?}", result);
    }

    Ok(())
}
