// Creates a filter for all documents with an "establishedYear" value greater
// than 1985
var filter = Builders<Guitar>.Filter.Gt(g => g.EstablishedYear, 1985);

// Finds all documents that match the filter
var result = guitarCollection.Find(filter).ToList();

foreach (var doc in result)
{
    // Prints the documents in bson (json) format
    Console.WriteLine(doc.ToBsonDocument());
}