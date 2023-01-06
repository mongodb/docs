var filter = Builders<Guitar>.Filter.Size(g => g.Models, 3);
var result = _guitarsCollection.Find(filter).ToList();

foreach (var doc in result)
{
    Console.WriteLine(doc.ToBsonDocument());
}