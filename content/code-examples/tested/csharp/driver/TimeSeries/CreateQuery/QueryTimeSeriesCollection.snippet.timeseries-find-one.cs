var query =
    Builders<SensorReading>.Filter.Where
        (s => s.Timestamp == new DateTime(2021, 11, 19, 0, 0, 0, 0));

var projection = Builders<SensorReading>.Projection
    .Exclude(s => s.Id); // Exclude the _id field

var result = await collection.Find(query).Project(projection).ToListAsync();
