var database = client.GetDatabase("timeseries");
database.CreateCollection("weather", createCollectionOptions);
