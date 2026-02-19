// Creates a filter for all documents with a "make" value of "Fender"
var filter = Builders<Guitar>.Filter.Eq(g => g.Make, "Fender");

// Finds all documents that match the filter
var result = _guitarsCollection.Find(filter).ToList();

foreach (var doc in result)
{
    // Prints the documents in bson (json) format
    Console.WriteLine(doc.ToBsonDocument());
}