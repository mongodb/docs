import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

const client = new MongoClient(uri);

async function run() {
  try {

    // Get the database and collection on which to run the operation
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    // Create an array of documents to insert
    const moviesToInsert = [
      { title: "Arsenic and Old Lace", genres: ["Comedy", "Romance"], year: 1944, cast: ["Cary Grant", "Priscilla Lane", "Raymond Massey"] },
      { title: "Ball of Fire", genres: ["Comedy", "Romance"], year: 1941, cast: ["Gary Cooper", "Barbara Stanwyck", "Oskar Homolka"] },
      { title: "I Married a Witch", genres: ["Comedy", "Fantasy", "Romance"], year: 1942, cast: ["Veronica Lake", "Fredric March", "Susan Hayward"] },
    ];

    // Prevent additional documents from being inserted if one fails
    const options = { ordered: true };

    // Execute insert operation
    const result = await movies.insertMany(moviesToInsert, options);
   
    // Print result
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
