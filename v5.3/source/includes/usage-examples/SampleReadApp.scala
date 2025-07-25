
import org.mongodb.scala._
import org.mongodb.scala.bson.Document
import org.mongodb.scala.model.Filters._
import org.mongodb.scala.model.changestream._

object SampleReadApp {

  def main(args: Array[String]): Unit = {
    val mongoClient = MongoClient("<connection string URI>")
    val database: MongoDatabase = mongoClient.getDatabase("<database name>")
    val collection: MongoCollection[Document] = database.getCollection("<collection name>")


    // Start example code here

    // End example code here

    // Wait for the operations to complete before closing client
    // Note: This example uses Thread.sleep() for brevity and does not guarantee all
    // operations will be completed in time
    Thread.sleep(1000)
    mongoClient.close()
  }
}
