import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.model.Indexes
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Sorts
import com.mongodb.kotlin.client.MongoClient
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId

// start-movie-class
data class Movie(
    @BsonId
    val id: ObjectId,
    val title: String? = "",
    val genre: String? = "",
    val cast: List<String>? = null,
    val plot: String? = "",
)
// end-movie-class

fun main() {
    val uri = "<connection string URI>"

    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .retryWrites(true)
        .build()

    val mongoClient = MongoClient.create(settings)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Movie>("movies")

    // start-remove-index
    collection.dropIndex("_title_")
    // end-remove-index

    // start-remove-all-indexes
    collection.dropIndexes()
    // end-remove-all-indexes

    // start-index-single
    collection.createIndex(Indexes.ascending(Movie::title.name))
    // end-index-single

    // start-index-single-query
    val filter = Filters.eq(Movie::title.name, "Batman")
    val sort = Sorts.ascending(Movie::title.name)
    val results = collection.find(filter).sort(sort)

    results.forEach { result ->
        println(result)
    }
    // end-index-single-query
}
