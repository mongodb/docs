val collection = database.getCollection<DataStorage>("data_storage")
val record = DataStorage("tape", 5.0)
collection.insertOne(record)
