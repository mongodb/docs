import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.kotlin.client.MongoClient
import javax.net.ssl.SSLContext

fun main() {
    // start-tls-connection-string
    val mongoClient = MongoClient.create("mongodb+srv://<db_username>:<db_password>@<cluster_url>/?tls=true")
    // end-tls-connection-string

    // start-tls-mongo-client-settings
    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString("<connection string URI>"))
        .applyToSslSettings { builder ->
            builder.enabled(true)
        }
        .build()
    val mongoClient = MongoClient.create(settings)
    // end-tls-mongo-client-settings

    // start-disable-hostname-verification
    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString("<connection string URI>"))
        .applyToSslSettings { builder ->
            builder.enabled(true)
            builder.invalidHostNameAllowed(true)
        }
        .build()
    val mongoClient = MongoClient.create(settings);
    // end-disable-hostname-verification

    // start-ssl-context
    val sslContext = SSLContext.getDefault()

    val settings = MongoClientSettings.builder()
        .applyToSslSettings { builder ->
            builder.enabled(true)
            builder.context(sslContext)
        }
        .build()
    val mongoClient = MongoClient.create(settings);
    // end-ssl-context
}