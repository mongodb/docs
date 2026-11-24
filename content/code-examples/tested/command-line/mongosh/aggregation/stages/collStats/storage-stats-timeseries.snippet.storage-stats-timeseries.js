db.weather.aggregate( [ { $collStats: { storageStats: { } } } ] ).toArray()[0].storageStats.timeseries
