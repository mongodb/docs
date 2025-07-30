import com.mongodb.MongoNamespace
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Filters.eq
import com.mongodb.client.model.Updates
import com.mongodb.client.model.bulk.ClientBulkWriteOptions
import com.mongodb.client.model.bulk.ClientBulkWriteResult
import com.mongodb.client.model.bulk.ClientNamespacedWriteModel
import com.mongodb.kotlin.client.MongoClient
import org.bson.Document


// start-data-classes
data class Restaurant(
    val name: String,
    val borough: String,
    val cuisine: String,
    val stars: Int? = null,
)

data class Movie(
    val title: String,
    val year: Int,
    val seen: Boolean? = null,
)
// end-data-classes

fun main() {
    val uri = "<connection string>"

    val mongoClient = MongoClient.create(uri)

    // start-insert-models
    val restaurantToInsert = ClientNamespacedWriteModel
        .insertOne(
            MongoNamespace("sample_restaurants", "restaurants"),
            Restaurant("Blue Moon Grill", "Brooklyn", "American")
        )

    val movieToInsert = ClientNamespacedWriteModel
        .insertOne(
            MongoNamespace("sample_mflix", "movies"),
            Movie("Silly Days", 2022)
        )
    // end-insert-models

    // start-update-models
    val restaurantUpdate = ClientNamespacedWriteModel
        .updateOne(
            MongoNamespace("sample_restaurants", "restaurants"),
            Filters.eq(Restaurant::name.name, "Villa Berulia"),
            Updates.inc(Restaurant::stars.name, 1)
        )

    val movieUpdate = ClientNamespacedWriteModel
        .updateMany(
            MongoNamespace("sample_mflix", "movies"),
            Filters.eq(Movie::title.name, "Carrie"),
            Updates.set(Movie::seen.name, true)
        )
    // end-update-models

    // start-replace-models
    val restaurantReplacement = ClientNamespacedWriteModel
        .replaceOne(
            MongoNamespace("sample_restaurants", "restaurants"),
            Filters.eq("_id", 1),
            Restaurant("Smith Town Diner", "Brooklyn", "American")
        )

    val movieReplacement = ClientNamespacedWriteModel
        .replaceOne(
            MongoNamespace("sample_mflix", "movies"),
            Filters.eq("_id", 1),
            Movie("Loving Sylvie", 1999)
        )
    // end-replace-models

    // start-perform
    val restaurantNamespace = MongoNamespace("sample_restaurants", "restaurants")
    val movieNamespace = MongoNamespace("sample_mflix", "movies")

    val bulkOperations = listOf(
        ClientNamespacedWriteModel
            .insertOne(
                restaurantNamespace,
                Restaurant("Drea's", "Brooklyn", "Mexican")
            ),
        ClientNamespacedWriteModel
            .replaceOne(
                movieNamespace,
                Filters.eq("_id", 1),
                Movie("Underneath It All", 2002)
            )
    )

    val clientBulkResult = mongoClient
        .bulkWrite(bulkOperations)

    println(clientBulkResult.toString())
    // end-perform

    // start-options
    val namespace = MongoNamespace("sample_restaurants", "restaurants")

    val options = ClientBulkWriteOptions
        .clientBulkWriteOptions()
        .ordered(false)

    val bulkOps = listOf(
        ClientNamespacedWriteModel.insertOne(
            namespace,
            Document("_id", 1).append("name", "Freezyland")
        ),
        // Causes a duplicate key error
        ClientNamespacedWriteModel.insertOne(
            namespace,
            Document("_id", 1).append("name", "Coffee Stand No. 1")
        ),
        ClientNamespacedWriteModel.insertOne<Any>(
            namespace,
            Document("name", "Kelly's Krepes")
        )
    )

    val result = mongoClient
        .bulkWrite(bulkOps, options)
    // end-options
}

