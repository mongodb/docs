use std::env;
use bson::Document;
use mongodb::{ 
    bson::doc, 
    Client, 
    Collection, 
    options::FindOptions,
    IndexModel
};
use futures::TryStreamExt;

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";

    let client = Client::with_uri_str(uri).await?;

    let collection: Collection<Document> = client.database("sample_mflix").collection("movies");

    // start-find-one
    let result = collection.find_one(
        doc! { "title": "Peter Pan" },
        None
    ).await?;
    //end-find-one

    // start-find-multiple
    let filter = doc! { "year": 1925 };
    let mut cursor = collection.find(filter, None).await?;
    // end-find-multiple

    // start-insert-one
    let doc = doc! { 
        "title": "Mistress America", "type": "movie" 
    };

    let result = collection.insert_one(doc, None).await?;
    // end-insert-one    

    // start-insert-many
    let docs = vec![
        doc! { "title": "Friends With Money", "runtime": 88 },
        doc! { "title": "Please Give", "runtime": 90 },
        doc! { "title": "You Hurt My Feelings", "runtime": 93 },
    ];

    let result = collection.insert_many(docs, None).await?;
    // end-insert-many

    // start-update-one
    let filter = doc! { "title": "Burn After Reading"};
    let update =
        doc! {
            "$set": doc!{ "num_mflix_comments": 1 }
    };

    let result = collection.update_one(
          filter, update, None
    ).await?;
    // end-update-one
    
    // start-update-many
    let filter = doc! { "rated": "PASSED"};
    let update =
        doc! {
            "$set": doc!{ "rated": "Not Rated" }
    };

    let result = collection.update_many(
          filter, update, None
    ).await?;
    // end-update-many

    // start-replace
    let filter = doc! { "title": "è Nous la Libertè" };
    let replacement =
        doc! {
        "title": "À nous la liberté",
        "type": "movie",
        "directors": vec! [ "René Clair" ]
    };

    let result = collection.replace_one(
          filter, replacement, None
    ).await?;
    // end-replace

    // start-delete-one
    let filter = doc! { "title": "Search and Destroy" };
    let result = collection.delete_one(filter, None).await?;
    // end-delete-one

    // start-delete-many
    let filter = doc! { 
        "year": doc! { "$lt": 1920 } 
    };

    let result = collection.delete_many(filter, None).await?;
    // end-delete-many

    // start-cursor-iterative
    let mut cursor = collection.find(
        doc! { "$and": vec!
            [
                doc! { "metacritic": doc! { "$gt": 90 } },
                doc! { "directors": vec! [ "Martin Scorsese" ] }
            ] },
        None
    ).await?;

    while let Some(result) = cursor.try_next().await? {
        println!("{}", result);
    };
    // end-cursor-iterative

    // start-cursor-array
    let cursor = collection.find(
        doc! { "title": "Secrets & Lies" }, None
    ).await?;

    let results: Vec<Document> = cursor.try_collect().await?;
    // end-cursor-array

    //start-count
    let filter = doc! {
        "languages": vec! [ "Mandarin" ]
    };

    let result = collection.count_documents(filter, None).await?;
    // end-count

    // start-distinct
    let field_name = "title";
    let filter = doc! {
        "directors": vec! [ "Sean Baker" ]
    };

    let results = collection.distinct(
          field_name, filter, None
    ).await?;
    // end-distinct

    // start-limit
    let opts: FindOptions = FindOptions::builder()
        .limit(5)
        .build();

    let filter = doc! { "awards.wins": 25};
    let mut cursor = collection.find(filter, opts).await?;
    // end-limit

    // start-skip
    let opts: FindOptions = FindOptions::builder()
        .skip(1)
        .build();

    let filter = doc! { "runtime": 100 };
    let mut cursor = collection.find(filter, opts).await?;
    // end-skip

    // start-sort
    let opts: FindOptions = FindOptions::builder()
        .sort(doc! { "imdb.rating": 1 })
        .build();

    let filter = doc! {
        "directors": vec! [ "Nicole Holofcener" ]
    };

    let mut cursor = collection.find(filter, opts).await?;
    // end-sort

    // start-project
    let opts: FindOptions = FindOptions::builder()
        .projection(doc! { "title": 1, "metacritic": 1, "_id": 0 })
        .build();

    let filter = doc! { "year": 2015 };
    let mut cursor = collection.find(filter, opts).await?;
    // end-project

    // start-index
    let index: IndexModel = IndexModel::builder()
        .keys(doc! { "title": 1 })
        .build();

    let result = collection.create_index(index, None).await?;
    // end-index

    Ok(())
}