var query =
    Builders<SensorReading>.Filter.Where
        (s => s.Timestamp == new DateTime(2021, 11, 19, 0, 0, 0, 0));

var projection = Builders<SensorReading>.Projection
    .Exclude(s => s.Id); // Exclude the _id field

var client = new MongoClient(Uri);
var database = client.GetDatabase("timeseries");
var collection = database.GetCollection<SensorReading>("weather");
var result = await collection.Find(query).Project(projection).ToListAsync();
return result;
