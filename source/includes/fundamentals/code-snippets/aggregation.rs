use chrono::{ Utc };
use mongodb::{ Client, Collection };
use serde::{ Deserialize, Serialize };

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri: &str = "<connection string>";

    let client: Client = Client::with_uri_str(uri).await?;

    // begin-insert
    let my_coll: Collection<Document> = client.database("db").collection("site_users");

    let docs = vec![
        doc! { "name": "Sonya Mehta", "age": 23, "genre_interests": vec!["fiction", "mystery", "memoir"], "last_active": Utc.with_ymd_and_hms(2019, 5, 13, 0, 0, 0).unwrap() },
        doc! { "name": "Selena Sun", "age": 45, "genre_interests": vec!["fiction", "literary", "theory"], "last_active": Utc.with_ymd_and_hms(2019, 5, 25, 0, 0, 0).unwrap() },
        doc! { "name": "Carter Johnson", "age": 56, "genre_interests": vec!["literary", "self help"], "last_active": Utc.with_ymd_and_hms(2019, 5, 31, 0, 0, 0).unwrap() },
        doc! { "name": "Rick Cortes", "age": 18, "genre_interests": vec!["sci-fi", "fantasy", "memoir"], "last_active": Utc.with_ymd_and_hms(2019, 7, 1, 0, 0, 0).unwrap() },
        doc! { "name": "Belinda James", "age": 76, "genre_interests": vec!["literary", "nonfiction"], "last_active": Utc.with_ymd_and_hms(2019, 6, 11, 0, 0, 0).unwrap() },
        doc! { "name": "Corey Saltz", "age": 29, "genre_interests": vec!["fiction", "sports", "memoir"], "last_active": Utc.with_ymd_and_hms(2019, 1, 23, 0, 0, 0).unwrap() },
        doc! { "name": "John Soo", "age": 16, "genre_interests": vec!["fiction", "sports"], "last_active": Utc.with_ymd_and_hms(2019, 1, 3, 0, 0, 0).unwrap() },
        doc! { "name": "Lisa Ray", "age": 39, "genre_interests": vec!["poetry", "art", "memoir"], "last_active": Utc.with_ymd_and_hms(2019, 5, 30, 0, 0, 0).unwrap() },
        doc! { "name": "Kiran Murray", "age": 20, "genre_interests": vec!["mystery", "fantasy", "memoir"], "last_active": Utc.with_ymd_and_hms(2019, 1, 30, 0, 0, 0).unwrap() },
        doc! { "name": "Beth Carson", "age": 31, "genre_interests": vec!["mystery", "nonfiction"], "last_active": Utc.with_ymd_and_hms(2019, 8, 4, 0, 0, 0).unwrap() },
        doc! { "name": "Thalia Dorn", "age": 21, "genre_interests": vec!["theory", "literary", "fiction"], "last_active": Utc.with_ymd_and_hms(2019, 8, 19, 0, 0, 0).unwrap() },
        doc! { "name": "Arthur Ray", "age": 66, "genre_interests": vec!["sci-fi", "fantasy", "fiction"], "last_active": Utc.with_ymd_and_hms(2019, 11, 27, 0, 0, 0).unwrap() }
    ];

    my_coll.insert_many(docs, None).await?;
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

    let mut results = my_coll.aggregate(age_pipeline, None).await?;
    while let Some(result) = results.try_next().await? {
        let doc = bson::from_document(result)?;
        println!("* {}", doc);
    }
    // end-age-agg

    // begin-lastactive-agg
    let last_active_pipeline = vec![
        doc! { "$project": { "month_last_active" : doc! { "$month" : "$last_active" } } },
        doc! { "$group": doc! { "_id" : doc! {"month_last_active": "$month_last_active"} , 
                                "number" : doc! { "$sum" : 1 } } },
        doc! { "$sort": { "_id.month_last_active" : 1 } }
    ];

    let mut results = my_coll.aggregate(last_active_pipeline, None).await?;
    while let Some(result) = results.try_next().await? {
        let doc = bson::from_document(result)?;
        println!("* {}", doc);
    }
    // end-lastactive-agg

    // begin-popular-agg
    let popularity_pipeline = vec![
        doc! { "$unwind" : "$genre_interests" },
        doc! { "$group" : doc! { "_id" : "$genre_interests" , "number" : doc! { "$sum" : 1 } } },
        doc! { "$sort" : doc! { "number" : -1 } },
        doc! { "$limit": 3 }
    ];

    let mut results = my_coll.aggregate(popularity_pipeline, None).await?;
    while let Some(result) = results.try_next().await? {
        let doc = bson::from_document(result)?;
        println!("* {}", doc);
    }
    // end-popular-agg

    Ok(())
}
