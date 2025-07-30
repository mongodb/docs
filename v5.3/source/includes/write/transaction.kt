import com.mongodb.kotlin.client.ClientSession
import com.mongodb.kotlin.client.MongoClient
import org.bson.Document
import com.mongodb.ReadConcern
import com.mongodb.TransactionOptions
import com.mongodb.WriteConcern

// start-data-class
data class Restaurant(val name: String, val cuisine: String)
// end-data-class

fun main() {
// start-transaction
    // Creates a new MongoClient to manage your connection
    val client = MongoClient.create("<connection string>")

    // Gets the database and collection
    val database = client.getDatabase("sample_restaurants")
    val collection = database.getCollection<Restaurant>("restaurants")
    
    // Inserts restaurants into the collection
    fun insertRestaurantsInTransaction(session: ClientSession) {

        // Inserts restaurants within the transaction
        collection.insertOne(
            session,
            Restaurant("Kotlin Sync Pizza", "Pizza")
        )
        collection.insertOne(
            session,
            Restaurant("Kotlin Sync Burger", "Burger")
        )
    }

    // Starts a client session
    client.startSession().use { session ->
        try {
            // Sets transaction options
            val txnOptions = TransactionOptions.builder()
                .readConcern(ReadConcern.LOCAL)
                .writeConcern(WriteConcern.MAJORITY)
                .build()

            // Uses the withTransaction method to start a transaction and run the given function
            session.withTransaction({
                insertRestaurantsInTransaction(session)
                println("Transaction succeeded")
            }, txnOptions)
        } catch (e: Exception) {
            println("Transaction failed: ${e.message}")
        }
    }

    // Closes the MongoClient
    client.close()
// end-transaction
}