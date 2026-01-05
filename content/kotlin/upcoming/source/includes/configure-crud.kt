package org.example
import com.mongodb.*
import com.mongodb.kotlin.client.coroutine.MongoClient
import org.bson.Document
import java.util.concurrent.TimeUnit

fun main() = runBlocking {
    // Uses the settings builder methods to set read and write settings for the client
    // start-client-settings
    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString("mongodb://localhost:27017/"))
        .readPreference(ReadPreference.secondary())
        .readConcern(ReadConcern.LOCAL)
        .writeConcern(WriteConcern.W2)
        .build()

    val mongoClient = MongoClient.create(settings)
    // end-client-settings

    // Uses connection URI parameters to set read and write settings for the client
    // start-client-settings-uri
    val uri = "mongodb://localhost:27017/?readPreference=secondary&w=2&readConcernLevel=local"
    val uriClient = MongoClient.create(uri)
    // end-client-settings-uri

    // Sets read and write settings for the transaction
    // start-transaction-settings
    mongoClient.startSession().use { session ->
        try {
            // Sets transaction read and write settings
            val txnOptions = TransactionOptions.builder()
                .readPreference(ReadPreference.primary())
                .readConcern(ReadConcern.MAJORITY)
                .writeConcern(WriteConcern.W1)
                .build()

            runBlocking {
                session.startTransaction(txnOptions)
                // Specify transaction operations here
                session.commitTransaction()
            }
        } catch (e: Exception) {
            println("Transaction failed: ${e.message}")
        }
    }
    // end-transaction-settings

    // Sets read and write settings for the "test_database" database
    // start-database-settings
    val database = mongoClient.getDatabase("test_database")
        .withReadPreference(ReadPreference.primaryPreferred())
        .withReadConcern(ReadConcern.AVAILABLE)
        .withWriteConcern(WriteConcern.MAJORITY)
    // end-database-settings

    // Sets read and write settings for the "test_collection" collection
    // start-collection-settings
    val collection = database.getCollection<Document>("test_collection")
        .withReadPreference(ReadPreference.secondaryPreferred())
        .withReadConcern(ReadConcern.AVAILABLE)
        .withWriteConcern(WriteConcern.UNACKNOWLEDGED)
    // end-collection-settings

    // Uses connection URI parameters to set a sharded cluster read preference
    // start-sharded-cluster-uri
    val shardedClient = MongoClient.create(
        "mongodb://user:password@mongos1.example.com,mongos2.example.com/?readPreference=secondary"
    )
    // end-sharded-cluster-uri

    // Instructs the driver to prefer reads from secondary replica set members
    // located in New York, then San Francisco, then fallback to any secondary.
    // start-tag-set
    val tag1 = TagSet(Tag("dc", "ny"))
    val tag2 = TagSet(Tag("dc", "sf"))
    val tag3 = TagSet() // Empty tag set as fallback

    val readPref = ReadPreference.secondary(listOf(tag1, tag2, tag3))

    val taggedDb = mongoClient.getDatabase("test_database")
        .withReadPreference(readPref)
    // end-tag-set

    // Instructs the library to distribute reads between members within 35 milliseconds
    // of the closest member's ping time using client settings
    // start-local-threshold-uri
    val latencyClient1 = MongoClient.create(
        "mongodb://localhost:27017/?replicaSet=repl0&localThresholdMS=35"
    )
    // end-local-threshold-uri

    // Instructs the library to distribute reads between members within 35 milliseconds
    // of the closest member's ping time using a URI option
    // start-local-threshold-settings
    val latencySettings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString("mongodb://localhost:27017/"))
        .applyToClusterSettings { builder ->
            builder.localThreshold(35, TimeUnit.MILLISECONDS)
        }
        .build()

    val latencyClient2 = MongoClient.create(latencySettings)
    // end-local-threshold-settings

    // Disable retryable reads and writes using MongoClientSettings builder
    // start-retryable-reads-writes
    val retrySettings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString("mongodb://localhost:27017/"))
        .retryReads(false)  // Disables automatic retries of read operations
        .retryWrites(false) // Disables automatic retries of write operations
        .build()

    val retryClient = MongoClient.create(retrySettings)

    // end-retryable-reads-writes

    // start-retryable-reads-writes-uri
    val retryUri = "mongodb://localhost:27017/?retryReads=false&retryWrites=false"
    val retryUriClient = MongoClient.create(retryUri)
    // end-retryable-reads-writes-uri

    // Close the MongoClient connection
    mongoClient.close()
}
