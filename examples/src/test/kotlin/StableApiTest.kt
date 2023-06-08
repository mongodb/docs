
import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.ServerApi
import com.mongodb.ServerApiVersion
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import kotlin.test.assertEquals

// :replace-start: {
//    "terms": {
//       "CONNECTION_URI_PLACEHOLDER": "\"<connection string>\""
//    }
// }
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class StableApiTest {

    companion object {
        val config = getConfig()
        val CONNECTION_URI_PLACEHOLDER = config.connectionUri
    }
    @Test
    fun connectToStableApiTest() {
        // :snippet-start: connect-to-stable-api
        val serverApi = ServerApi.builder()
            .version(ServerApiVersion.V1)
            .build()

        // Replace the uri string placeholder with your MongoDB deployment's connection string
        val uri = CONNECTION_URI_PLACEHOLDER

        val settings = MongoClientSettings.builder()
            .applyConnectionString(ConnectionString(uri))
            .serverApi(serverApi)
            .build()

        val client = MongoClient.create(settings)
        // :snippet-end:
        client.close()
        assert(settings.serverApi?.version == ServerApiVersion.V1)
    }

    @Test
    fun stableApiSettingsTest() {
        // :snippet-start: stable-api-settings
        val serverApi = ServerApi.builder()
            .version(ServerApiVersion.V1)
            .strict(true)
            .deprecationErrors(true)
            .build()
        // :snippet-end:
        assert(serverApi.version == ServerApiVersion.V1)
        assertEquals(true, serverApi.strict.get())
        assertEquals(true, serverApi.deprecationErrors.get())
    }

}
// :replace-end:
