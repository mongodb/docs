
import com.mongodb.client.model.CreateCollectionOptions
import com.mongodb.client.model.TimeSeriesOptions
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import org.bson.json.JsonWriterSettings
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import kotlin.test.assertEquals

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class TimeSeriesTest {
    
    companion object {
        val config = getConfig()
        val mongoClient = MongoClient.create(config.connectionUri)

        @AfterAll
        @JvmStatic
        fun afterAll() {
            runBlocking {
                mongoClient.close()
            }
        }
    }

    @Test
    fun timeSeriesTest() = runBlocking {
        // :snippet-start: create-time-series-collection
        val database = mongoClient.getDatabase("fall_weather")
        val tsOptions = TimeSeriesOptions("temperature")
        val collOptions = CreateCollectionOptions().timeSeriesOptions(tsOptions)

        database.createCollection("september2021", collOptions)
        // :snippet-end:
        // :snippet-start: check-time-series-collection-created
        val commandResult = database.listCollections().toList()
            .find { it["name"] == "september2021" }

        println(commandResult?.toJson(JsonWriterSettings.builder().indent(true).build()))
        // :snippet-end:
        assertEquals("timeseries", commandResult?.getString("type") )

        // clean up
        database.drop()
    }


}