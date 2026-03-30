var client = new MongoClient("<connection string URI>");
var db = PlanetDbContext.Create(client.GetDatabase("sample_planets"));
