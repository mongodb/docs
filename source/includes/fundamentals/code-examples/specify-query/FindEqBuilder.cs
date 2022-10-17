var filter = Builders<Guitar>.Filter.Eq(g => g.Make, "Fender");
var result = _guitarsCollection.Find(filter).ToList();

foreach (var doc in result)
{
    WriteLine(doc.ToBsonDocument());
}