val collection = database.getCollection<NetworkDevice>("network_devices")

// Insert the record
val deviceId = ObjectId().toHexString()
val device = NetworkDevice(deviceId, "Enterprise Wi-fi", "router")
collection.insertOne(device)
