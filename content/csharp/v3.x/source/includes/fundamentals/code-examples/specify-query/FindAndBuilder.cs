// Creates a filter for all documents with an "establishedYear" value greater
// than 1985 and a "make" value that does not equal "Kiesel"
var builder = Builders<Guitar>.Filter;
var filter = builder.And(builder.Gte(g => g.EstablishedYear, 1985), builder.Ne(r => r.Make, "Kiesel"));

// Finds all documents that match the filter
var result = guitarCollection.Find(filter).ToList();

foreach (var doc in result)
{
    // Prints the documents in bson (json) format
    Console.WriteLine(doc.ToBsonDocument());
}