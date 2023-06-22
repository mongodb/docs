import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.ServerApi
import com.mongodb.ServerApiVersion
import com.mongodb.kotlin.client.sync.MongoClient
import com.mongodb.kotlin.client.sync.MongoDatabase

// Replace the placeholder with your MongoDB deployment's connection string
val uri = "<connection string>"

// Set the Stable API version on the client
val serverApi = ServerApi.builder()
    .version(ServerApiVersion.V1)
    .build()
val settings = MongoClientSettings.builder()
    .applyConnectionString(ConnectionString(uri))
    .serverApi(serverApi)
    .build()

// Create a new client and connect to the server
val mongoClient = MongoClient.create(settings)
val database = mongoClient.getDatabase("test")
