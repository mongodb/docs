// Finds all documents with am "establishedYear" value greater than 1985
var results = _guitarsCollection.Find(g => g.EstablishedYear > 1985).ToList();

foreach (var doc in results)
{
    // Prints the documents in bson (json) format
    Console.WriteLine(doc.ToBsonDocument());
}