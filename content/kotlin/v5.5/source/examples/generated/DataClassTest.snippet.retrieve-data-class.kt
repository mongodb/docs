val collection = database.getCollection<DataStorage>("data_storage_devices")

// Retrieve and print the documents as data classes
val resultsFlow = collection.find()
resultsFlow.collect { println(it) }
