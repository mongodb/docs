use mongodb::{ 
	bson::{Document, doc},
	sync::{Client, Collection} 
};

fn main() -> mongodb::error::Result<()> {
    // Replace the placeholder with your Atlas connection string
    let uri = "<connection string>";

    // Create a new client and connect to the server
    let client = Client::with_uri_str(uri)?;

    // Get a handle on the movies collection
    let database = client.database("sample_mflix");
    let my_coll: Collection<Document> = database.collection("movies");

    // Find a movie based on the title value
    let my_movie = my_coll.find_one(doc! { "title": "The Perils of Pauline" }, None)?;

    // Print the document
    println!("Found a movie:\n{:#?}", my_movie);
    Ok(())
}
