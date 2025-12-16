use rocket::{State, serde::json::Json, get, http::Status};
use crate::{models::Restaurant, repository::MongoRepo};

#[get("/restaurants")]
pub async fn get_all_restaurants(db: &State<MongoRepo>) -> Result<Json<Vec<Restaurant>>, Status> {
    let restaurants = db.get_all_restaurants().await;
    match restaurants {
        Ok(restaurants) => Ok(Json(restaurants)),
        Err(_) => Err(Status::InternalServerError),
    }
}

#[get("/restaurants/browse")]
pub async fn get_filtered_restaurants(db: &State<MongoRepo>) -> Result<Json<Vec<Restaurant>>, Status> {
    let restaurants = db.get_filtered_restaurants().await;
    match restaurants {
        Ok(restaurants) => Ok(Json(restaurants)),
        Err(_) => Err(Status::InternalServerError),
    }
}