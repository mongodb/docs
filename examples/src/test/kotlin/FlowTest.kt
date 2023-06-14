

import com.mongodb.ExplainVerbosity
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.runBlocking
import org.bson.Document
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.TestInstance
import java.util.*
import kotlin.test.*


@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class FlowTest {

    data class PaintOrder(
        val id: Int,
        val color: String,
        val qty: Int
    )
    companion object {
        val config = getConfig()
        val client = MongoClient.create(config.connectionUri)
        val database = client.getDatabase("paint_store")
        val collection = database.getCollection<PaintOrder>("paint_order")

        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            runBlocking {
                collection.insertMany(listOf(
                    PaintOrder(1, "red", 5),
                    PaintOrder(2, "purple", 8),
                    PaintOrder(3, "yellow", 0),
                    PaintOrder(4, "green", 6),
                    PaintOrder(5, "pink", 0)
                ))
            }
        }

        @AfterAll
        @JvmStatic
        fun afterAll() {
            runBlocking {
                collection.drop()
                client.close()
            }
        }
    }

    @Test
    fun firstOrNullTest() = runBlocking {
        // :snippet-start: firstOrNull
        val resultsFlow = collection.find()
        val firstResultOrNull = resultsFlow.firstOrNull()
        // :snippet-end:
        assertNotNull(firstResultOrNull)
    }
    @Test
    fun firstTest() = runBlocking {
        var isReached = false
        // :snippet-start: first
        try {
            val resultsFlow = collection.find()
            val firstResult = resultsFlow.first()
            isReached = true // :remove:
        } catch (e: NoSuchElementException) {
            println("No results found")
        }
        // :snippet-end:
        assert(isReached)
    }

    @Test
    fun countTest() = runBlocking {
        // :snippet-start: count
        val resultsFlow = collection.find()
        val count = resultsFlow.count()
        // :snippet-end:
        assertEquals(5, count)
    }

    @Test
    fun toListTest() = runBlocking {
        // :snippet-start: toList
        val resultsFlow = collection.find()
        val results = resultsFlow.toList()
        // :snippet-end:
        assertEquals(5, results.size)
    }

    @Test
    fun iterateTest() = runBlocking {
        // :snippet-start: iterate
        val resultsFlow = collection.find()
        resultsFlow.collect { println(it) }
        // :snippet-end:
        assertEquals(5, resultsFlow.count())
    }

    @Test
    fun explainTest() = runBlocking {
        // :snippet-start: explain
        val explanation = collection.find().explain(ExplainVerbosity.EXECUTION_STATS)
        val jsonSummary = explanation.getEmbedded(
            listOf("queryPlanner", "winningPlan"),
            Document::class.java
        ).toJson()
        println(jsonSummary)
        // :snippet-end:
        val expected = """{"stage": "COLLSCAN", "direction": "forward"}
        """.trimIndent()
        assertEquals(expected, jsonSummary)
    }
}

