import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString("<connection URI>"))
        .readPreference(ReadPreference.secondary())
        .readConcern(ReadConcern.LOCAL)
        .writeConcern(WriteConcern.W2)
        .build()

    val mongoClient = MongoClient.create(settings)
    val database = mongoClient.getDatabase("sample_mflix")

    // start-read-preference
    val command = Document("hello", 1)
    val commandReadPreference = Document("readPreference", "secondary")

    val result = database.runCommand(command, commandReadPreference)
    // end-read-preference

    mongoClient.close()
}
