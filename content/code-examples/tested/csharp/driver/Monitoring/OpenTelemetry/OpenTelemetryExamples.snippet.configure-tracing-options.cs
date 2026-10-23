var settings = MongoClientSettings.FromConnectionString(connectionString);
settings.TracingOptions = new TracingOptions
{
    Disabled = false,
    QueryTextMaxLength = 1024
};
var client = new MongoClient(settings);
