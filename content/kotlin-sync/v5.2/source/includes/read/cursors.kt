package org.example
import com.mongodb.ConnectionString
import com.mongodb.CursorType
import com.mongodb.MongoClientSettings
import com.mongodb.client.model.Filters.eq
import com.mongodb.kotlin.client.MongoClient
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId
import org.bson.Document

// start-data-class
data class Restaurant(
    @BsonId
    val id: ObjectId,
    val name: String
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

    // start-cursor-iterate
    val results = collection.find()

    results.forEach { result ->
        println(result)
    }
    // end-cursor-iterate

    // start-cursor-iterate-alternative
    val results = collection.find()

    results.cursor().use { cursor ->
        while (cursor.hasNext()) {
            println(resultCursor.next())
        }
    }
    // end-cursor-iterate-alternative

    // start-cursor-next
    val results = collection
        .find<Restaurant>(eq(Restaurant::name.name, "Dunkin' Donuts"))

    results.cursor().use { cursor ->
        println(if (cursor.hasNext()) cursor.next()
                else "No document matches the filter")
    }
    // end-cursor-next

    // start-cursor-list
    val results = collection.find<Restaurant>(eq(Restaurant::name.name, "Dunkin' Donuts"))
    val resultsList = results.toList()

    for (result in resultsList) {
        println(result)
    }
    // end-cursor-list

    // start-tailable-cursor
    val results = collection.find<Document>().cursorType(CursorType.TailableAwait)
    // end-tailable-cursor
}
