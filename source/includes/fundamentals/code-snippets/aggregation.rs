use bson::{ doc, DateTime, Document };
use mongodb::{ Client, Collection };
use serde::{ Deserialize, Serialize };
use futures::stream::TryStreamExt;

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri: &str = "<connection string>";

    let client = Client::with_uri_str(uri).await?;

    // begin-insert
    let my_coll: Collection<Document> = client.database("db").collection("site_users");

    let docs = vec![
        doc! { "name": "Sonya Mehta", "age": 23, "genre_interests": vec!["fiction", "mystery", "memoir"], "last_active": DateTime::builder().year(2023).month(5).day(13).build().unwrap() },
        doc! { "name": "Selena Sun", "age": 45, "genre_interests": vec!["fiction", "literary", "theory"], "last_active": DateTime::builder().year(2023).month(5).day(25).build().unwrap() },
        doc! { "name": "Carter Johnson", "age": 56, "genre_interests": vec!["literary", "self help"], "last_active": DateTime::builder().year(2023).month(5).day(31).build().unwrap() },
        doc! { "name": "Rick Cortes", "age": 18, "genre_interests": vec!["sci-fi", "fantasy", "memoir"], "last_active": DateTime::builder().year(2023).month(7).day(1).build().unwrap() },
        doc! { "name": "Belinda James", "age": 76, "genre_interests": vec!["literary", "nonfiction"], "last_active": DateTime::builder().year(2023).month(6).day(11).build().unwrap() },
        doc! { "name": "Corey Saltz", "age": 29, "genre_interests": vec!["fiction", "sports", "memoir"], "last_active": DateTime::builder().year(2023).month(1).day(23).build().unwrap() },
        doc! { "name": "John Soo", "age": 16, "genre_interests": vec!["fiction", "sports"], "last_active": DateTime::builder().year(2023).month(1).day(3).build().unwrap() },
        doc! { "name": "Lisa Ray", "age": 39, "genre_interests": vec!["poetry", "art", "memoir"], "last_active": DateTime::builder().year(2023).month(5).day(30).build().unwrap() },
        doc! { "name": "Kiran Murray", "age": 20, "genre_interests": vec!["mystery", "fantasy", "memoir"], "last_active": DateTime::builder().year(2023).month(1).day(30).build().unwrap() },
        doc! { "name": "Beth Carson", "age": 31, "genre_interests": vec!["mystery", "nonfiction"], "last_active": DateTime::builder().year(2023).month(8).day(4).build().unwrap() },
        doc! { "name": "Thalia Dorn", "age": 21, "genre_interests": vec!["theory", "literary", "fiction"], "last_active": DateTime::builder().year(2023).month(8).day(19).build().unwrap() },
        doc! { "name": "Arthur Ray", "age": 66, "genre_interests": vec!["sci-fi", "fantasy", "fiction"], "last_active": DateTime::builder().year(2023).month(11).day(27).build().unwrap() }
    ];

    my_coll.insert_many(docs).await?;
    // end-insert

    // begin-age-agg
    let age_pipeline = vec![
        doc! { "$unwind": doc! { "path": "$genre_interests" } },
        doc! { "$group": doc! {
            "_id": "$genre_interests",
            "avg_age": doc! { "$avg": "$age" },
            "min_age": doc! { "$min": "$age" },
            "max_age": doc! { "$max": "$age" }
        } }
    ];

    let mut results = my_coll.aggregate(age_pipeline).await?;
    while let Some(result) = results.try_next().await? {
        println!("* {:?}", result);
    }
    // end-age-agg

    // begin-lastactive-agg
    let last_active_pipeline = vec![
        doc! { "$project": { "month_last_active" : doc! { "$month" : "$last_active" } } },
        doc! { "$group": doc! { "_id" : doc! {"month_last_active": "$month_last_active"} ,
        "number" : doc! { "$sum" : 1 } } },
        doc! { "$sort": { "_id.month_last_active" : 1 } }
    ];

    let mut results = my_coll.aggregate(last_active_pipeline).await?;
    while let Some(result) = results.try_next().await? {
        println!("* {:?}", result);
    }
    // end-lastactive-agg

    // begin-popular-agg
    let popularity_pipeline = vec![
        doc! { "$unwind" : "$genre_interests" },
        doc! { "$group" : doc! { "_id" : "$genre_interests" , "number" : doc! { "$sum" : 1 } } },
        doc! { "$sort" : doc! { "number" : -1 } },
        doc! { "$limit": 3 }
    ];

    let mut results = my_coll.aggregate(popularity_pipeline).await?;
    while let Some(result) = results.try_next().await? {
        println!("* {:?}", result);
    }
    // end-popular-agg

    Ok(())
}

