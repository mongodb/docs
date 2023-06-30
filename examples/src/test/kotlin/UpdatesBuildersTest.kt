
import com.mongodb.client.model.Filters
import com.mongodb.client.model.UpdateOptions
import com.mongodb.client.model.Updates
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import org.bson.BsonTimestamp
import org.bson.Document
import org.bson.codecs.pojo.annotations.BsonId
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import java.time.Duration
import java.time.LocalDateTime
import java.time.ZoneId
import kotlin.test.assertEquals

class UpdatesBuildersTest {
    // :snippet-start: example-data-class
    data class PaintOrder (
        @BsonId val id: Int,
        val color: String,
        val qty: Int?,
        val vendor: List<String>?,
        val lastModified: LocalDateTime?
    )
    // :snippet-end:

    companion object {
        val config = getConfig()
        val client = MongoClient.create(config.connectionUri)
        val database = client.getDatabase("store")
        val collection = database.getCollection<PaintOrder>("paint_orders")

        @AfterAll
        @JvmStatic
        fun afterAll() {
            runBlocking {
                database.drop()
                client.close()
            }
        }
    }
    // utility function to get the document
    private suspend fun getDocument() = collection.find(Filters.eq("_id", 1)).first()

    @BeforeEach
    fun beforeEach() {
        runBlocking {
            val date = LocalDateTime.of(2000, 1, 1,7,0,0) // Jan 1, 2000, 7:00:00
            val redPaint = PaintOrder(1, "red", 5, listOf("A", "D", "M"), date)
            collection.insertOne(redPaint)
        }
    }

    @AfterEach
    fun afterEach() {
        runBlocking {
            collection.drop()
        }
    }

    @Test
    fun setUpdateTest() = runBlocking {
        // :snippet-start: set-update
        val filter = Filters.eq("_id", 1)
        val update = Updates.set(PaintOrder::qty.name, 11)
        collection.updateOne(filter, update)
        // :snippet-end:
        assertEquals(11, getDocument().qty)
    }

    @Test
    fun unsetUpdateTest() = runBlocking {
        // :snippet-start: unset-update
        val filter = Filters.eq("_id", 1)
        val update = Updates.unset(PaintOrder::qty.name)
        collection.updateOne(filter, update)
        // :snippet-end:
        assertEquals(null, getDocument().qty)
    }

    @Test
    fun setOnInsertUpdateTest() = runBlocking {
        collection.deleteOne(Filters.eq("_id", 1))
        // :snippet-start: set-on-insert-update
        val filter = Filters.eq("_id", 1)
        val update = Updates.setOnInsert(PaintOrder::color.name, "pink")
        collection.updateOne(filter, update, UpdateOptions().upsert(true))
        // :snippet-end:
        assertEquals("pink", getDocument().color)
    }

    @Test
    fun incUpdateTest() = runBlocking {
        // :snippet-start: inc-update
        val filter = Filters.eq("_id", 1)
        val update = Updates.inc(PaintOrder::qty.name, 3)
        collection.updateOne(filter, update)
        // :snippet-end:
        assertEquals(8, getDocument().qty)
    }

    @Test
    fun mulUpdateTest() = runBlocking {
         // :snippet-start: mul-update
        val filter = Filters.eq("_id", 1)
        val update = Updates.mul(PaintOrder::qty.name, 2)
        collection.updateOne(filter, update)
        // :snippet-end:
        assertEquals(10, getDocument().qty)
    }

    @Test
    fun renameUpdateTest() = runBlocking {
        // :snippet-start: rename-update
        val filter = Filters.eq("_id", 1)
        val update = Updates.rename(PaintOrder::qty.name, "quantity")
        collection.updateOne(filter, update)
        // :snippet-end:
        assertEquals(null, getDocument().qty)
        val doc = collection.find<Document>(filter).first()
        assertEquals(5, doc.getInteger("quantity"))
    }

    @Test
    fun minUpdateTest() = runBlocking {
        // :snippet-start: min-update
        val filter = Filters.eq("_id", 1)
        val update = Updates.min(PaintOrder::qty.name, 2)
        collection.updateOne(filter, update)
        // :snippet-end:
        assertEquals(2, getDocument().qty)
    }

