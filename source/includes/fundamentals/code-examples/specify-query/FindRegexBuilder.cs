var filter = Builders<Guitar>.Filter.Regex(g => g.Make, "^G");
var result = _guitarsCollection.Find(filter).ToList();

foreach (var doc in result)
{
    WriteLine(doc.ToBsonDocument());
}