import org.mongodb.scala._
import org.mongodb.scala.bson.Document
import org.mongodb.scala.model.Filters._
import org.mongodb.scala.model.changestream._

object ReadCodeExamples {

  def main(args: Array[String]): Unit = {
    val mongoClient = MongoClient("<connection string URI>")
    val database: MongoDatabase = mongoClient.getDatabase("<database name>")
    val collection: MongoCollection[Document] = database.getCollection("<collection name>")

    {
      // start-find-one
      val filter = equal("<field>", "<value>")

      collection.find(filter).first().subscribe((doc: Document) => println(doc.toJson()),
        (e: Throwable) => println(s"There was an error: $e"))
      // end-find-one
    }

    {
      // start-find-multiple
      val filter = equal("<field>", "<value>")

      collection.find(filter).subscribe((doc: Document) => println(doc.toJson()),
        (e: Throwable) => println(s"There was an error: $e"))
      // end-find-multiple
    }

    {
      // start-count-collection
      collection.countDocuments()
        .subscribe((count: Long) => println(s"Number of documents: $count"),
          (e: Throwable) => println(s"There was an error: $e"))
      // end-count-collection
    }

    {
      // start-count-documents
      collection.countDocuments(equal("<field>", "<value>"))
        .subscribe((count: Long) => println(s"Number of documents: $count"),
          (e: Throwable) => println(s"There was an error: $e"))
      // end-count-documents
    }

    {
      // start-estimate-count
      collection.estimatedDocumentCount()
        .subscribe((count: Long) => println(s"Estimated number of documents: $count"),
          (e: Throwable) => println(s"There was an error: $e"))
      // end-estimate-count
    }

    {
      // start-retrieve-distinct
      collection.distinct("<field>")
        .subscribe((value: String) => println(value),
          (e: Throwable) => println(s"There was an error: $e"))
      // end-retrieve-distinct
    }

    {
      // start-monitor-changes
      val changeStreamObservable = collection.watch()

      changeStreamObservable.subscribe(
        (changeEvent: ChangeStreamDocument[Document]) => {
          println(s"Received a change to the collection: ${changeEvent}")
        },
        (e: Throwable) => {
          println(s"Encountered an error: ${e.getMessage}")
        },
        () => println("Completed")
      )
      // end-monitor-changes
    }

    // Wait for the operations to complete before closing client
    Thread.sleep(1000)
    mongoClient.close()
  }
}
