use mongodb::{ 
    bson::{ Document, doc }, 
    sync::{ Client, Collection } 
};

fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri)?;

    let my_coll: Collection<Document> = client
        .database("sample_restaurants")
        .collection("restaurants");

    let filter =
        doc! { "$and": [
           doc! { "borough": "Manhattan" },
           doc! { "address.street": "Broadway" }
       ]
    };

    let result = my_coll.delete_many(filter, None)?;

    println!("Deleted documents: {}", result.deleted_count);

    Ok(())
}