    @Test
    fun maxUpdateTest() = runBlocking {
        // :snippet-start: max-update
        val filter = Filters.eq("_id", 1)
        val update = Updates.max(PaintOrder::qty.name, 8)
        collection.updateOne(filter, update)
        // :snippet-end:
        assertEquals(8, getDocument().qty)
    }

    @Test
    fun currentDateUpdateTest() = runBlocking {
        // :snippet-start: current-date-update
        val filter = Filters.eq("_id", 1)
        val update = Updates.currentDate(PaintOrder::lastModified.name)
        collection.updateOne(filter, update)
        // :snippet-end:
        val docTime = getDocument().lastModified!!
        val nowTime = LocalDateTime.now(ZoneId.of("UTC"))
        println(docTime)
        println(nowTime)
        val diff = Duration.between(docTime, nowTime).toSeconds()
        assert(diff < 10)
    }

    @Test
    fun currentTimestampUpdateTest() = runBlocking {
        // :snippet-start: current-timestamp-update
        // Create a new instance of the collection with the flexible `Document` type
        // to allow for the changing of the `lastModified` field to a `BsonTimestamp`
        // from a `LocalDateTime`.
        val collection = database.getCollection<Document>("paint_orders")

        val filter = Filters.eq("_id", 1)
        val update = Updates.currentTimestamp(PaintOrder::lastModified.name)
        collection.updateOne(filter, update)
        // :snippet-end:
        val docTime = collection.find().first().get("lastModified", BsonTimestamp::class.java).time
        val nowTime = BsonTimestamp().time
        val diff = nowTime - docTime
        assert(diff < 10000)
    }

    @Test
    fun bitwiseOrUpdateTest() = runBlocking {
        // :snippet-start: bitwise-or-update
        val filter = Filters.eq("_id", 1)
        val update = Updates.bitwiseOr(PaintOrder::qty.name, 10)
        collection.updateOne(filter, update)
        // :snippet-end:
        assertEquals(15, getDocument().qty)
    }

    @Test
    fun addToSetUpdateTest() = runBlocking {
        // :snippet-start: add-to-set-update
        val filter = Filters.eq("_id", 1)
        val update = Updates.addToSet(PaintOrder::vendor.name, "C")
        collection.updateOne(filter, update)
        // :snippet-end:
        assertEquals(listOf("A", "D", "M", "C"), getDocument().vendor)
    }

    @Test
    fun popFirstUpdateTest() = runBlocking {
        // :snippet-start: pop-first-update
        val filter = Filters.eq("_id", 1)
        val update = Updates.popFirst(PaintOrder::vendor.name)
        collection.updateOne(filter, update)
        // :snippet-end:
        assertEquals(listOf("D", "M"), getDocument().vendor)
    }

    @Test
    fun pullAllUpdateTest() = runBlocking {
        // :snippet-start: pull-all-update
        val filter = Filters.eq("_id", 1)
        val update = Updates.pullAll(PaintOrder::vendor.name, listOf("A", "M"))
        collection.updateOne(filter, update)
        // :snippet-end:
        assertEquals(listOf("D"), getDocument().vendor)
    }

    @Test
    fun pullUpdateTest() = runBlocking {
        // :snippet-start: pull-update
        val filter = Filters.eq("_id", 1)
        val update = Updates.pull(PaintOrder::vendor.name, "D")
        collection.updateOne(filter, update)
        // :snippet-end:
        assertEquals(listOf("A", "M"), getDocument().vendor)
    }

    @Test
    fun pushUpdateTest() = runBlocking {
        // :snippet-start: push-update
        val filter = Filters.eq("_id", 1)
        val update = Updates.push(PaintOrder::vendor.name, "Q")
        collection.updateOne(filter, update)
        // :snippet-end:
        assertEquals(listOf("A", "D", "M", "Q"), getDocument().vendor)
    }

    @Test
    fun combineUpdateTest() = runBlocking {
        // :snippet-start: combine-update
        val filter = Filters.eq("_id", 1)
        val update = Updates.combine(
            Updates.set(PaintOrder::color.name, "purple"),
            Updates.inc(PaintOrder::qty.name, 6),
            Updates.push(PaintOrder::vendor.name, "R")
        )
        collection.updateOne(filter, update)
        // :snippet-end:
        val doc = getDocument()
        assertEquals("purple", doc.color)
        assertEquals(11, doc.qty)
        assertEquals(listOf("A", "D", "M", "R"), doc.vendor)
    }
}
