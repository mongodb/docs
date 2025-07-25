use futures::TryStreamExt;
use mongodb::{
    options::{ TimeseriesOptions, TimeseriesGranularity, CreateCollectionOptions },
    Client,
};
use std::env;

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    // begin-create-ts
    let db = client.database("precipitation");

    let ts_opts = TimeseriesOptions::builder()
        .time_field("precipitation_mm".to_string())
        .meta_field(Some("location".to_string()))
        .granularity(Some(TimeseriesGranularity::Minutes))
        .build();

    let coll_opts = CreateCollectionOptions::builder()
        .timeseries(ts_opts)
        .build();
    
    db.create_collection("sept2023", coll_opts).await?;
    // end-create-ts

    // begin-list-colls
    let mut coll_list = db.list_collections(None, None).await?;
    while let Some(c) = coll_list.try_next().await? {
        println!("{:#?}", c);
    }
    // end-list-colls

    Ok(())
}
