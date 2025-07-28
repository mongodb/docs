val database = mongoClient.getDatabase("fall_weather")
val tsOptions = TimeSeriesOptions("temperature")
val collOptions = CreateCollectionOptions().timeSeriesOptions(tsOptions)

database.createCollection("september2021", collOptions)
