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
    val database: MongoDatabase = client.getDatabase("sample_restaurants")
    val collection: MongoCollection[Document] = database.getCollection("restaurants")
    // end-db-coll

    // Retrieves distinct values of the "borough" field
    // start-distinct
    collection.distinct("borough")
              .subscribe((value: String) => println(value),
                        (e: Throwable) => println(s"There was an error: $e"))
    //end-distinct

    // Retrieves distinct "borough" field values for documents with a "cuisine" value of "Italian"
    // start-distinct-with-query
    val filter = equal("cuisine", "Italian")

    collection.distinct("borough", filter)
              .subscribe((value: String) => println(value),
                        (e: Throwable) => println(s"There was an error: $e"))
    // end-distinct-with-query

    // Retrieves distinct "name" field values for documents matching the "borough" and "cuisine" fields query
    // and attaches a comment to the operation
    // start-distinct-with-comment
    val filter = and(equal("borough", "Bronx"), equal("cuisine", "Pizza"))

    collection.distinct("name", filter)
               .comment("Bronx Pizza restaurants")
               .subscribe((value: String) => println(value),
                         (e: Throwable) => println(s"There was an error: $e"))
    // end-distinct-with-comment

    // Keep the main thread alive long enough for the asynchronous operations to complete
    Thread.sleep(5000)

    // Close the MongoClient connection
    mongoClient.close()
  }
}