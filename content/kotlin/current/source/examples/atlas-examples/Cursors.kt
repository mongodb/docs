package org.example
import com.mongodb.ConnectionString
import com.mongodb.CursorType
import com.mongodb.MongoClientSettings
import com.mongodb.client.model.Filters.eq
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId
import org.bson.Document

// start-data-class
data class Movie(
    @BsonId
    val id: ObjectId,
    val title: String,
    val genres: List<String>
)
// end-data-class

fun main() = runBlocking {
    val uri = "<connection string URI>"

    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .retryWrites(true)
        .build()

   MongoClient.create(settings).use { mongoClient ->
        val database = mongoClient.getDatabase("sample_mflix")
        val collection = database.getCollection<Movie>("movies")

        // start-cursor-tailable
        val results = collection.find<Document>().cursorType(CursorType.TailableAwait)
        
        results.collect { document ->
            println("Document: $document")
        }
        // end-cursor-tailable
    }
}
