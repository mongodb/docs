package org.example
import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.model.Filters.eq
import com.mongodb.client.model.Sorts
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

    // start-limit
    val results = collection
        .find(eq(Restaurant::cuisine.name, "Italian"))
        .limit(5)

    results.forEach { result ->
        println(result)
    }
    // end-limit

    // start-sort
    val results = collection
        .find(eq(Restaurant::cuisine.name, "Italian"))
        .sort(Sorts.ascending(Restaurant::name.name))

    results.forEach { result ->
        println(result)
    }
    // end-sort

    // start-skip
    val results = collection
        .find(eq(Restaurant::cuisine.name, "Italian"))
        .skip(10)

    results.forEach { result ->
        println(result)
    }
    // end-skip

    // start-limit-sort-skip
    val results = collection
        .find(eq(Restaurant::cuisine.name, "Italian"))
        .sort(Sorts.ascending(Restaurant::name.name))
        .skip(10)
        .limit(5)

    results.forEach { result ->
        println(result)
    }
    // end-limit-sort-skip
}
