var results = _guitarsCollection.Find(g => g.Make == "Fender").ToList();

foreach (var doc in results)
{
    Console.WriteLine(doc.ToBsonDocument());
}