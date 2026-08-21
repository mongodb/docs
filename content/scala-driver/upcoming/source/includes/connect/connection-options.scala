import com.mongodb.connection.ClusterConnectionMode
import com.mongodb.{MongoCompressor, ServerAddress}
import org.mongodb.scala._

import java.util.concurrent.TimeUnit
import scala.jdk.CollectionConverters._

object ConnectionOptionsExamples {

  // Overview examples

  def connectionUriExample(): Unit = {
    // start-connection-uri
    val uri = "mongodb://localhost:27017/?connectTimeoutMS=60000&tls=true"
    val mongoClient = MongoClient(uri)
    // end-connection-uri
    mongoClient.close()
  }

  def mongoClientSettingsExample(): Unit = {
    // start-mongoclientsettings
    val settings = MongoClientSettings.builder()
        .applyToClusterSettings(builder =>
            builder.hosts(List(new ServerAddress("localhost", 27017)).asJava))
        .applyToSocketSettings(builder =>
            builder.connectTimeout(60000, TimeUnit.MILLISECONDS))
        .applyToSslSettings(builder => builder.enabled(true))
        .build()

    val mongoClient = MongoClient(settings)
    // end-mongoclientsettings
    mongoClient.close()
  }

  def mongoClientSettingsConnectionStringExample(): Unit = {
    // start-mongoclientsettings-connection-string
    val uri = "mongodb://localhost:27017/"
    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .applyToSocketSettings(builder =>
            builder.connectTimeout(60000, TimeUnit.MILLISECONDS))
        .applyToSslSettings(builder => builder.enabled(true))
        .build()

    val mongoClient = MongoClient(settings)
    // end-mongoclientsettings-connection-string
    mongoClient.close()
  }

  // Network Compression

  def uriCompressors(): Unit = {
    // start-uri-compressors
    val uri = "mongodb://localhost:27017/?compressors=snappy,zstd,zlib"
    val mongoClient = MongoClient(uri)
    // end-uri-compressors
    mongoClient.close()
  }

  def mcsCompressors(): Unit = {
    // start-mcs-compressors
    val settings = MongoClientSettings.builder()
        .compressorList(List(
            MongoCompressor.createSnappyCompressor(),
            MongoCompressor.createZstdCompressor(),
            MongoCompressor.createZlibCompressor()
        ).asJava)
        .build()
    val mongoClient = MongoClient(settings)
    // end-mcs-compressors
    mongoClient.close()
  }

  def uriZlibCompressionLevel(): Unit = {
    // start-uri-zlib-compression-level
    val uri = "mongodb://localhost:27017/?compressors=zlib&zlibCompressionLevel=3"
    val mongoClient = MongoClient(uri)
    // end-uri-zlib-compression-level
    mongoClient.close()
  }

  def mcsZlibCompressionLevel(): Unit = {
    // start-mcs-zlib-compression-level
    val settings = MongoClientSettings.builder()
        .compressorList(List(
            MongoCompressor.createZlibCompressor()
                .withProperty(MongoCompressor.LEVEL, 3)
        ).asJava)
        .build()
    val mongoClient = MongoClient(settings)
    // end-mcs-zlib-compression-level
    mongoClient.close()
  }

  // Timeouts

  def uriConnectTimeout(): Unit = {
    // start-uri-connect-timeout
    val uri = "mongodb://localhost:27017/?connectTimeoutMS=10000"
    val mongoClient = MongoClient(uri)
    // end-uri-connect-timeout
    mongoClient.close()
  }

  def mcsConnectTimeout(): Unit = {
    // start-mcs-connect-timeout
    val settings = MongoClientSettings.builder()
        .applyToSocketSettings(builder =>
            builder.connectTimeout(10, TimeUnit.SECONDS))
        .build()
    val mongoClient = MongoClient(settings)
    // end-mcs-connect-timeout
    mongoClient.close()
  }

  def uriSocketTimeout(): Unit = {
    // start-uri-socket-timeout
    val uri = "mongodb://localhost:27017/?socketTimeoutMS=5000"
    val mongoClient = MongoClient(uri)
    // end-uri-socket-timeout
    mongoClient.close()
  }

  def mcsSocketTimeout(): Unit = {
    // start-mcs-socket-timeout
    val settings = MongoClientSettings.builder()
        .applyToSocketSettings(builder =>
            builder.readTimeout(5, TimeUnit.SECONDS))
        .build()
    val mongoClient = MongoClient(settings)
    // end-mcs-socket-timeout
    mongoClient.close()
  }

  // Server Selection

  def uriServerSelectionTimeout(): Unit = {
    // start-uri-server-selection-timeout
    val uri = "mongodb://localhost:27017/?serverSelectionTimeoutMS=30000"
    val mongoClient = MongoClient(uri)
    // end-uri-server-selection-timeout
    mongoClient.close()
  }

  def mcsServerSelectionTimeout(): Unit = {
    // start-mcs-server-selection-timeout
    val settings = MongoClientSettings.builder()
        .applyToClusterSettings(builder =>
            builder.serverSelectionTimeout(30, TimeUnit.SECONDS))
        .build()
    val mongoClient = MongoClient(settings)
    // end-mcs-server-selection-timeout
    mongoClient.close()
  }

  // Authentication

