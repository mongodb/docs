val connectionPoolListener = JMXConnectionPoolListener()
val settings = MongoClientSettings.builder()
    .applyConnectionString(uri)
    .applyToConnectionPoolSettings {
        it.addConnectionPoolListener(connectionPoolListener)
    }
    .build()
val mongoClient: MongoClient = MongoClient.create(settings)

try {
    println("Navigate to JConsole to see your connection pools...")
    Thread.sleep(Long.MAX_VALUE)
} catch (e: Exception) {
    e.printStackTrace()
}
