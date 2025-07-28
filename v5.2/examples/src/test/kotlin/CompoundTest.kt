
import com.mongodb.client.model.Filters
import com.mongodb.client.model.FindOneAndDeleteOptions
import com.mongodb.client.model.FindOneAndReplaceOptions
import com.mongodb.client.model.FindOneAndUpdateOptions
import com.mongodb.client.model.ReturnDocument
import com.mongodb.client.model.Sorts
import com.mongodb.client.model.Updates
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.runBlocking
import org.bson.codecs.pojo.annotations.BsonId
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import java.util.concurrent.TimeUnit
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class CompoundOperationsTest {
    // :snippet-start: compound-data-model
    data class FoodOrder(
        @BsonId val id: Int,
        val food: String,
        val color: String
    )
    // :snippet-end:

    // :snippet-start: room-data-class
    data class HotelRoom(
        @BsonId val id: Int,
        val guest: String? = null,
        val room: String,
        val reserved: Boolean = false
    )
    // :snippet-end:
    companion object {
        val config = getConfig()
        val client = MongoClient.create(config.connectionUri)
        val database = client.getDatabase("compound_operations")
        val collection = database.getCollection<FoodOrder>("example")
        val hotelCollection = database.getCollection<HotelRoom>("rooms")

        @AfterAll
        @JvmStatic
        fun afterAll() {
            runBlocking {
                database.drop()
                client.close()
            }
        }
    }

    @BeforeEach
    fun beforeEach() {
        runBlocking {
            val room = HotelRoom(1, null, "Blue Room")
            hotelCollection.insertOne(room)
        }
    }

    @AfterEach
    fun afterEach() {
        runBlocking {
            collection.drop()
            hotelCollection.drop()
        }
    }

    @Test
    fun findOneUpdateTest() = runBlocking {
        val foodOrders = FoodOrder(1, "donut", "green")
        collection.insertOne(foodOrders)
        // :snippet-start: find-one-update

        val filter = Filters.eq(FoodOrder::color.name, "green")
        val update = Updates.set(FoodOrder::food.name, "pizza")
        val options = FindOneAndUpdateOptions()
            .upsert(true)
        /* The result variable contains your document in the
            state before your update operation is performed
            or null if the document was inserted due to upsert
            being true */
        val result = collection.findOneAndUpdate(filter, update, options)

        println(result)
        // :snippet-end:
        // Junit test for the above code
        val expected = FoodOrder(1, "donut", "green")
        assertEquals(expected, result)
    }

    @Test
    fun findOneReplaceTest() = runBlocking {
        val foodOrders = FoodOrder(1, "pizza", "green")
        collection.insertOne(foodOrders)
        // :snippet-start: find-one-replace
        data class Music(
            @BsonId val id: Int,
            val music: String,
            val color: String
        )

        val filter = Filters.eq(FoodOrder::color.name, "green")
        val replace = Music(1, "classical", "green")
        val options = FindOneAndReplaceOptions()
            .returnDocument(ReturnDocument.AFTER)
        val result = collection.withDocumentClass<Music>().findOneAndReplace(filter, replace, options)

        println(result)
        // :snippet-end:
        assertEquals(replace, result)
    }

    @Test
    fun findOneDeleteTest() = runBlocking {
        val foodOrders = listOf(
            FoodOrder(1, "pizza", "green"),
            FoodOrder(2, "pear", "yellow")
        )
        collection.insertMany(foodOrders)
        // :snippet-start: find-one-delete
        val sort = Sorts.descending("_id")
        val filter = Filters.empty()
        val options = FindOneAndDeleteOptions().sort(sort)
        val result = collection.findOneAndDelete(filter, options)

        println(result)
        // :snippet-end:
        // Junit test for the above code
        val expectedDeleted = FoodOrder(2, "pear", "yellow")
        assertEquals(expectedDeleted, result)
    }
    @Test
    fun bookARoom() = runBlocking {
        // :snippet-start: unsafe
        suspend fun bookARoomUnsafe(guestName: String) {
            val filter = Filters.eq("reserved", false)
            val myRoom = hotelCollection.find(filter).firstOrNull()
            if (myRoom == null) {
                println("Sorry, we are booked, $guestName")
                return
            }

            val myRoomName = myRoom.room

            println("You got the $myRoomName, $guestName")

            val update = Updates.combine(Updates.set("reserved", true), Updates.set("guest", guestName))
            val roomFilter = Filters.eq("_id", myRoom.id)
            hotelCollection.updateOne(roomFilter, update)
        }
        // :snippet-end:
        bookARoomUnsafe("joe")
        val roomAfterUnsafe = hotelCollection.find()
        assertEquals("joe", roomAfterUnsafe.first().guest)
        assertTrue(roomAfterUnsafe.first().reserved)

        // :snippet-start: safe
    suspend fun bookARoomSafe(guestName: String) {
        val update = Updates.combine(
            Updates.set(HotelRoom::reserved.name, true),
            Updates.set(HotelRoom::guest.name, guestName)
        )
        val filter = Filters.eq("reserved", false)
        val myRoom = hotelCollection.findOneAndUpdate(filter, update)
        if (myRoom == null) {
            println("Sorry, we are booked, $guestName")
            return
        }

        val myRoomName = myRoom.room
        println("You got the $myRoomName, $guestName")
    }
    // :snippet-end:
     bookARoomSafe("joe")
    val roomAfterSafe = hotelCollection.find()
    assertEquals("joe", roomAfterSafe.first().guest)
    assertTrue(roomAfterSafe.first().reserved)
    }
}
