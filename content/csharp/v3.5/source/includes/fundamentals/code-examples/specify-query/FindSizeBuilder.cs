// Creates a filter for all documents with 3 elements in the "models" field
var filter = Builders<Guitar>.Filter.Size(g => g.Models, 3);

// Finds all documents that match the filter
var result = guitarCollection.Find(filter).ToList();

foreach (var doc in result)
{
    // Prints the documents in bson (json) format
    Console.WriteLine(doc.ToBsonDocument());
}