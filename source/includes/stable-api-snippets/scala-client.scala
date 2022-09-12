import com.mongodb.{ServerApi, ServerApiVersion}
import org.mongodb.scala._

// ...

// Replace <connection string> with your MongoDB deployment's connection string.
val uri = "<connection string>"

// Set the Stable API version on the client.
val mongoClientSettings = MongoClientSettings.builder().applyConnectionString(ConnectionString(uri))
    .serverApi(ServerApi.builder().version(ServerApiVersion.V1).build())
    .build()

val mongoClient = MongoClient(mongoClientSettings)
