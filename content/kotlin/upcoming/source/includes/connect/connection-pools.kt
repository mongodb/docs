import com.mongodb.ConnectionString
import com.mongodb.kotlin.client.coroutine.MongoClient
import com.mongodb.MongoClientSettings

fun main() {
    // start-uri-option
    val uri = "mongodb://<host>:<port>/?maxPoolSize=50"
    val client = MongoClient.create(uri)
    // end-uri-option

    // start-client-settings
    val mongoClient = MongoClient.create(
        MongoClientSettings.builder()
            .applyConnectionString(ConnectionString("mongodb://<host>:<port>/"))
            .applyToConnectionPoolSettings { builder -> 
                builder.maxSize(50) 
            }
            .build()
    )
    // end-client-settings
}