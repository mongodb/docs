use crate::db::MainDatabase;
use crate::models::Recipe;
use mongodb::bson::doc;
use mongodb::bson::oid::ObjectId;
use rocket::{
    delete, futures::TryStreamExt, get, http::Status, post, put, response::status,
    serde::json::Json,
};
use rocket_db_pools::Connection;
use serde_json::{json, Value};

// start-index-route
#[get("/")]
pub fn index() -> Json<Value> {
    Json(json!({"status": "It is time to make some bread!!!"}))
}
// end-index-route

// start-get-recipes
#[get("/recipes", format = "json")]
pub async fn get_recipes(db: Connection<MainDatabase>) -> Json<Vec<Recipe>> {
    let recipes = db
        .database("bread")
        .collection("recipes")
        .find(None, None)
        .await;

    if let Ok(r) = recipes {
        if let Ok(collected) = r.try_collect::<Vec<Recipe>>().await {
            return Json(collected);
        }
    }

    return Json(vec![]);
}
// end-get-recipes

// start-get-recipe
#[get("/recipes/<id>", format = "json")]
pub async fn get_recipe(
    db: Connection<MainDatabase>,
    id: &str,
) -> status::Custom<Json<Value>> {
    let b_id = ObjectId::parse_str(id);

    if b_id.is_err() {
        return status::Custom(
            Status::BadRequest,
            Json(json!({"status": "error", "message":"Recipe ID is invalid"})),
        );
    }

    if let Ok(Some(recipe)) = db
        .database("bread")
        .collection::<Recipe>("recipes")
        .find_one(doc! {"_id": b_id.unwrap()}, None)
        .await
    {
        return status::Custom(
            Status::Ok,
            Json(json!({"status": "success", "data": recipe})),
        );
    }

    return status::Custom(
        Status::NotFound,
        Json(json!({"status": "success", "message": "Recipe not found"})),
    );
}
// end-get-recipe

// start-update-recipe
#[put("/recipes/<id>", data = "<data>", format = "json")]
pub async fn update_recipe(
    db: Connection<MainDatabase>,
    data: Json<Recipe>,
    id: &str,
) -> status::Custom<Json<Value>> {
    let b_id = ObjectId::parse_str(id);

    if b_id.is_err() {
        return status::Custom(
            Status::BadRequest,
            Json(json!({"status": "error", "message":"Recipe ID is invalid"})),
        );
    }

    if let Ok(_) = db
        .database("bread")
        .collection::<Recipe>("recipes")
        .update_one(
            doc! {"_id": b_id.as_ref().unwrap()},
            doc! {"$set": mongodb::bson::to_document(&data.into_inner()).unwrap()},
            None,
        )
        .await
    {
        return status::Custom(
            Status::Created,
            Json(
                json!({"status": "success", "message": format!("Recipe ({}) updated successfully", b_id.unwrap())}),
            ),
        );
    };

    status::Custom(
        Status::BadRequest,
        Json(
            json!({"status": "success", "message": format!("Recipe ({}) could not be updated successfully", b_id.unwrap())}),
        ),
    )
}
// end-update-recipe

// start-delete-recipe
#[delete("/recipes/<id>")]
pub async fn delete_recipe(
    db: Connection<MainDatabase>,
    id: &str,
) -> status::Custom<Json<Value>> {
    let b_id = ObjectId::parse_str(id);

    if b_id.is_err() {
        return status::Custom(
            Status::BadRequest,
            Json(json!({"status": "error", "message":"Recipe ID is invalid"})),
        );
    }

    if db
        .database("bread")
        .collection::<Recipe>("recipes")
        .delete_one(doc! {"_id": b_id.as_ref().unwrap()}, None)
        .await
        .is_err()
    {
        return status::Custom(
            Status::BadRequest,
            Json(
                json!({"status": "error", "message":format!("Recipe ({}) could not be deleted", b_id.unwrap())}),
            ),
        );
    };

    status::Custom(
        Status::Accepted,
        Json(
            json!({"status": "", "message": format!("Recipe ({}) successfully deleted", b_id.unwrap())}),
        ),
    )
}
// end-delete-recipe

// start-create-recipe
#[post("/recipes", data = "<data>", format = "json")]
pub async fn create_recipe(
    db: Connection<MainDatabase>,
    data: Json<Recipe>,
) -> status::Custom<Json<Value>> {
    if let Ok(res) = db
        .database("bread")
        .collection::<Recipe>("recipes")
        .insert_one(data.into_inner(), None)
        .await
    {
        if let Some(id) = res.inserted_id.as_object_id() {
            return status::Custom(
                Status::Created,
                Json(
                    json!({"status": "success", "message": format!("Recipe ({}) created successfully", id.to_string())}),
                ),
            );
        }
    }

    status::Custom(
        Status::BadRequest,
        Json(json!({"status": "error", "message":"Recipe could not be created"})),
    )
}
// end-create-recipe
