import org.mongodb.scala.{ConnectionString, MongoClient, MongoClientSettings}

// start-single-index-imports
import org.mongodb.scala._
import org.mongodb.scala.model.Indexes
import org.mongodb.scala.model.IndexOptions._
import org.mongodb.scala.model.Filters._

import scala.concurrent.Await
import scala.concurrent.duration._
import scala.util.{Failure, Success}
import java.util.concurrent.TimeUnit
// end-single-index-imports

object SingleFieldIndex {

    def main(args: Array[String]): Unit = {

    // Replace the placeholder with your Atlas connection string
    val connectionString = "<connection string>";

    // Create a new client and connect to the server
    val mongoClient = MongoClient(connectionString)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection("movies")

    // start-index-single
    val index = Indexes.ascending("title")
    val observable = collection.createIndex(index)
    Await.result(observable.toFuture(), Duration(10, TimeUnit.SECONDS))
    // end-index-single

    // start-index-single-query
    val filter = equal("title", "Sweethearts")

    collection.find(filter).first().subscribe((doc: Document) => println(doc.toJson()),
                            (e: Throwable) => println(s"There was an error: $e"))
    // end-index-single-query

    // start-check-single-index
    collection.listIndexes().subscribe((doc: Document) => println(doc.toJson()),
                            (e: Throwable) => println(s"There was an error: $e"))
    // end-check-single-index

    Thread.sleep(1000)
    mongoClient.close()
  }
}
