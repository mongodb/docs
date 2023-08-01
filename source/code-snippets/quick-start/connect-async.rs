use mongodb::{ bson::doc, Client, Collection };
use bson:: Document;

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
   // Replace the placeholder with your Atlas connection string
   let uri = "<connection string>";
   
   // Create a new client and connect to the server
   let client = Client::with_uri_str(uri).await?;

   // Get a handle on the "movies" collection in the "sample_mflix" database
   let my_coll: Collection<Document> = client.database("sample_mflix").collection("movies");

   // Find the movie "The Perils of Pauline" in the "movies" collection
   let my_movie = my_coll.find_one(doc! { "title": "The Perils of Pauline" }, None).await?;

   // Print the document that contains the movie found
   println!("{}", serde_json::to_string_pretty(&my_movie).unwrap());
   Ok(())
}