  def uriAuthMechanism(): Unit = {
    // start-uri-auth-mechanism
    val uri = "mongodb://<username>:<password>@localhost:27017/?authMechanism=SCRAM-SHA-256"
    val mongoClient = MongoClient(uri)
    // end-uri-auth-mechanism
    mongoClient.close()
  }

  def mcsAuthMechanism(): Unit = {
    // start-mcs-auth-mechanism
    val settings = MongoClientSettings.builder()
        .credential(MongoCredential.createScramSha256Credential(
            "<username>", "<authSource>", "<password>".toCharArray))
        .build()
    val mongoClient = MongoClient(settings)
    // end-mcs-auth-mechanism
    mongoClient.close()
  }

  def uriAuthMechanismProperties(): Unit = {
    // start-uri-auth-mechanism-properties
    val uri = "mongodb://localhost:27017/?authMechanismProperties=AWS_SESSION_TOKEN:12435"
    val mongoClient = MongoClient(uri)
    // end-uri-auth-mechanism-properties
    mongoClient.close()
  }

  def uriAuthSource(): Unit = {
    // start-uri-auth-source
    val uri = "mongodb://<username>:<password>@localhost:27017/?authSource=admin"
    val mongoClient = MongoClient(uri)
    // end-uri-auth-source
    mongoClient.close()
  }

  def uriUsername(): Unit = {
    // start-uri-username
    val uri = "mongodb://myUser:<password>@localhost:27017/"
    val mongoClient = MongoClient(uri)
    // end-uri-username
    mongoClient.close()
  }

  def uriPassword(): Unit = {
    // start-uri-password
    val uri = "mongodb://<username>:myPassword@localhost:27017/"
    val mongoClient = MongoClient(uri)
    // end-uri-password
    mongoClient.close()
  }

  // Read and Write Operations

  def uriReplicaSet(): Unit = {
    // start-uri-replica-set
    val uri = "mongodb://localhost:27017/?replicaSet=myRS"
    val mongoClient = MongoClient(uri)
    // end-uri-replica-set
    mongoClient.close()
  }

  def mcsReplicaSet(): Unit = {
    // start-mcs-replica-set
    val settings = MongoClientSettings.builder()
        .applyToClusterSettings(builder =>
            builder.requiredReplicaSetName("myRS"))
        .build()
    val mongoClient = MongoClient(settings)
    // end-mcs-replica-set
    mongoClient.close()
  }

  def uriDirectConnection(): Unit = {
    // start-uri-direct-connection
    val uri = "mongodb://localhost:27017/?directConnection=true"
    val mongoClient = MongoClient(uri)
    // end-uri-direct-connection
    mongoClient.close()
  }

  def mcsDirectConnection(): Unit = {
    // start-mcs-direct-connection
    val settings = MongoClientSettings.builder()
        .applyToClusterSettings(builder =>
            builder.mode(ClusterConnectionMode.SINGLE))
        .build()
    val mongoClient = MongoClient(settings)
    // end-mcs-direct-connection
    mongoClient.close()
  }

  def uriReadPreference(): Unit = {
    // start-uri-read-preference
    val uri = "mongodb://localhost:27017/?readPreference=primary"
    val mongoClient = MongoClient(uri)
    // end-uri-read-preference
    mongoClient.close()
  }

  def mcsReadPreference(): Unit = {
    // start-mcs-read-preference
    val settings = MongoClientSettings.builder()
        .readPreference(ReadPreference.primary())
        .build()
    val mongoClient = MongoClient(settings)
    // end-mcs-read-preference
    mongoClient.close()
  }

  def uriReadConcern(): Unit = {
    // start-uri-read-concern
    val uri = "mongodb://localhost:27017/?readConcern=majority"
    val mongoClient = MongoClient(uri)
    // end-uri-read-concern
    mongoClient.close()
  }

  def mcsReadConcern(): Unit = {
    // start-mcs-read-concern
    val settings = MongoClientSettings.builder()
        .readConcern(ReadConcern.MAJORITY)
        .build()
    val mongoClient = MongoClient(settings)
    // end-mcs-read-concern
    mongoClient.close()
  }

  def uriWriteConcern(): Unit = {
    // start-uri-write-concern
    val uri = "mongodb://localhost:27017/?writeConcern=majority"
    val mongoClient = MongoClient(uri)
    // end-uri-write-concern
    mongoClient.close()
  }

  def mcsWriteConcern(): Unit = {
    // start-mcs-write-concern
    val settings = MongoClientSettings.builder()
        .writeConcern(WriteConcern.MAJORITY)
        .build()
    val mongoClient = MongoClient(settings)
    // end-mcs-write-concern
    mongoClient.close()
  }

  def uriLocalThreshold(): Unit = {
    // start-uri-local-threshold
    val uri = "mongodb://localhost:27017/?localThresholdMS=35"
    val mongoClient = MongoClient(uri)
    // end-uri-local-threshold
    mongoClient.close()
  }

  def mcsLocalThreshold(): Unit = {
    // start-mcs-local-threshold
    val settings = MongoClientSettings.builder()
        .applyToClusterSettings(builder =>
            builder.localThreshold(35, TimeUnit.MILLISECONDS))
        .build()
    val mongoClient = MongoClient(settings)
    // end-mcs-local-threshold
    mongoClient.close()
  }
}
