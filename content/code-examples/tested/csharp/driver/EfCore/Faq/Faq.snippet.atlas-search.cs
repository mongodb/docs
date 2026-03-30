public static void AtlasSearch()
{
    // Client used to set up your DbContext
    var client = new MongoClient("<connection string>");

    var clientDB = client.GetDatabase("sample_guides");
    var collection = clientDB.GetCollection<Planet>("planets");

    var searchResult = collection.Aggregate()
        .Search(Builders<Planet>.Search.Equals(p => p.hasRings, true))
        .ToList();

    foreach (var p in searchResult)
    {
        Console.WriteLine(p.name);
    }
}
