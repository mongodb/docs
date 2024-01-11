// Finds all documents with a "make" value of "Fender"
var results = _guitarsCollection.Find(g => g.Make == "Fender").ToList();

foreach (var doc in results)
{
    // Prints the documents in bson (json) format
    Console.WriteLine(doc.ToBsonDocument());
}