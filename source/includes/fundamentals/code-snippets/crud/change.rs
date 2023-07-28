use bson::Document;
use mongodb::{ bson::doc, Client, Collection, options::UpdateOptions };
use std::env;

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    let my_coll: Collection<Document> = client.database("db").collection("employees");

    // begin-update
    let update_doc =
        doc! {
            "$set": doc!{ "department": "Business Operations",
                          "role": "Analytics Specialist" },
            "$inc": doc!{ "bonus": 500 }
    };

    let res = my_coll.update_many(doc! { "department": "Marketing" }, update_doc, None).await?;
    println!("Modified {} document(s)", res.modified_count);
    // end-update

    // begin-replace
    let replace_doc =
        doc! {
        "name": "Susan Lee",
        "role": "Lead Consultant",
        "team_members": vec! [ "Jill Gillison" ]
    };

    let res = my_coll.replace_one(doc! { "_id": 4501 }, replace_doc, None).await?;
    println!(
        "Matched {} document(s)\nModified {} document(s)",
        res.matched_count,
        res.modified_count
    );
    // end-replace

    let filter_doc = doc! {};

    // begin-options
    let opts: UpdateOptions = UpdateOptions::builder().upsert(true).build();
    let _res = my_coll.update_one(filter_doc, update_doc, opts).await?;
    // end-options

    Ok(())
}
