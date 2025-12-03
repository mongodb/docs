use mongodb::{
    bson::{doc, Document},
    options::{
        DeleteManyModel, DeleteOneModel, InsertOneModel, ReplaceOneModel, UpdateManyModel,
        UpdateOneModel, WriteModel,
    },
    Client, Collection,
};

// begin-mushroom-struct
#[derive(Serialize)]
struct Mushroom {
    name: String,
    color: String,
    edible: bool,
}
// end-mushroom-struct

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    let mushrooms: Collection<Document> = client.database("db").collection("mushrooms");

    mushrooms.drop().await?;

    // begin-sample-data
    let docs = vec![
        doc! {"name" : "portobello", "color" : "brown", "edible" : true },
        doc! {"name" : "chanterelle", "color" : "yellow", "edible" : true },
        doc! {"name" : "oyster", "color" : "white", "edible" : true },
        doc! {"name" : "fly agaric", "color" : "red", "edible" : false },
    ];
    // end-sample-data

    let _insert_many_result = mushrooms.insert_many(docs).await?;

    // begin-insert
    let mushrooms: Collection<Document> = client.database("db").collection("mushrooms");

    let models = vec![
        InsertOneModel::builder()
            .namespace(mushrooms.namespace())
            .document(doc! {
                "name": "lion's mane",
                "color": "white",
                "edible": true
            })
            .build(),
        InsertOneModel::builder()
            .namespace(mushrooms.namespace())
            .document(doc! {
                "name": "angel wing",
                "color": "white",
                "edible": false
            })
            .build(),
    ];

    let result = client.bulk_write(models).await?;
    println!("Inserted documents: {}", result.inserted_count);
    // end-insert

    // begin-insert-structs
    let mushrooms: Collection<Mushroom> = client.database("db").collection("mushrooms");
    
    let lions_mane = Mushroom {
        name: "lion's mane".to_string(),
        color: "white".to_string(),
        edible: true,
    };

    let angel_wing = Mushroom {
        name: "angel wing".to_string(),
        color: "white".to_string(),
        edible: false,
    };

    let lions_mane_model = mushrooms.insert_one_model(lions_mane)?;
    let angel_wing_model = mushrooms.insert_one_model(angel_wing)?;
    
    let result = client.bulk_write([lions_mane_model, angel_wing_model]).await?;
    println!("Inserted documents: {}", result.inserted_count);
    // end-insert-structs

    // begin-replace
    let mushrooms: Collection<Document> = client.database("db").collection("mushrooms");

    let models = vec![
        ReplaceOneModel::builder()
            .namespace(mushrooms.namespace())
            .filter(doc! { "name": "portobello" })
            .replacement(doc! {
                "name": "cremini",
                "color": "brown",
                "edible": true
            })
            .build(),
        ReplaceOneModel::builder()
            .namespace(mushrooms.namespace())
            .filter(doc! { "name": "oyster" })
            .replacement(doc! {
                "name": "golden oyster",
                "color": "yellow",
                "edible": true
            })
            .upsert(true)
            .build(),
    ];

    let result = client.bulk_write(models).await?;
    println!("Modified documents: {}", result.modified_count);
    // end-replace

    // begin-update
    let mushrooms: Collection<Document> = client.database("db").collection("mushrooms");

    let models = vec![
        WriteModel::UpdateOne(
            UpdateOneModel::builder()
                .namespace(mushrooms.namespace())
                .filter(doc! { "name": "fly agaric" })
                .update(doc! { "$set": { "name": "fly amanita" } })
                .upsert(true)
                .build(),
        ),
        WriteModel::UpdateMany(
            UpdateManyModel::builder()
                .namespace(mushrooms.namespace())
                .filter(doc! { "color": "yellow" })
                .update(doc! { "$set": { "color": "yellow/orange" } })
                .build(),
        ),
    ];

    let result = client.bulk_write(models).await?;
    println!("Modified documents: {}", result.modified_count);
    // end-update

    // begin-delete
    let mushrooms: Collection<Document> = client.database("db").collection("mushrooms");

    let models = vec![
        WriteModel::DeleteOne(
            DeleteOneModel::builder()
                .namespace(mushrooms.namespace())
                .filter(doc! { "color": "red" })
                .build(),
        ),
        WriteModel::DeleteMany(
            DeleteManyModel::builder()
                .namespace(mushrooms.namespace())
                .filter(doc! { "edible": true })
                .build(),
        ),
    ];

    let result = client.bulk_write(models).await?;
    println!("Deleted documents: {}", result.deleted_count);
    // end-delete

    // begin-verbose
    let models = vec![
        WriteModel::DeleteOne(
            DeleteOneModel::builder()
                .namespace(mushrooms.namespace())
                .filter(doc! { "name": "oyster" })
                .build(),
        ),
        WriteModel::UpdateOne(
            UpdateOneModel::builder()
                .namespace(mushrooms.namespace())
                .filter(doc! { "name": "chanterelle" })
                .update(doc! { "$set": { "season": ["July", "August", "September"] } })
                .build(),
        ),
    ];

    let result = client.bulk_write(models).verbose_results().await?;
    println!(
        "Update results: {:?}\nDelete results: {:?}\n",
        result.update_results, result.delete_results
    );
    // end-verbose

    // begin-options
    let mushrooms: Collection<Document> = client.database("db").collection("mushrooms");

    let models = vec![
        WriteModel::UpdateOne(UpdateOneModel::builder()
            .namespace(mushrooms.namespace())
            .filter(doc! { "name": "portobello" })
            .update(doc! { "$set": { "_id": 123 } })
            .upsert(true)
            .build()),
        WriteModel::InsertOne(InsertOneModel::builder()
            .namespace(mushrooms.namespace())
            .document(doc! {
                "name": "reishi",
                "color": "red/brown",
                "edible": true
            })
            .build()),
    ];

    let result = client.bulk_write(models).ordered(false).await?;
    println!(
        "Inserted documents: {}\nDeleted documents: {}",
        result.inserted_count, result.deleted_count
    );
    // end-options

    // begin-mixed-namespaces
    let sweet: Collection<Document> = client
        .database("ingredients")
        .collection("sweet");
    let dessert: Collection<Document> = client
        .database("meals")
        .collection("dessert");

    let models = vec![
        InsertOneModel::builder()
            .namespace(sweet.namespace())
            .document(doc! { "name": "brown sugar", "price": 3.99 })
            .build(),
        InsertOneModel::builder()
            .namespace(dessert.namespace())
            .document(doc! { "name": "banana bread", "cook_time": 75 })
            .build(),
    ];

    let result = client.bulk_write(models).await?;
    println!("Inserted documents: {}", result.inserted_count);
    // end-mixed-namespaces

    Ok(())
}
