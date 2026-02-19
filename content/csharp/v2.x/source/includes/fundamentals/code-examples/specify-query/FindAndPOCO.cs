// Finds all documents with an "establishedYear" value greater than 1985
// and a "make" value that is not equal to "Kiesel"
var results = _guitarsCollection.Find(g => g.EstablishedYear >= 1985 && r.Make != "Kiesel").ToList();

foreach (var doc in results)
{
    // Prints the documents in bson (json) format
    Console.WriteLine(doc.ToBsonDocument());
}