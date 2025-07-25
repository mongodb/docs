import org.mongodb.scala._
import com.mongodb.{ TransactionOptions, ReadConcern, ReadPreference, WriteConcern }
import java.util.concurrent.TimeUnit
import scala.concurrent.Await
import scala.concurrent.duration.Duration
import scala.jdk.CollectionConverters._

object ReadWritePref {

  def main(args: Array[String]): Unit = {

    // Uses the settings builder methods to set read and write settings for the client
    // start-client-settings
    val mongoClient = MongoClient(MongoClientSettings.builder()
        .applyConnectionString(ConnectionString("mongodb://localhost:27017/"))
        .readPreference(ReadPreference.secondary())
        .readConcern(ReadConcern.LOCAL)
        .writeConcern(WriteConcern.W2)
        .build())
    // end-client-settings

    // Uses connection URI parameters to read and write settings for the client
    // start-client-settings-uri
    val uriClient = MongoClient("mongodb://localhost:27017/?readPreference=secondary&w=2&readConcernLevel=local")
    // end-client-settings-uri

    // Sets read and write settings for the transaction
    // start-transaction-settings
    val clientSessionFuture = mongoClient.startSession().toFuture()
    val clientSession = Await.result(clientSessionFuture, Duration(10, TimeUnit.SECONDS))

    val tOptions: TransactionOptions = TransactionOptions.builder()
        .readPreference(ReadPreference.primary())
        .readConcern(ReadConcern.MAJORITY)
        .writeConcern(WriteConcern.W1)
        .build()
    clientSession.startTransaction(tOptions)
    // end-transaction-settings

    // Sets read and write settings for the "test_database" database
    // start-database-settings
    val database = mongoClient.getDatabase("test_database")
        .withReadPreference(ReadPreference.primaryPreferred())
        .withReadConcern(ReadConcern.AVAILABLE)
        .withWriteConcern(WriteConcern.MAJORITY)
    // end-database-settings

    // Sets read and write settings for the "test_collection" collection
    // start-collection-settings
    val collection = database.getCollection("test_collection")
        .withReadPreference(ReadPreference.secondaryPreferred())
        .withReadConcern(ReadConcern.AVAILABLE)
        .withWriteConcern(WriteConcern.UNACKNOWLEDGED)
    // end-collection-settings

    // Instructs the driver to prefer reads from secondary replica set members
    // located in New York, followed by a secondary in San Francisco, and
    // lastly fall back to any secondary.
    // start-tag-set
    val tag1 = new TagSet(new Tag("dc", "ny"))
    val tag2 = new TagSet(new Tag("dc", "sf"))
    val tag3 = new TagSet()

    val readPreference = ReadPreference.secondary(List(tag1, tag2, tag3).asJava)

    val database = mongoClient.getDatabase("test_database")
                              .withReadPreference(readPreference)
    // end-tag-set

    // Instructs the library to distribute reads between members within 35 milliseconds
    // of the closest member's ping time using client settings
    // start-local-threshold-uri
    val connectionString = "mongodb://localhost:27017/?replicaSet=repl0&localThresholdMS=35"
    val client = MongoClient(connectionString)
    // end-local-threshold-uri

    // Instructs the library to distribute reads between members within 35 milliseconds
    // of the closest member's ping time using a URI option
    // start-local-threshold-settings
    val client = MongoClient(MongoClientSettings.builder()
        .applyConnectionString(ConnectionString("mongodb://localhost:27017/"))
        .applyToClusterSettings(builder => builder
            .localThreshold(35, TimeUnit.MILLISECONDS)
        )
        .build())
    // end-local-threshold-settings

    // Keep the main thread alive long enough for the asynchronous operations to complete
    Thread.sleep(5000)

    // Close the MongoClient connection
    mongoClient.close()
    
  }

}