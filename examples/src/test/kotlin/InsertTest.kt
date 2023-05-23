

import com.mongodb.MongoBulkWriteException
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.runBlocking
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.TestInstance
import java.util.*
import kotlin.test.*

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class InsertTest {
    // :snippet-start: data-model
    data class PaintOrder(
        @BsonId val id: ObjectId? = null,
        val qty: Int,
        val color: String
    )
    // :snippet-end:

    companion object {
        val dotenv = dotenv()
        val client = MongoClient.create(dotenv["MONGODB_CONNECTION_URI"])
        val database = client.getDatabase("paint_store")
        val collection = database.getCollection<PaintOrder>("paint_order")

        @AfterAll
        @JvmStatic
        fun afterAll() {
            runBlocking {
                client.close()
            }
        }
    }
    @Test
    fun insertManyErrorTest() = runBlocking {
        val paintOrders = listOf(
            PaintOrder(ObjectId(), 5, "red"),
            PaintOrder(ObjectId(), 10, "purple"),
            PaintOrder(ObjectId(), 3, "yellow"),
            PaintOrder(ObjectId(), 8, "blue")
        )
        // :snippet-start: insert-many-error
        val result = collection.insertMany(paintOrders)
        try {
            println("Inserted documents with the following ids: ${result.insertedIds}")
        } catch(e: MongoBulkWriteException){
            val insertedIds = e.writeResult.inserts.map { it.id.asInt32().value }
            println(
                "A MongoBulkWriteException occurred, but there are " +
                "successfully processed documents with the following ids: $insertedIds"
            )
            collection.find().collect { println(it) }
        }
        // :snippet-end:
        //Junit test for the above code
        assertTrue(result.wasAcknowledged())
    }

    @Test
    fun insertOneTest() = runBlocking {
        // :snippet-start: insert-one
        val paintOrder = PaintOrder(ObjectId(), 5, "red")
        val result = collection.insertOne(paintOrder)

        val insertedId = result.insertedId?.asObjectId()?.value

        println("Inserted a document with the following id: $insertedId")
        // :snippet-end:
        // Junit test for the above code
        assertTrue(result.wasAcknowledged())
    }

    @Test
    fun insertManyTest() = runBlocking {
        // :snippet-start: insert-many
        val paintOrders = listOf(
            PaintOrder(ObjectId(), 5, "red"),
            PaintOrder(ObjectId(), 10, "purple")
        )
        val result = collection.insertMany(paintOrders)

        println("Inserted a document with the following ids: ${result.insertedIds.toList()}")
        // :snippet-end:
        // Junit test for the above code
        assertTrue(result.wasAcknowledged())
    }
}

