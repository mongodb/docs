use serde::{Deserialize, Serialize};
use mongodb::bson::oid::ObjectId;

#[derive(Debug, Serialize, Deserialize)]
pub struct Restaurant {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub name: Option<String>,
    pub borough: Option<String>,
    pub cuisine: Option<String>,
    pub address: Option<Address>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Address {
    pub building: Option<String>,
    pub street: Option<String>,
    pub zipcode: Option<String>,
}