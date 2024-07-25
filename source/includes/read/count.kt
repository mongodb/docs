import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.model.*
import com.mongodb.client.model.Filters.*
import com.mongodb.kotlin.client.MongoClient
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId

// start-data-class
data class Movie(
    @BsonId
    val id: ObjectId,
    val title: String
)
// end-data-class

fun main() {
    val uri = "mongodb+srv://michael:Scrubs1996@testcluster.kmosy7d.mongodb.net/?retryWrites=true&w=majority"

    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .retryWrites(true)
        .build()

    val mongoClient = MongoClient.create(settings)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Movie>("movies")

    // start-count-all
    println(collection.countDocuments())
    // end-count-all

    // start-count-query
    println(collection.countDocuments(eq("year", "1930")))
    // end-count-query

    // start-count-options
    val options = CountOptions().comment("Retrieving count")
    collection.countDocuments(Filters.empty(), options)
    // end-count-options

    // start-estimated-count
    print(collection.estimatedDocumentCount())
    // end-estimated-count

    // start-estimated-count-options
    val options = EstimatedDocumentCountOptions().comment("Retrieving count")
    collection.estimatedDocumentCount(options)
    // end-estimated-count-options
}

