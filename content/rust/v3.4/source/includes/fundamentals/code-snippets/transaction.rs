use std::env;
use bson::{ Document, doc };
use futures::FutureExt;
use mongodb::{ Client, ClientSession };
use mongodb::error::Error;

// begin-callback
async fn insert_media(session: &mut ClientSession) -> Result<(), Error> {
    let books_coll = session
        .client()
        .database("db")
        .collection::<Document>("books");

    let films_coll = session
        .client()
        .database("db")
        .collection::<Document>("films");

    books_coll
        .insert_one(doc! {
            "name": "Sula",
            "author": "Toni Morrison"
        })
        .session(&mut *session)
        .await?;

    films_coll
        .insert_one(doc! {
            "name": "Nostalgia",
            "year": 1983
        })
        .session(&mut *session)
        .await?;

    Ok(())
}
// end-callback

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    // begin-session
    let mut session = client.start_session().await?;

    session
        .start_transaction()
        .and_run((), |session, _| insert_media(session).boxed())
        .await?;
    println!("Successfully committed transaction!");
    // end-session

    Ok(())
}
