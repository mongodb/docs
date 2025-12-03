use bson::{ Document };
use mongodb::{
    bson::doc,
    options::{ CollectionOptions, WriteConcern, ValidationAction, ValidationLevel },
    Client,
    Collection
};
use std::env;

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    let db: mongodb::Database = client.database("test_db");

    // begin-schema-validation
    let validator =
        doc! {
            "$jsonSchema": doc! {
               "bsonType": "object",
               "title": "Answer Value Validation",
               "properties": doc! {
                  "answer": doc! {
                     "enum": vec! [ "yes", "no" ],
                  }
               }
            }
        };

    db.create_collection("survey_answers")
        .validator(validator)
        .validation_action(ValidationAction::Error)
        .validation_level(ValidationLevel::Moderate)
        .await?;
    // end-schema-validation

    Ok(())
}