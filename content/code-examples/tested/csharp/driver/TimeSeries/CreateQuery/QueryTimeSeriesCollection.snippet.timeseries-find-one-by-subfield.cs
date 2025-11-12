var query =
    Builders<SensorReading>.Filter.Where
        (s => s.Sensor.SensorId == 5578);

var projection = Builders<SensorReading>.Projection
    .Exclude(s => s.Id); // Exclude the _id field

var client = new MongoClient(Uri);
var database = client.GetDatabase("timeseries");
var collection = database.GetCollection<SensorReading>("weather");
var result = await
    collection.Find(query).Project(projection).ToListAsync();
return result;
