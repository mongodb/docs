import org.mongodb.scala._
import org.mongodb.scala.model.SearchIndexModel

import java.util.concurrent.TimeUnit
import scala.concurrent.Await
import scala.concurrent.duration.Duration

import org.mongodb.scala.model.Indexes

object SearchIndexes {

  def main(args: Array[String]): Unit = {

    // Create a new client and connect to the server
    val mongoClient = MongoClient("<connection string URI>")

    val database = mongoClient.getDatabase("<database name>")
    val collection = database.getCollection("<collection name>")

    // Start example code here

    
    // End example code here

    Thread.sleep(1000)
    mongoClient.close()
  }
}
