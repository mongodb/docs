import org.mongodb.scala._
import org.mongodb.scala.model.Filters._
import org.mongodb.scala.model.Indexes
import org.mongodb.scala.model.TextSearchOptions
import scala.concurrent.Await
import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global
import java.util.concurrent.TimeUnit

object QueryText {
  def main(args: Array[String]): Unit = {
    val mongoClient = MongoClient("<connection string>")

    // start-db-coll
    val database: MongoDatabase = mongoClient.getDatabase("sample_mflix")
    val collection: MongoCollection[Document] =
      database.getCollection("movies")
    // end-db-coll

    // Creates a text index on the "title" field
    // start-create-text-index
    val observable = collection.createIndex(Indexes.text("title"))
    Await.result(observable.toFuture(), Duration(10, TimeUnit.SECONDS))
    // end-create-text-index

    // Counts documents in which the "title" field contains the term "time"
    // start-text-term
    val filterTerm = text("time")

    collection.countDocuments(filterTerm)
              .subscribe((count: Long) => println(count))
    // end-text-term

    // Counts documents where the "title" field contains the term "time" or "machine"
    // start-text-multiple-terms
    val filterMultiple = text("time machine")

    collection.countDocuments(filterMultiple)
              .subscribe((count: Long) => println(count))
    // end-text-multiple-terms

    // Counts documents in which the "title" field contains the phrase "time machine"
    // start-text-phrase
    val filterPhrase = text("\"time machine\"")

    collection.countDocuments(filterPhrase)
              .subscribe((count: Long) => println(count))
    // end-text-phrase

    // Counts documents containing "time" but not "machine" in the "title" field
    // start-text-exclude
    val filterExclude = text("time -machine")

    collection.countDocuments(filterExclude)
              .subscribe((count: Long) => println(count))
    // end-text-exclude

    // Counts documents matching a case-sensitive search for "Time" in the "title" field
    // start-text-options
    val options = TextSearchOptions().caseSensitive(true)
    val filterOptions = text("Time", options)

    collection.countDocuments(filterOptions)
              .subscribe((count: Long) => println(count))
    // end-text-options

    Thread.sleep(5000)
    mongoClient.close()
  }
}
