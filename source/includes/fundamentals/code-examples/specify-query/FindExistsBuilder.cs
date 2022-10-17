var filter = Builders<Guitar>.Filter.Exists(g => g.Rating);
var result = _guitarsCollection.Find(filter).ToList();

foreach (var doc in result)
{
    WriteLine(doc.ToBsonDocument());
}