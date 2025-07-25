import org.mongodb.scala._
import org.mongodb.scala.bson.Document
import org.mongodb.scala.model.Filters.equal
import org.mongodb.scala.model.ReplaceOptions
import org.mongodb.scala.result.UpdateResult

object Replace {

  def main(args: Array[String]): Unit = {
    val mongoClient = MongoClient("<connection string URI>")

    // start-db-coll
    val database: MongoDatabase = mongoClient.getDatabase("sample_restaurants")
    val collection: MongoCollection[Document] = database.getCollection("restaurants")
    // end-db-coll

    // start-replace-one
    val filter = equal("name", "Primola Restaurant")
    val replacement = Document(
      "name" -> "Frutti Di Mare",
      "borough" -> "Queens",
      "cuisine" -> "Seafood",
      "owner" -> "Sal Thomas"
    )
    val observable: Observable[UpdateResult] = collection.replaceOne(filter, replacement)

    observable.subscribe(new Observer[UpdateResult] {
      override def onNext(result: UpdateResult): Unit = println(s"Replaced document count: ${result.getModifiedCount}")
      override def onError(e: Throwable): Unit = println(s"Failed: ${e.getMessage}")
      override def onComplete(): Unit = println("Completed")
    })
    // end-replace-one

    // start-replace-options
    val options = ReplaceOptions().upsert(true)
    val observable: Observable[UpdateResult] = collection.replaceOne(filter, replacement, options)

    observable.subscribe(new Observer[UpdateResult] {
      override def onNext(result: UpdateResult): Unit = println(s"Replaced document count: ${result.getModifiedCount}")
      override def onError(e: Throwable): Unit = println(s"Failed: ${e.getMessage}")
      override def onComplete(): Unit = println("Completed")
    })
    // end-replace-options

    Thread.sleep(1000)
    mongoClient.close()
  }
}
