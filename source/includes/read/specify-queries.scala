import org.mongodb.scala._
import org.mongodb.scala.model.Filters._
import org.mongodb.scala.model.Projections._
import org.mongodb.scala.model.Sorts._
import scala.concurrent.Await
import scala.concurrent.duration._
import scala.util.{Failure, Success}
import scala.concurrent.ExecutionContext.Implicits.global
import org.mongodb.scala.result.InsertManyResult

object Retrieve {
  def main(args: Array[String]): Unit = {
    // start-setup
    val uri: String = "<connection string>"
    val client: MongoClient = MongoClient(uri)
    val database: MongoDatabase = client.getDatabase("db")
    val collection: MongoCollection[Document] = database.getCollection("fruits")

    // Inserts documents representing fruits
    val fruits: Seq[Document] = Seq(
        Document("_id" -> 1, "name" -> "apples", "qty" -> 5, "rating" -> 3, "color" -> "red", "type" -> Seq("fuji", "honeycrisp")),
        Document("_id" -> 2, "name" -> "bananas", "qty" -> 7, "rating" -> 4, "color" -> "yellow", "type" -> Seq("cavendish")),
        Document("_id" -> 3, "name" -> "oranges", "qty" -> 6, "rating" -> 2, "type" -> Seq("naval", "mandarin")),
        Document("_id" -> 4, "name" -> "pineapples", "qty" -> 3, "rating" -> 5, "color" -> "yellow")
    )

    val result = collection.insertMany(fruits)
                           .subscribe((result: InsertManyResult) => println(result))
    // end-setup

    // Retrieves documents in which the "color" value is "yellow"
    // start-find-exact
    val filter = equal("color", "yellow")

    collection.find(filter).subscribe((doc: Document) => println(doc.toJson()),
                                (e: Throwable) => println(s"There was an error: $e"))
    // end-find-exact

    // Retrieves and prints documents in which the "rating" value is greater than 2
    // start-find-comparison
    val filter = gt("rating", 2)

    collection.find(filter).subscribe((doc: Document) => println(doc.toJson()),
                                (e: Throwable) => println(s"There was an error: $e"))
    // end-find-comparison

    // Retrieves and prints documents that match one or both query filters
    // start-find-logical
    val filter = or(gt("qty", 5), equal("color", "yellow"))

    collection.find(filter).subscribe((doc: Document) => println(doc.toJson()),
                                (e: Throwable) => println(s"There was an error: $e"))
    // end-find-logical

    // Retrieves and prints documents in which the "type" array has 2 elements
    // start-find-array
    val filter = size("type", 2)

    collection.find(filter).subscribe((doc: Document) => println(doc.toJson()),
                                (e: Throwable) => println(s"There was an error: $e"))
    // end-find-array

    // Retrieves and prints documents that have a "color" field
    // start-find-element
    val filter = exists("color")

    collection.find(filter).subscribe((doc: Document) => println(doc.toJson()),
                                (e: Throwable) => println(s"There was an error: $e"))
    // end-find-element

    // Retrieves and prints documents in which the "name" value has at least two consecutive "p" characters
    // start-find-evaluation
    val filter = regex("name", "p{2,}")

    collection.find(filter).subscribe((doc: Document) => println(doc.toJson()),
                                (e: Throwable) => println(s"There was an error: $e"))
    // end-find-evaluation
  }
}