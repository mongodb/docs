var results = _guitarsCollection.Find(g => g.EstablishedYear > 1985).ToList();

foreach (var doc in results)
{
    WriteLine(doc.ToBsonDocument());
}