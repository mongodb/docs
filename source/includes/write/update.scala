import org.mongodb.scala._
import org.mongodb.scala.bson.Document
import org.mongodb.scala.model.Filters.equal
import org.mongodb.scala.model.UpdateOptions
import org.mongodb.scala.model.Updates.{combine, rename, set}
import org.mongodb.scala.result.UpdateResult

object Update {

  def main(args: Array[String]): Unit = {
    val mongoClient = MongoClient("<connection string URI>")

    // start-db-coll
    val database: MongoDatabase = mongoClient.getDatabase("sample_restaurants")
    val collection: MongoCollection[Document] = database.getCollection("restaurants")
    // end-db-coll

    // start-update-one
    val filter = equal("name", "Happy Garden")
    val update = set("name", "Mountain House")
    val observable: Observable[UpdateResult] = collection.updateOne(filter, update)

    observable.subscribe(new Observer[UpdateResult] {
      override def onNext(result: UpdateResult): Unit =
          println(s"Updated document count: ${result.getModifiedCount}")
      override def onError(e: Throwable): Unit = println(s"Failed: ${e.getMessage}")
      override def onComplete(): Unit = println("Completed")
    })
    // end-update-one

    // start-update-many
    val filter = equal("name", "Starbucks")
    val update = rename("address", "location")
    val observable: Observable[UpdateResult] = collection.updateMany(filter, update)

    observable.subscribe(new Observer[UpdateResult] {
      override def onNext(result: UpdateResult): Unit =
          println(s"Updated document count: ${result.getModifiedCount}")
      override def onError(e: Throwable): Unit = println(s"Failed: ${e.getMessage}")
      override def onComplete(): Unit = println("Completed")
    })
    // end-update-many

    // start-update-options
    val filter = equal("name", "Sunrise Pizzeria")
    val opts = UpdateOptions().upsert(true)
    val update = combine(
      set("borough", "Queens"),
      set("cuisine", "Italian")
    )
    val observable: Observable[UpdateResult] = collection.updateOne(filter, update, opts)

    observable.subscribe(new Observer[UpdateResult] {
      override def onNext(result: UpdateResult): Unit =
          println(s"Updated document count: ${result.getModifiedCount}")
      override def onError(e: Throwable): Unit = println(s"Failed: ${e.getMessage}")
      override def onComplete(): Unit = println("Completed")
    })
    // end-update-options

    Thread.sleep(1000)
    mongoClient.close()
  }
}
