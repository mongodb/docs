mod api; 
mod models;
mod repository;

#[macro_use]
extern crate rocket;
use rocket::{get, fs::FileServer, response::content::RawHtml};
use rocket_dyn_templates::Template;

use api::restaurant_api::{get_all_restaurants, get_filtered_restaurants};
use repository::MongoRepo;

#[get("/")]
async fn index() -> RawHtml<String> {
    let template_content = std::fs::read_to_string("templates/index.hbs").unwrap_or_else(|_| {
        r#"<!DOCTYPE html>
<html><head><title>Error</title></head>
<body><h1>Template not found</h1></body></html>"#.to_string()
    });
    RawHtml(template_content)
}

#[get("/browse")]
async fn browse() -> RawHtml<String> {
    let template_content = std::fs::read_to_string("templates/index.hbs").unwrap_or_else(|_| {
        r#"<!DOCTYPE html>
<html><head><title>Error</title></head>
<body><h1>Template not found</h1></body></html>"#.to_string()
    });
    RawHtml(template_content)
}

#[rocket::launch]
async fn rocket() -> _ {
    let db = MongoRepo::init().await;
    rocket::build()
        .manage(db)
        .mount("/", routes![index, browse, get_all_restaurants, get_filtered_restaurants])
        .mount("/static", FileServer::from("static/"))
        .attach(Template::fairing())
}
