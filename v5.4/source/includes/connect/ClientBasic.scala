import com.mongodb.{ServerApi, ServerApiVersion}
import org.mongodb.scala.{ConnectionString, MongoClient, MongoClientSettings}
import org.mongodb.scala.bson.Document

import scala.concurrent.Await
import scala.concurrent.duration.DurationInt
import scala.util.Using

object ClientBasic {

  def main(args: Array[String]): Unit = {

    // start-create-a-client
    // Replace the placeholder with your Atlas connection string
    val connectionString = "<connection string>"

    // Create a new client and connect to the server
    val mongoClient = MongoClient(connectionString)
    val database = mongoClient.getDatabase("sample_mflix")
    // end-create-a-client

    // Send a ping to confirm a successful connection
    val ping = database.runCommand(Document("ping" -> 1)).head()

    Await.result(ping, 10.seconds)
    System.out.println("Pinged your deployment. You successfully connected to MongoDB!")
  }
}
