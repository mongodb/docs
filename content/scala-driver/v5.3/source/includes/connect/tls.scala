import org.mongodb.scala._
import javax.net.ssl.SSLContext

object Tls {

  def main(args: Array[String]): Unit = {

    // Enables TLS by using client settings
    // start-enable-tls-settings
    val tlsUri = "mongodb://localhost:27017/"
    val tlsSettings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(tlsUri))
        .applyToSslSettings(builder => builder.enabled(true))
        .build()
    val tlsClient1 = MongoClient(tlsSettings)
    // end-enable-tls-settings

    // Enables TLS by using a connection URI parameter
    // start-enable-tls-uri
    val tlsClient2 = MongoClient("mongodb://localhost:27017/?tls=true")
    // end-enable-tls-uri

    // Disables host validation by using client settings
    // start-disable-host-validation-settings
    val invalidHostUri = "mongodb://localhost:27017/"
    val invalidHostSettings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(invalidHostUri))
        .applyToSslSettings(builder => builder
            .enabled(true)
            .invalidHostNameAllowed(true)
        )
        .build()
    val invalidHostClient1 = MongoClient(invalidHostSettings)
    // end-disable-host-validation-settings

    // Disables host validation by using a connection URI parameter
    // start-disable-host-validation-uri
    val invalidHostClient2 = MongoClient("mongodb://localhost:27017/?tls=true&tlsAllowInvalidHostnames=true")
    // end-disable-host-validation-uri

    // Creates an SSLContext object to further customize the TLS configuration
    // start-ssl-context
    val sslContext = SSLContext.getDefault()

    val contextSettings = MongoClientSettings.builder()
        .applyToSslSettings(builder => builder
            .enabled(true)
            .context(sslContext)
        )
        .build()
    val mongoClient = MongoClient(contextSettings);
    // end-ssl-context

    // Keep the main thread alive long enough for the asynchronous operations to complete
    Thread.sleep(5000)

    // Close the MongoClient connections
    tlsClient1.close()
    tlsClient2.close()
    invalidHostClient1.close()
    invalidHostClient2.close()
    mongoClient.close()
  }

}