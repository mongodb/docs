
import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import io.netty.handler.ssl.SslContextBuilder
import io.netty.handler.ssl.SslProvider
import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.Disabled
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import javax.net.ssl.SSLContext
import kotlin.test.assertEquals

// :replace-start: {
//    "terms": {
//       "CONNECTION_URI_PLACEHOLDER": "\"<connection string>\""
//    }
// }

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class TlsTest {

    companion object {
        val config = getConfig()
        val CONNECTION_URI_PLACEHOLDER = config.connectionUri
    }

    @Test
    @Disabled("Disabled because host does not exist")
    fun tlsConnectionStringTest() = runBlocking {
        // :snippet-start: tls-connection-string
        val mongoClient = MongoClient.create("mongodb+srv://<db_username>:<db_password>@<cluster-url>?tls=true")
        // :snippet-end:
        mongoClient.close()
    }

    @Test
    fun tslMongoClientSettingsTest() = runBlocking {
        // :snippet-start: tls-mongoclient-settings
        val settings = MongoClientSettings.builder()
            .applyConnectionString(ConnectionString(CONNECTION_URI_PLACEHOLDER))
            .applyToSslSettings { builder ->
                builder.enabled(true)
            }
            .build()
        val mongoClient = MongoClient.create(settings)
        // :snippet-end:
        mongoClient.close()
        assertEquals(true, settings.sslSettings.isEnabled)
    }

    @Test
    fun disableHostnameVerificationTest() = runBlocking {
        // :snippet-start: disable-hostname-verification
        val settings = MongoClientSettings.builder()
            .applyConnectionString(ConnectionString(CONNECTION_URI_PLACEHOLDER))
            .applyToSslSettings { builder ->
                builder.enabled(true)
                builder.invalidHostNameAllowed(true)
            }
            .build()
        val mongoClient = MongoClient.create(settings);
        // :snippet-end:
        mongoClient.close()
        assertEquals(true, settings.sslSettings.isInvalidHostNameAllowed)
        assertEquals(true, settings.sslSettings.isEnabled)
    }

    @Test
    fun customTlsConfigurationTest() = runBlocking {
        // :snippet-start: custom-tls-configuration
        // You can customize SSL settings using the SSLContext
        val sslContext = SSLContext.getDefault()

        val settings = MongoClientSettings.builder()
            .applyToSslSettings { builder ->
                builder.enabled(true)
                builder.context(sslContext)
            }
            .build()
        val mongoClient = MongoClient.create(settings);
        // :snippet-end:
        mongoClient.close()
        assertEquals(true, settings.sslSettings.isEnabled)
        assertEquals(sslContext, settings.sslSettings.context)
    }

}
// :replace-end:
