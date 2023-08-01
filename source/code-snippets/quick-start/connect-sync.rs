use mongodb::{ bson::doc, sync::{Client} };
use bson:: Document;

fn main() -> mongodb::error::Result<()> {
   // Replace the placeholder with your Atlas connection string
   let uri = "<connection string>";
   
   // Create a new client and connect to the server
   let client = Client::with_uri_str(uri);

   // Get a handle on the "movies" collection in the "sample_mflix" database
   let database = client?.database("sample_mflix");
   let my_coll = database.collection::<Document>("movies");

   // Find the movie "The Perils of Pauline" in the "movies" collection
   let my_movie = my_coll.find_one(doc! { "title": "The Perils of Pauline" }, None)?;

   // Print the document that contains the movie found
   println!("{}", serde_json::to_string_pretty(&my_movie).unwrap());
   Ok(())
}
 

