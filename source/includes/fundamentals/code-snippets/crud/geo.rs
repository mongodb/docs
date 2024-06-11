use mongodb::{
    bson::{ Document, doc },
    Client,
    Collection,
    IndexModel,
};
use futures::TryStreamExt;
use std::env;

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";
    let client = Client::with_uri_str(uri).await?;

    let my_coll: Collection<Document> = client.database("sample_mflix").collection("theaters");
    
    // start-point
    let point = doc! {"name": "MongoDB HQ", "location": doc! {
            "type": "Point",
            "coordinates": vec! [-73.986805, 40.7620853],
        }
    };
    // end-point 

    // start-linestring
    let line = doc! {"name": "Great Wall of China", "location": doc! {
            "type": "LineString",
            "coordinates": vec! [
                vec! [116.572, 40.430],
                vec! [116.570, 40.434],
                vec! [116.567, 40.436],
                vec! [116.566, 40.441]
            ],
        }
    };
    // end-linestring

    // start-polygon
    let polygon = doc! {"name": "Vatican City", "location": doc! {
        "type": "Polygon",
        "coordinates": vec![
            vec! [
                vec! [12.458, 41.906],
                vec! [12.458, 41.901],
                vec! [12.450, 41.901],
                vec! [12.450, 41.906],
                vec! [12.458, 41.906],
                ]
            ],
        }
    };
    // end-polygon

    // start-2dsphere
    let index = IndexModel::builder()
        .keys(doc! { "location.geo": "2dsphere" })
        .build();

    let idx = my_coll.create_index(index).await?;
    println!("Created index:\n{}", idx.index_name);
    // end-2dsphere

    // start-2d
    let index = IndexModel::builder()
        .keys(doc! { "location.geo.coordinates": "2d" })
        .build();

    let idx = my_coll.create_index(index).await?;
    println!("Created index:\n{}", idx.index_name);
    // end-2d

    // start-proximity
    let mongodb = vec! [-73.986805, 40.7620853];
    let query = doc! {"location.geo": 
        doc! { "$near": {
            "$geometry": {
                "type": "Point", "coordinates": mongodb,
                },
            "$maxDistance": 1000,
            }
        }
    };

    let mut cursor = my_coll.find(query).await?;
    while let Some(doc) = cursor.try_next().await? {
        println!("{}", doc);
    }
    // end-proximity

    // start-range
    let chicago = doc! {
        "type": "Polygon",
        "coordinates": vec![
            vec![
                vec![-87.851, 41.976],
                vec![-87.851, 41.653],
                vec![-87.651, 41.653],
                vec![-87.651, 41.976],
                vec![-87.851, 41.976],
            ]
        ]
    };

    let query = doc! {"location.geo":
        doc! { "$geoWithin": { "$geometry": chicago }}
    };

    let mut cursor = my_coll.find(query).await?;
    while let Some(doc) = cursor.try_next().await? {
        println!("{}", doc);
    }
    
    // end-range

    Ok(())
}