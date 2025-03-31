package org.example

import com.mongodb.ClientSessionOptions
import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.TransactionOptions
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoClients
import com.mongodb.client.cursor.TimeoutMode
import com.mongodb.client.model.Filters
import org.bson.Document
import java.util.concurrent.TimeUnit

class CsotExample {
    private fun mongoClientSettings() {
        // start-mongoclientsettings
        val settings = MongoClientSettings.builder()
            .applyConnectionString(ConnectionString("<connection string>"))
            .timeout(200L, TimeUnit.MILLISECONDS)
            .build()

        val client = MongoClients.create(settings)
        // end-mongoclientsettings
    }

    private fun connectionString() {
        // start-string
        val uri = "<connection string>/?timeoutMS=200"
        val client = MongoClients.create(uri)
        // end-string
    }

    private fun operationTimeout() {
        // start-operation-timeout
        val settings = MongoClientSettings.builder()
            .applyConnectionString(ConnectionString("<connection string>"))
            .timeout(200L, TimeUnit.MILLISECONDS)
            .build()

        MongoClients.create(settings).use { mongoClient ->
            val database = mongoClient.getDatabase("db")
            val collection = database.getCollection("people")
            collection.insertOne(Document("name", "Francine Loews"))
        }
        // end-operation-timeout
    }

    private fun overrideTimeout() {
        // start-override
        val settings = MongoClientSettings.builder()
            .applyConnectionString(ConnectionString("<connection string>"))
            .timeout(200L, TimeUnit.MILLISECONDS)
            .build()

        MongoClients.create(settings).use { mongoClient ->
            val database = mongoClient.getDatabase("db")
            val collection = database
                .getCollection("people")
                .withTimeout(300L, TimeUnit.MILLISECONDS)
        }
        // end-override
    }

    private fun transactionTimeout() {
        val settings = MongoClientSettings.builder()
            .applyConnectionString(ConnectionString("<connection string>"))
            .build()
        MongoClients.create(settings).use { mongoClient ->
            val collection = mongoClient
                .getDatabase("db")
                .getCollection("people")

            // start-session-timeout
            val opts = ClientSessionOptions.builder()
                .defaultTimeout(200L, TimeUnit.MILLISECONDS)
                .build()

            val session = mongoClient.startSession(opts)
            // ... perform operations on ClientSession
            // end-session-timeout

            // start-transaction-timeout
            val transactionOptions = TransactionOptions.builder()
                .timeout(200L, TimeUnit.MILLISECONDS)
                .build()
            // end-transaction-timeout
        }
    }

    private fun cursorTimeout() {
        val settings = MongoClientSettings.builder()
            .applyConnectionString(ConnectionString("<connection string>"))
            .timeout(200L, TimeUnit.MILLISECONDS)
            .build()

        MongoClients.create(settings).use { mongoClient ->
            val collection = mongoClient
                .getDatabase("db")
                .getCollection("people")

            // start-cursor-lifetime
            val cursorWithLifetimeTimeout = collection
                .find(Filters.gte("age", 40))
                .timeoutMode(TimeoutMode.CURSOR_LIFETIME)
            // end-cursor-lifetime

            // start-cursor-iteration
            collection
                .find(Filters.gte("age", 40))
                .timeoutMode(TimeoutMode.ITERATION)
                .cursor().use { cursorWithIterationTimeout ->
                    while (cursorWithIterationTimeout.hasNext()) {
                        println(cursorWithIterationTimeout.next().toJson())
                    }
                }
            // end-cursor-iteration
        }
    }

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            val mongoClient = CsotExample().mongoClientSettings()
        }
    }
}
