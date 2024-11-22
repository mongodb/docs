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
    val uri: String = "<connection string>"
    val client: MongoClient = MongoClient(uri)

    // start-db-coll
    val database: MongoDatabase = client.getDatabase("sample_restaurants")
    val collection: MongoCollection[Document] = database.getCollection("restaurants")
    // end-db-coll

    // Retrieves documents matching the "name" field query and projects their "name", "cuisine", and "borough" values
    // start-project-include
    collection
        .find(equal("name", "Emerald Pub"))
        .projection(include("name", "cuisine", "borough"))
        .subscribe((doc: Document) => println(doc.toJson()),
                                (e: Throwable) => println(s"There was an error: $e"))
    // end-project-include

    // Retrieves documents matching the "name" field query
    // and projects their "name", "cuisine", and "borough" values while excluding the "_id" values
    // start-project-include-without-id
    collection
        .find(equal("name", "Emerald Pub"))
        .projection(fields(include("name", "cuisine", "borough"), excludeId()))
        .subscribe((doc: Document) => println(doc.toJson()),
                                (e: Throwable) => println(s"There was an error: $e"))
    // end-project-include-without-id

    // Retrieves documents matching the "name" field query and excludes their "grades" and "address" values when printing
    // start-project-exclude
    collection
        .find(equal("name", "Emerald Pub"))
        .projection(exclude("name", "address"))
        .subscribe((doc: Document) => println(doc.toJson()),
                                (e: Throwable) => println(s"There was an error: $e"))
    // end-project-exclude
  }
}