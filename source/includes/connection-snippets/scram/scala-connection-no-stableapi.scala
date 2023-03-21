import org.mongodb.scala.MongoClient
import org.mongodb.scala.bson.Document

import scala.concurrent.Await
import scala.concurrent.duration.DurationInt
import scala.util.Using

object MongoClientConnectionExample {

  def main(args: Array[String]): Unit = {

    // Replace the placeholder with your Atlas connection string
    val connectionString = "<connection string>";

    // Create a new client and connect to the server
    Using(MongoClient(connectionString)) { mongoClient =>
      // Send a ping to confirm a successful connection
      val database = mongoClient.getDatabase("admin")
      val ping = database.runCommand(Document("ping" -> 1)).head()

      Await.result(ping, 10.seconds)
      System.out.println("Pinged your deployment. You successfully connected to MongoDB!")
    }
  }
}