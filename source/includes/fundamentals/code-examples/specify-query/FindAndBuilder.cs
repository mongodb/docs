var builder = Builders<Guitar>.Filter;
var filter = builder.And(builder.Gte(g => g.EstablishedYear, 1985), builder.Ne(r => r.Make, "Kiesel"));
var result = _guitarsCollection.Find(filter).ToList();

foreach (var doc in result)
{
    WriteLine(doc.ToBsonDocument());
}