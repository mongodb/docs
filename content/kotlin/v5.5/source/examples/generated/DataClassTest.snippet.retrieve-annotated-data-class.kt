val collection = database.getCollection<NetworkDevice>("network_devices")

// Return all documents in the collection as data classes
val resultsFlow = collection.find()
resultsFlow.collect { println(it) }
