use rocket_db_pools::{mongodb::Client, Database};

#[derive(Database)]
#[database("db")]
pub struct MainDatabase(Client);
