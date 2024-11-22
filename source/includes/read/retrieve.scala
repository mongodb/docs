import org.mongodb.scala._
import org.mongodb.scala.model.Filters._
import org.mongodb.scala.model.Projections._
import org.mongodb.scala.model.Sorts._
import scala.concurrent.Await
import scala.concurrent.duration._
import scala.util.{Failure, Success}
import scala.concurrent.ExecutionContext.Implicits.global

object Retrieve {
  def main(args: Array[String]): Unit = {
    val mongoClient = MongoClient("<connection string>")
    
    // start-db-coll
    val database: MongoDatabase = mongoClient.getDatabase("sample_training")
    val collection: MongoCollection[Document] = database.getCollection("companies")
    // end-db-coll

    // Finds documents with a "founded_year" value of 1970
    // start-find-many
    val filter = equal("founded_year", 1970)

    collection.find(filter).subscribe((doc: Document) => println(doc.toJson()),
                                (e: Throwable) => println(s"There was an error: $e"))
    //end-find-many

    // Finds one document with a "name" value of "LinkedIn"
    // start-find-one
    val filter = equal("name", "LinkedIn")

    collection.find(filter).first().subscribe((doc: Document) => println(doc.toJson()),
                                (e: Throwable) => println(s"There was an error: $e"))
    // end-find-one

    // Finds and prints up to 5 documents with a "number_of_employees" value of 1000
    // start-modify
    val filter = equal("number_of_employees", 1000)

    collection.find(filter).limit(5).subscribe((doc: Document) => println(doc.toJson()),
                                (e: Throwable) => println(s"There was an error: $e"))
    // end-modify

    // Keep the main thread alive long enough for the asynchronous operations to complete
    Thread.sleep(5000)

    // Close the MongoClient connection
    mongoClient.close()
  }
}