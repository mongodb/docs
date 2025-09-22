import org.mongodb.scala._
import org.mongodb.scala.model.Filters._
import org.mongodb.scala.model.CountOptions
import scala.concurrent.Await
import scala.concurrent.duration._
import scala.util.{Failure, Success}
import scala.concurrent.ExecutionContext.Implicits.global

object Count {
  def main(args: Array[String]): Unit = {
    val uri: String = "<connection string>"
    val client: MongoClient = MongoClient(uri)

    // start-db-coll
    val database: MongoDatabase = mongoClient.getDatabase("sample_training")
    val collection: MongoCollection[Document] = database.getCollection("companies")
    // end-db-coll

    // Counts all documents in the collection
    // start-count-all
    collection.countDocuments()
        .subscribe((count: Long) => println(s"Number of documents: $count"),
                  (e: Throwable) => println(s"There was an error: $e"))
    // end-count-all

    // Counts documents that have a "founded_year" value of 2010
    // start-count-accurate
    collection.countDocuments(equal("founded_year", 2010))
        .subscribe((count: Long) => println(s"Companies founded in 2010: $count"),
                  (e: Throwable) => println(s"There was an error: $e"))
    // end-count-accurate

    // Counts a maximum of 100 documents that have a "number_of_employees" value of 50
    // start-modify-accurate
    val countOptions = CountOptions().limit(100)
    collection.countDocuments(equal("number_of_employees", 50), countOptions)
        .subscribe((count: Long) => println(s"Companies with 50 employees: $count"),
                  (e: Throwable) => println(s"There was an error: $e"))
    // end-modify-accurate

    // Estimates the number of documents in the collection
    // start-count-estimate
    collection.estimatedDocumentCount()
        .subscribe((count: Long) => println(s"Estimated number of documents: $count"),
                  (e: Throwable) => println(s"There was an error: $e"))
    // end-count-estimate

    // Estimates the number of documents in the collection and sets a comment
    // start-modify-estimate
    val estimatedOptions = EstimatedDocumentCountOptions().comment("Count operation")
    collection.estimatedDocumentCount(estimatedOptions)
        .subscribe((count: Long) => println(s"Estimated number of documents: $count"),
                  (e: Throwable) => println(s"There was an error: $e"))
    // end-modify-estimate
  }
}
