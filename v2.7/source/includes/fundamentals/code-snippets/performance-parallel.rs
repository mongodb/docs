let client = Client::with_uri_str("<connection string>").await?;
let data = doc! { "title": "1984", "author": "George Orwell" };

for i in 0..5 {
    let client_ref = client.clone();
    let data_ref = data.clone();

    task::spawn(async move {
        let collection = client_ref
            .database("items")
            .collection::<Document>(&format!("coll{}", i));

        collection.insert_one(data_ref, None).await
    });
}
