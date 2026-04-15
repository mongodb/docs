mod db;
mod models;
mod routes;

use rocket::{launch, routes};
use rocket_db_pools::Database;

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(db::MainDatabase::init())
        // start-mount
        .mount(
        "/",
        routes![
            routes::index,
            routes::get_recipes,
            routes::create_recipe,
            routes::get_recipe,
            routes::update_recipe,
            routes::delete_recipe,
        ],
    )
    // end-mount
}
