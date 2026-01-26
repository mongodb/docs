use futures::stream::TryStreamExt;
use mongodb::{
    bson::doc,
    Collection,
};

use crate::models::RestaurantRow;

pub async fn fetch_all(restaurants: &Collection<RestaurantRow>) -> Result<Vec<RestaurantRow>, mongodb::error::Error> {
    let cursor = restaurants
        .find(doc! {})
        .projection(doc! {
            "name": 1,
            "borough": 1,
            "cuisine": 1,
            "_id": 1,
        })
        .await?;
    cursor.try_collect().await
}

pub async fn fetch_by_borough(
    restaurants: &Collection<RestaurantRow>,
    borough: &str,
    name: &str,
) -> Result<Vec<RestaurantRow>, mongodb::error::Error> {
    let filter = doc! { 
        "borough": borough,
        "name": { "$regex": name, "$options": "i" } 
    };
    
    let cursor = restaurants
        .find(filter)
        .projection(doc! {
            "name": 1,
            "borough": 1,
            "cuisine": 1,
            "_id": 1,
        })
        .await?;
    cursor.try_collect().await
}