// :snippet-start: storage-stats-timeseries
db.weather.aggregate( [ { $collStats: { storageStats: { } } } ] ).toArray()[0].storageStats.timeseries
// :snippet-end:
