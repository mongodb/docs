db = client.GetDatabase("timeseriesdb");
db.CreateCollection("stocks", options);
