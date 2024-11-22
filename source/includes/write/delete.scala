import org.mongodb.scala._
import org.mongodb.scala.bson.Document
import org.mongodb.scala.model.Filters.{and, equal, regex}
import org.mongodb.scala.model.{DeleteOptions}
import org.mongodb.scala.result.{DeleteResult}

object Delete {

  def main(args: Array[String]): Unit = {
    val mongoClient = MongoClient("<connection string URI>")

    // start-db-coll
    val database: MongoDatabase = mongoClient.getDatabase("sample_restaurants")
    val collection: MongoCollection[Document] = database.getCollection("restaurants")
    // end-db-coll

    // start-delete-one
    val filter = equal("name", "Happy Garden")
    val observable: Observable[DeleteResult] = collection.deleteOne(filter)

    observable.subscribe(new Observer[DeleteResult] {
      override def onNext(result: DeleteResult): Unit = println(s"Deleted document count: ${result.getDeletedCount}")
      override def onError(e: Throwable): Unit = println(s"Error: $e")
      override def onComplete(): Unit = println("Completed")
//    })
    // end-delete-one

    // start-delete-many
    val filter = and(
      equal("borough", "Brooklyn"),
      equal("name", "Starbucks")
    )
    val observable: Observable[DeleteResult] = collection.deleteMany(filter)

    observable.subscribe(new Observer[DeleteResult] {
      override def onNext(result: DeleteResult): Unit = println(s"Deleted document count: ${result.getDeletedCount}")
      override def onError(e: Throwable): Unit = println(s"Error: $e")
      override def onComplete(): Unit = println("Completed")
    })
    // end-delete-many

    // start-delete-options
    val filter = regex("name", "Red")
    val opts = DeleteOptions().comment("sample comment")
    val observable = collection.deleteMany(filter, opts)

    observable.subscribe(new Observer[DeleteResult] {
      override def onNext(result: DeleteResult): Unit = println(s"Deleted document count: ${result.getDeletedCount}")
      override def onError(e: Throwable): Unit = println(s"Error: $e")
      override def onComplete(): Unit = println("Completed")
    })
    // end-delete-options

    Thread.sleep(1000)
    mongoClient.close()
  }
}
