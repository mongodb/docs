
import com.mongodb.client.model.*
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import org.bson.Document
import org.bson.codecs.pojo.annotations.BsonId
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals


internal class CollationTest {

    // :snippet-start: data-class-first-name
    data class FirstName(
        @BsonId val id: Int, 
        val firstName: String, 
        val verified: Boolean = false
    )
    // :snippet-end:
    // :snippet-start: data-class-collation-example
    data class CollationExample(@BsonId val id: Int, val a: String)
    // :snippet-end:
    
    companion object {
        val dotenv = dotenv()
        val client: MongoClient = MongoClient.create(dotenv["MONGODB_CONNECTION_URI"])
        val database = client.getDatabase("example_db")
        val nameCollection = database.getCollection<FirstName>("names")
        val collationExampleCollection = database.getCollection<CollationExample>("collation_examples")

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
            nameCollection.insertMany(
                listOf(
                    FirstName(1, "Klara"),
                    FirstName(2, "Gunter"),
                    FirstName(3, "Günter"),
                    FirstName(4, "Jürgen"),
                    FirstName(5, "Hannah")
                )
            )
            collationExampleCollection.insertMany(listOf(
                CollationExample(1, "16 apples"),
                CollationExample(2, "84 oranges"),
                CollationExample(3, "179 bananas")
            ))
        }
    }

    @AfterEach
    fun afterEach() {
        runBlocking {
            if(nameCollection.countDocuments() > 0){
                nameCollection.drop()
            }
            if(collationExampleCollection.countDocuments() > 0) {
                collationExampleCollection.drop()
            }
        }
    }

    @Test
    fun collationBuilderTest() {
        val collation =
        // :snippet-start: collation-builder
        Collation.builder()
            .caseLevel(true)
            .collationAlternate(CollationAlternate.SHIFTED)
            .collationCaseFirst(CollationCaseFirst.UPPER)
            .collationMaxVariable(CollationMaxVariable.SPACE)
            .collationStrength(CollationStrength.SECONDARY)
            .locale("en_US")
            .normalization(false)
            .numericOrdering(true)
            .build()
        // :snippet-end:
        assertEquals("en_US", collation.locale)
    }

    @Test
    fun createListCollationTest() = runBlocking {
        nameCollection.drop()
        // :snippet-start: create-collection-options
        database.createCollection(
            "names",
            CreateCollectionOptions().collation(
                Collation.builder().locale("en_US").build()
            )
        )
        // :snippet-end:
        // :snippet-start: list-indexes
        val collection = database.getCollection<FirstName>("names")
        val indexInformation = collection.listIndexes().first()
        println(indexInformation.toJson())
        // :snippet-end:
        assertEquals(2, database.listCollectionNames().toList().size)
        assertEquals("en_US", indexInformation.get("collation", Document::class.java).getString("locale"))
    }

    @Test
    fun createCollationWithIndex() = runBlocking {
        // :snippet-start: create-collation-with-index
        val collection = database.getCollection<FirstName>("names")
        collection.dropIndexes() // :remove:
        val idxOptions = IndexOptions().collation(Collation.builder().locale("en_US").build())
        collection.createIndex(Indexes.ascending(FirstName::firstName.name), idxOptions)
        // :snippet-end:
        assertEquals(2, collection.listIndexes().toList().size)
        assertEquals("en_US", collection.listIndexes().toList()[1].get("collation", Document::class.java).getString("locale"))
    }

    @Test
    fun collationOperationTest() = runBlocking {
        val collection = nameCollection
        // :snippet-start: collation-operation
        val resultsFlow = collection.find()
            .collation(Collation.builder().locale("en_US").build())
            .sort(Sorts.ascending(FirstName::firstName.name));
        // :snippet-end:
        val results = resultsFlow.toList()
        assertEquals("Gunter", results[0].firstName)
        assertEquals("Günter", results[1].firstName)
        assertEquals("Hannah", results[2].firstName)
        assertEquals(5, results.size)
    }
    @Test
    fun collationCustomOperationTest() = runBlocking {
        val collection = nameCollection
        // :snippet-start: collation-custom-operation
        val findFlow = collection.find()
            .collation(Collation.builder().locale("is").build())
            .sort(Sorts.ascending(FirstName::firstName.name))
        // :snippet-end:
        println(findFlow.toList())
        assertEquals("Gunter", findFlow.toList()[0].firstName)
        assertEquals("Günter", findFlow.toList()[1].firstName)
    }

    @Test
    fun findAndSortExampleTest() = runBlocking {
        val collection = nameCollection
        // :snippet-start: find-and-sort
        val resultsFlow = collection.find()
            .collation(Collation.builder().locale("de@collation=phonebook").build())
            .sort(Sorts.ascending(FirstName::firstName.name))

        resultsFlow.collect { println(it) }
        // :snippet-end:
        val results = resultsFlow.toList()
        assertEquals("Günter", results[0].firstName)
        assertEquals("Gunter", results[1].firstName)
    }

    @Test
    fun findOneAndUpdateExampleTest() = runBlocking {
        val collection = nameCollection
        // :snippet-start: find-one-and-update
        val result = collection.findOneAndUpdate(
            Filters.lt(FirstName::firstName.name, "Gunter"),
            Updates.set("verified", true),
            FindOneAndUpdateOptions()
                .collation(Collation.builder().locale("de@collation=phonebook").build())
                .sort(Sorts.ascending(FirstName::firstName.name))
                .returnDocument(ReturnDocument.AFTER)
        )
        println(result)
        // :snippet-end:
        assertEquals("Günter", result?.firstName) // returning hannah?
        assertEquals(true, result?.verified)
    }

    @Test
    fun findOneAndDeleteExampleTest() = runBlocking {
        val collection = collationExampleCollection
        // :snippet-start: find-one-and-delete
        val result = collection.findOneAndDelete(
            Filters.gt(CollationExample::a.name, "100"),
            FindOneAndDeleteOptions()
                .collation(Collation.builder().locale("en").numericOrdering(true).build())
                .sort(Sorts.ascending(CollationExample::a.name))
        )
        println(result)
        // :snippet-end:
        val expected = CollationExample(3, "179 bananas")
        assertEquals(expected, result)
        // Clean up
        collection.drop()
    }

    @Test
    fun aggregatesExampleTest() = runBlocking {
        val collection = nameCollection
        // :snippet-start: aggregates
        data class Result(@BsonId val id: String, val nameCount: Int)
        val groupStage = Aggregates.group(
            "\$${FirstName::firstName.name}",
            Accumulators.sum("nameCount", 1)
        )
        val sortStage = Aggregates.sort(Sorts.ascending("_id"))
        val resultsFlow = collection.aggregate<Result>(listOf(groupStage, sortStage))
            .collation(
                Collation.builder().locale("de")
                    .collationStrength(CollationStrength.PRIMARY)
                    .build()
            )
        resultsFlow.collect { println(it) }
        // :snippet-end:
        val results = resultsFlow.toList()
        println(results)
        assertEquals(4, results.size)
        assertEquals("Gunter", results[0].id)
        assertEquals(2, results[0].nameCount)
    }
}
