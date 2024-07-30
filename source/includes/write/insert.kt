import com.mongodb.client.model.DeleteOptions
import com.mongodb.client.model.Filters.*
import com.mongodb.client.model.InsertManyOptions
import com.mongodb.kotlin.client.MongoClient

// start-data-class
data class Restaurant(val name: String, val borough: String)
// end-data-class

fun main() {
    val uri = "<connection string>"

    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_restaurants")
    val collection = database.getCollection<Restaurant>("restaurants")

    // start-insert-one
    val doc = Restaurant("Sea Shell Bar", "Queens")
    val result = collection.insertOne(doc)
    // end-insert-one

    // start-insert-many
    val docs = listOf(
        Restaurant("Full Moon Grill", "Queens"),
        Restaurant("King's Cup", "Manhattan"),
    )

    val result = collection.insertMany(docs)
    // end-insert-many

    // start-insert-opts
    val opts = InsertManyOptions().bypassDocumentValidation(true)
    val docs = listOf(
        Restaurant("Full Moon Grill", "Queens"),
        Restaurant("King's Cup", "Manhattan"),
    )

    val result = collection.insertMany(docs, opts)
    // end-insert-opts

}

