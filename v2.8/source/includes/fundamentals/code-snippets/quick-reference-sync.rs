use std::env;
use mongodb::{
    bson::{doc, Document},
    error::Result,
    sync::{Client, Collection},
    options::FindOptions,
    IndexModel
};

fn main() -> Result<()> {
    let uri = "<connection string>";

    let client = Client::with_uri_str(uri)?;

    let collection: Collection<Document> = client.database("sample_mflix").collection("movies");

    // start-find-one
    let result = collection.find_one(
        doc! { "title": "Peter Pan" },
        None
    )?;
    //end-find-one

    // start-find-multiple
    let filter = doc! { "year": 1925 };
    let mut cursor = collection.find(filter, None)?;
    // end-find-multiple

    // start-insert-one
    let doc = doc! { 
        "title": "Mistress America", "type": "movie" 
    };

    let result = collection.insert_one(doc, None)?;
    // end-insert-one    

    // start-insert-many
    let docs = vec![
        doc! { "title": "Friends With Money", "runtime": 88 },
        doc! { "title": "Please Give", "runtime": 90 },
        doc! { "title": "You Hurt My Feelings", "runtime": 93 },
    ];

    let result = collection.insert_many(docs, None)?;
    // end-insert-many

    // start-update-one
    let filter = doc! { "title": "Burn After Reading"};
    let update =
        doc! {
            "$set": doc!{ "num_mflix_comments": 1 }
    };

    let result = collection.update_one(
          filter, update, None
    )?;
    // end-update-one
    
    // start-update-many
    let filter = doc! { "rated": "PASSED"};
    let update =
        doc! {
            "$set": doc!{ "rated": "Not Rated" }
    };

    let result = collection.update_many(
          filter, update, None
    )?;
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
    )?;
    // end-replace

    // start-delete-one
    let filter = doc! { "title": "Search and Destroy" };
    let result = collection.delete_one(filter, None)?;
    // end-delete-one

    // start-delete-many
    let filter = doc! { 
        "year": doc! { "$lt": 1920 } 
    };

    let result = collection.delete_many(filter, None)?;
    // end-delete-many

    // start-cursor-iterative
    let cursor = collection.find(
        doc! { "$and": vec!
            [
                doc! { "metacritic": doc! { "$gt": 90 } },
                doc! { "directors": vec! [ "Martin Scorsese" ] }
            ] },
        None
    )?;

    for result in cursor {
      println!("{}", result?);
    }
    // end-cursor-iterative

    // start-cursor-array
    let cursor = collection.find(
        doc! { "title": "Secrets & Lies" }, None
    )?;

    let results: Vec<Result<Document>> = cursor.collect();
    // end-cursor-array

    //start-count
    let filter = doc! {
        "languages": vec! [ "Mandarin" ]
    };

    let result = collection.count_documents(filter, None)?;
    // end-count

    // start-distinct
    let field_name = "title";
    let filter = doc! {
        "directors": vec! [ "Sean Baker" ]
    };

    let results = collection.distinct(
          field_name, filter, None
    )?;
    // end-distinct

    // start-limit
    let opts: FindOptions = FindOptions::builder()
        .limit(5)
        .build();

    let filter = doc! { "awards.wins": 25};
    let mut cursor = collection.find(filter, opts)?;
    // end-limit

    // start-skip
    let opts: FindOptions = FindOptions::builder()
        .skip(1)
        .build();

    let filter = doc! { "runtime": 100 };
    let mut cursor = collection.find(filter, opts)?;
    // end-skip

    // start-sort
    let opts: FindOptions = FindOptions::builder()
        .sort(doc! { "imdb.rating": 1 })
        .build();

    let filter = doc! {
        "directors": vec! [ "Nicole Holofcener" ]
    };

    let mut cursor = collection.find(filter, opts)?;
    // end-sort

    // start-project
    let opts: FindOptions = FindOptions::builder()
        .projection(doc! { "title": 1, "metacritic": 1, "_id": 0 })
        .build();

    let filter = doc! { "year": 2015 };
    let mut cursor = collection.find(filter, opts)?;
    // end-project

    // start-index
    let index: IndexModel = IndexModel::builder()
        .keys(doc! { "title": 1 })
        .build();

    let result = collection.create_index(index, None)?;
    // end-index

    Ok(())
}
