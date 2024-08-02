import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.model.Filters.and
import com.mongodb.client.model.Filters.eq
import com.mongodb.kotlin.client.MongoClient

// start-data-class
data class Restaurant(
    val name: String,
    val borough: String,
    val cuisine: String
)
// end-data-class

fun main() {
    val uri = "<connection string URI>"

    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .retryWrites(true)
        .build()

    val mongoClient = MongoClient.create(settings)
    val database = mongoClient.getDatabase("sample_restaurants")
    val collection = database.getCollection<Restaurant>("restaurants")

    // start-distinct
    val results = collection.distinct<String>(Restaurant::borough.name)

    results.forEach { result ->
        println(result)
    }
    // end-distinct

    // start-distinct-query
    val results = collection.distinct<String>(
        Restaurant::borough.name,
        eq(Restaurant::cuisine.name, "Italian")
    )

    results.forEach { result ->
        println(result)
    }
    // end-distinct-query

    // start-distinct-comment
    val results = collection.distinct<String>(
        Restaurant::name.name,
        and(
            eq(Restaurant::borough.name, "Bronx"),
            eq(Restaurant::cuisine.name, "Pizza")
        )
    ).comment("Bronx pizza restaurants")

    results.forEach { result ->
        println(result)

    }
    // end-distinct-comment
}

