// Creates a filter for all documents with a populated "ratings" field
var filter = Builders<Guitar>.Filter.Exists(g => g.Rating);

// Finds all documents that match the filter
var result = guitarCollection.Find(filter).ToList();

foreach (var doc in result)
{
    // Prints the documents in bson (json) format
    Console.WriteLine(doc.ToBsonDocument());
}