package org.example
import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.ServerAddress
import com.mongodb.ServerApi
import com.mongodb.ServerApiVersion
import com.mongodb.kotlin.client.MongoClient

fun main() {
    // start-connect
    // Defines Stable API version
    val serverApi = ServerApi.builder()
        .version(ServerApiVersion.V1)
        .build()

    // Uses MongoClientSettings to apply connection string and specify the Stable API version
    val settings = MongoClientSettings.builder()
        .applyConnectionString("<connection string URI>")
        .serverApi(serverApi)
        .build()

    val mongoClient = MongoClient.create(settings)
    // end-connect

    // start-connect-local
    val settings = MongoClientSettings.builder()
        .applyConnectionString("mongodb://localhost:27017")
        .build()

    val mongoClient = MongoClient.create(settings)
    // end-connect-local

    // start-connect-rs-connection-string
    val mongoClient = MongoClient.create("mongodb://host1:27017,host2:27017,host3:27017/")
    // end-connect-rs-connection-string

    // start-connect-rs-settings
    val hosts = listOf(
        ServerAddress("host1", 27017),
        ServerAddress("host2", 27017),
        ServerAddress("host3", 27017)
    )

    val settings = MongoClientSettings.builder()
        .applyToClusterSettings { builder ->
            builder.hosts(hosts)
        }
        .build()
    
    val mongoClient = MongoClient.create(settings)
    // end-connect-rs-settings
}

