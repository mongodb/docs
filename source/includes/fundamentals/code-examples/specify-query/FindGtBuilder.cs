var filter = Builders<Guitar>.Filter.Gt(g => g.EstablishedYear, 1985);
var result = _guitarsCollection.Find(filter).ToList();

foreach (var doc in result)
{
    WriteLine(doc.ToBsonDocument());
}