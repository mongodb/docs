use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct RestaurantRow{
    pub name: Option<String>,
    pub borough: Option<String>,
    pub cuisine: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")] 
    pub id: Option<ObjectId>,
}
