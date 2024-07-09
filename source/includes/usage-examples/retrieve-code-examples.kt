import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.kotlin.client.*
import com.mongodb.client.model.Filters.*
import org.bson.Document

fun main() {
    val uri = "<connection string URI>"

    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .retryWrites(true)
        .build()

    // Create a new client and connect to the server
    val mongoClient = MongoClient.create(settings)
    val database = mongoClient.getDatabase("<database name>")
    val collection = database.getCollection<Document>("<collection name>")

    // start-find
    val filter = <filter>
    val results = collection.find(filter)
    results.forEach { result ->
        print(result)
    }
    // end-find

    // start-count-all
    val count = collection.countDocuments()
    print(count)
    // end-count-all

    // start-count-query
    val filter = <filter>
    val queryCount = collection.countDocuments(filter)
    print(queryCount)
    // end-count-query

    // start-estimated-count
    val estimatedCount = collection.estimatedDocumentCount()
    print(estimatedCount)
    // end-estimated-count

    // start-distinct
    val distinctResults = collection.distinct("<field name>")
    distinctResults.forEach { result ->
        print(result)
    }
    // end-distinct

    // start-watch
    val changeStream = collection.watch()
    changeStream.forEach { changeEvent ->
        print(changeEvent)
    }
    // end-watch
}