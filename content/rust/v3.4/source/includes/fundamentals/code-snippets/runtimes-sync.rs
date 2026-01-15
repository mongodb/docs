use mongodb::sync::Client;

fn main() {
    let client = Client::with_uri_str("<connection string>")?;
    let some_data = doc! { "title": "1984", "author": "George Orwell" };

    for i in 0..5 {
        let client_ref = client.clone();
        let somedata_ref = some_data.clone();

        let collection = client_ref
            .database("items")
            .collection::<Document>(&format!("coll{}", i));

        collection.insert_one(somedata_ref);
    }
}
