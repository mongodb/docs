val queryAllEmbeddedAddresses = realm.query<EmbeddedAddress>()
val allEmbeddedAddresses = queryAllEmbeddedAddresses.find()
