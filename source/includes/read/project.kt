package org.example
import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.model.Filters.eq
import com.mongodb.client.model.Projections
import com.mongodb.kotlin.client.MongoClient
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId

// start-data-class
data class Restaurant(
    @BsonId
    val id: ObjectId? = null,
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

    // start-project
    val projection = Projections.fields(
        Projections.include(
            Restaurant::name.name,
            Restaurant::cuisine.name,
            Restaurant::borough.name
        )
    )

    val results = collection
        .find(eq(Restaurant::name.name, "Emerald Pub"))
        .projection(projection)

    results.forEach { result ->
        println(result)
    }
    // end-project

    // start-project-exclude
    val projection = Projections.fields(
        Projections.excludeId(),
        Projections.include(
            Restaurant::name.name,
            Restaurant::cuisine.name,
            Restaurant::borough.name
        )
    )

    val results = collection
        .find(eq(Restaurant::name.name, "Emerald Pub"))
        .projection(projection)

    results.forEach { result ->
        println(result)
    }
    // end-project-exclude
}
