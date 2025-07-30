package org.example
import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.model.Filters.*
import com.mongodb.kotlin.client.MongoClient
import org.bson.codecs.pojo.annotations.BsonId

// start-data-class
data class Fruit(
    @BsonId
    val id: Int,
    val name: String,
    val quantity: Int,
    val rating: Int,
    val color: String,
    val type: List<String>
)
// end-data-class

fun main() {
    // start-sample-data
    val uri = "<connection string URI>"

    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .retryWrites(true)
        .build()

    val mongoClient = MongoClient.create(settings)
    val database = mongoClient.getDatabase("sample_fruit")
    val collection = database.getCollection<Fruit>("fruits")

    collection.insertMany(listOf(
        Fruit(1, "apples", 5, 3, "red", listOf("fuji", "honeycrisp")),
        Fruit(2, "bananas", 7, 4, "yellow", listOf("cavendish")),
        Fruit(3, "oranges", 6, 2, null, listOf("naval", "mandarin")),
        Fruit(4, "pineapples", 3, 5, "yellow", null)
    ))
    // end-sample-data

    // start-find-exact
    val results = collection.find(eq(Fruit::color.name, "yellow"))

    results.forEach { result ->
        println(result);
    }
    // end-find-exact

    // start-find-comparison
    val results = collection.find(gt(Fruit::rating.name, 2))

    results.forEach { result ->
        println(result)
    }
    // end-find-comparison

    // start-find-logical
    val results = collection.find(
        or(
            gt(Fruit::quantity.name, 5),
            eq(Fruit::color.name, "yellow")
        )
    )

    results.forEach { result ->
        println(result)
    }
    // end-find-logical

    // start-find-array
    val results = collection.find(size(Fruit::type.name, 2))

    results.forEach { result ->
        println(result)
    }
    // end-find-array

    // start-find-element
    val results = collection.find(exists(Fruit::color.name))

    results.forEach { result ->
        println(result)
    }
    // end-find-element

    // start-find-evaluation
    val results = collection.find(regex(Fruit::name.name, "p{2,}"))

    results.forEach { result ->
        println(result)
    }
    // end-find-evaluation
}
