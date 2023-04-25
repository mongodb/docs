
import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.ServerApi
import com.mongodb.ServerApiVersion
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import kotlin.test.assertEquals


@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class StableApiTest {

    companion object {
        val dotenv = dotenv()
        val CONNECTION_URI_PLACEHOLDER = dotenv["MONGODB_CONNECTION_URI"]
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