import org.mongodb.scala._
import org.mongodb.scala.model.Filters._
import org.mongodb.scala.model.Projections._
import org.mongodb.scala.model.Sorts._
import scala.concurrent.Await
import scala.concurrent.duration._
import scala.util.{Failure, Success}
import scala.concurrent.ExecutionContext.Implicits.global

object LimitSkipSort {
  def main(args: Array[String]): Unit = {
    val mongoClient = MongoClient("<connection string>")
    
    // start-db-coll
    val database: MongoDatabase = mongoClient.getDatabase("sample_restaurants")
    val collection: MongoCollection[Document] = database.getCollection("restaurants")
    // end-db-coll

    // Retrieves 5 documents that have a "cuisine" value of "Italian"
    // start-limit
    val filter = equal("cuisine", "Italian")

    collection.find(filter).limit(5).subscribe((doc: Document) => println(doc.toJson()),
                                (e: Throwable) => println(s"There was an error: $e"))
    //end-limit

    // Retrieves documents with a "cuisine" value of "Italian" and sorts in ascending "name" order
    // start-sort
    val filter = equal("cuisine", "Italian")

    collection.find(filter).sort(ascending("name")).subscribe((doc: Document) => println(doc.toJson()),
                                (e: Throwable) => println(s"There was an error: $e"))
    // end-sort

    // Retrieves documents with a "borough" value of "Manhattan" but skips the first 10 results
    // start-skip
    val filter = equal("borough", "Manhattan")

    collection.find(filter).skip(10).subscribe((doc: Document) => println(doc.toJson()),
                                (e: Throwable) => println(s"There was an error: $e"))
    // end-skip

    // Retrieves 5 documents with a "cuisine" value of "Italian", skips the first 10 results,
    // and sorts by ascending "name" order
    // start-limit-sort-skip
    val filter = equal("cuisine", "Italian")

    collection.find(filter)
              .limit(5)
              .skip(10)
              .sort(ascending("name"))
              .subscribe((doc: Document) => println(doc.toJson()),
                        (e: Throwable) => println(s"There was an error: $e"))
    // end-limit-sort-skip

    // Keep the main thread alive long enough for the asynchronous operations to complete
    Thread.sleep(5000)

    // Close the MongoClient connection
    mongoClient.close()
  }
}