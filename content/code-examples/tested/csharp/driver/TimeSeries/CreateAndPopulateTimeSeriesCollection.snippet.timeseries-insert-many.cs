var uri = "<connection string>";
var client = new MongoClient(uri);
var database = client.GetDatabase("timeseries");
var collection = database.GetCollection<SensorReading>("weather");

var sampleDocuments = new List<SensorReading>()
{
    new SensorReading(
        new Sensor(5578, "temperature"),
        temp: 45.2,
        timestamp: new DateTime(2021, 11, 18, 0, 0, 0, 0)),
    new SensorReading(
        new Sensor(5578, "temperature"),
        47.3,
        new DateTime(2021, 11, 18, 6, 0, 0, 0)),
    new SensorReading(
        new Sensor(5578, "temperature"),
        48.8,
        new DateTime(2021, 11, 18, 18, 0, 0, 0)),
    new SensorReading(
        new Sensor(5578, "temperature"),
        43.3,
        new DateTime(2021, 11, 19, 0, 0, 0, 0)),
    new SensorReading(
        new Sensor(5578, "temperature"),
        47.2,
        new DateTime(2021, 11, 19, 6, 0, 0, 0)),
    new SensorReading(
        new Sensor(5578, "temperature"),
        51.5,
        new DateTime(2021, 11, 19, 12, 0, 0, 0)),
    new SensorReading(
        new Sensor(5578, "temperature"),
        48.2,
        new DateTime(2021, 11, 19, 18, 0, 0, 0)),
};

try
{
    collection.InsertMany(sampleDocuments);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}
