import org.mongodb.scala.{ConnectionString, MongoClient, MongoClientSettings}
import org.mongodb.scala.connection.ConnectionPoolSettings

object ConnectionPools {

  def main(args: Array[String]): Unit = {

    // begin ConnectionString
    val mongoClient = MongoClient("mongodb://<host>:<port>/?maxPoolSize=50")
    // end ConnectionString
    mongoClient.close()

    // begin MongoSettings
    val settings = MongoClientSettings.builder()
      .applyConnectionString(ConnectionString("<connection string>"))
      .applyToConnectionPoolSettings(
        (builder: ConnectionPoolSettings.Builder) => builder.maxSize(50))
      .build()
    val mongoClientWithSettings = MongoClient(settings)
    // end MongoSettings
    mongoClientWithSettings.close()
  }
}
