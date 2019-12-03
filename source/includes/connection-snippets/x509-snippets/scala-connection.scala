// begin x509 connection
import scala.collection.JavaConverters._
import org.mongodb.scala._
import org.mongodb.scala.bson.collection.mutable.Document
import org.mongodb.scala.connection.{ClusterSettings, SslSettings}

object MongoDBx509 extends App {

  System.setProperty("javax.net.ssl.keyStore", "client.keystore")
  System.setProperty("javax.net.ssl.keyStorePassword", "<your_password>")

  val credential = MongoCredential.createMongoX509Credential()

  val settings = MongoClientSettings.builder()
    .credential(credential)
    .applyToClusterSettings(
      (builder: ClusterSettings.Builder)
      => builder.hosts(List(new ServerAddress("<cluster-url>")).asJava))
    .applyToSslSettings(
      (builder : SslSettings.Builder)
      => builder.enabled(true))
    .build()

  val client : MongoClient = MongoClient(settings)
  val database: MongoDatabase = client.getDatabase("testDB")
  val collection: MongoCollection[Document] = database.getCollection("testCol")

  val docCount = collection.countDocuments()
  println(docCount)
}
// end x509 connection
