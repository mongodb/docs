mod db;
mod models;
mod services;
mod pages;

use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};
use dotenv::dotenv;
use mongodb::bson::doc;
use mongodb::Collection;
use std::env;

use crate::models::RestaurantRow;


// Shared state to hold the MongoDB collection
#[derive(Clone)]
struct AppState {
    restaurants: Collection<RestaurantRow>,
}

#[get("/health")]
async fn health_check() -> impl Responder {
    HttpResponse::Ok().body("Healthy")
}


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let mongo_uri = env::var("MONGO_URI").expect("MONGO_URI must be set in .env file");
    let port: u16 = env::var("PORT")
        .unwrap_or_else(|_| "5050".to_string())
        .parse()
        .expect("PORT must be a valid u16 number");

    print!("Starting server on port {port}...\n");

    let db = db::init_db(&mongo_uri).await;

    let restaurants: Collection<RestaurantRow> = db.collection::<RestaurantRow>("restaurants");

    // Extra ping to be sure connection is working
    let ping_result = db.run_command(doc! {"ping": 1},).await;
    print!("MongoDB ping result: {ping_result:?}\n");

    let state = AppState {restaurants};

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(state.clone()))
            .service(health_check)
            .service(pages::get_restaurants)
            .service(pages::get_restaurants_by_borough)
    })
    .bind(("127.0.0.1", port))?
    .run()
    .await
}