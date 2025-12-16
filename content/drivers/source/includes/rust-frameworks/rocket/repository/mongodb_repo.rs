use std::env;
use mongodb::{
    bson::{extjson::de::Error, doc},
    Client, Collection
};
use crate::models::Restaurant;

pub struct MongoRepo {
    col: Collection<Restaurant>,
}

impl MongoRepo {
    pub async fn init() -> Self {
        dotenv::dotenv().ok();
        let uri = match env::var("MONGO_URI") {
            Ok(v) => v.to_string(),
            Err(_) => format!("Error loading env variable"),
        };
        let client = Client::with_uri_str(uri).await.unwrap();
        let db = client.database("sample_restaurants");
        let col: Collection<Restaurant> = db.collection("restaurants");
        MongoRepo { col }
    }

    pub async fn get_all_restaurants(&self) -> Result<Vec<Restaurant>, Error> {
        let mut cursor = self
            .col
            .find(doc! {})
            .await
            .map_err(|e| Error::DeserializationError { message: e.to_string() })?;
        
        let mut restaurants: Vec<Restaurant> = Vec::new();
        while cursor.advance().await.map_err(|e| Error::DeserializationError { message: e.to_string() })? {
            match cursor.deserialize_current() {
                Ok(restaurant) => restaurants.push(restaurant),
                Err(e) => {
                    // Skips documents that can't be deserialized and logs the error
                    eprintln!("Warning: Skipping document due to deserialization error: {}", e);
                    continue;
                }
            }
        }
        Ok(restaurants)
    }

    pub async fn get_filtered_restaurants(&self) -> Result<Vec<Restaurant>, Error> {
        let filter = doc! {
            "borough": "Queens",
            "name": { "$regex": "Moon", "$options": "i" }
        };
        let mut cursor = self
            .col
            .find(filter)
            .await
            .map_err(|e| Error::DeserializationError { message: e.to_string() })?;
        
        let mut restaurants: Vec<Restaurant> = Vec::new();
        while cursor.advance().await.map_err(|e| Error::DeserializationError { message: e.to_string() })? {
            match cursor.deserialize_current() {
                Ok(restaurant) => restaurants.push(restaurant),
                Err(e) => {
                    // Skips documents that can't be deserialized and logs the error
                    eprintln!("Warning: Skipping document due to deserialization error: {}", e);
                    continue;
                }
            }
        }
        Ok(restaurants)
    }
}