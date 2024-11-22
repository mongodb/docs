import com.mongodb.{ServerApi, ServerApiVersion}
import org.mongodb.scala.{ConnectionString, MongoClient, MongoClientSettings}
import org.mongodb.scala.bson.Document

// start-multikey-index-imports
import org.mongodb.scala._
import org.mongodb.scala.model.Indexes
import org.mongodb.scala.model.IndexOptions._
import org.mongodb.scala.model.Filters._

import scala.concurrent.Await
import scala.concurrent.duration._
import scala.util.{Failure, Success}
import java.util.concurrent.TimeUnit
// end-multikey-index-imports

object MulitkeyFieldIndex {

    def main(args: Array[String]): Unit = {

    // Replace the placeholder with your Atlas connection string
    val connectionString = "<connection string>";

    // Create a new client and connect to the server
    val mongoClient = MongoClient(connectionString)

    // start-db-coll
    val database: MongoDatabase = mongoClient.getDatabase("sample_mflix")
    val collection: MongoCollection[Document] = database.getCollection("movies")
    // end-db-coll

    // start-index-multikey
    val index = Indexes.ascending("cast")
    val observable = collection.createIndex(index)
    Await.result(observable.toFuture(), Duration(10, TimeUnit.SECONDS))

    // end-index-multikey

    // start-index-multikey-query
    val filter = and(equal("cast", "Aamir Khan"), equal("cast", "Kajol"))

    collection.find(filter).first().subscribe((doc: Document) => println(doc.toJson()),
                            (e: Throwable) => println(s"There was an error: $e"))
    // end-index-multikey-query

    // start-check-multikey-index
    collection.listIndexes().subscribe((doc: Document) => println(doc.toJson()),
                            (e: Throwable) => println(s"There was an error: $e"))
    // end-check-multikey-index
  }
}
