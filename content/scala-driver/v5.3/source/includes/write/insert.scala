
import org.mongodb.scala._
import org.mongodb.scala.bson.Document
import org.mongodb.scala.model._
import org.mongodb.scala.result._

object Insert {

  def main(args: Array[String]): Unit = {
    val mongoClient = MongoClient("<connection string URI>")

    // start-db-coll
    val database: MongoDatabase = mongoClient.getDatabase("sample_restaurants")
    val collection: MongoCollection[Document] = database.getCollection("restaurants")
    // end-db-coll

    // start-insert-one
    val doc: Document = Document("name" -> "Neighborhood Bar & Grill", "borough" -> "Queens")
    val observable: Observable[InsertOneResult] = collection.insertOne(doc)

    observable.subscribe(new Observer[InsertOneResult] {
      override def onNext(result: InsertOneResult): Unit = println(result)
      override def onError(e: Throwable): Unit = println("Failed: " + e.getMessage)
      override def onComplete(): Unit = println("Completed")
    })
    // end-insert-one

    // start-insert-many
    val docs: Seq[Document] = Seq(
      Document("name" -> "Metropolitan Cafe", "borough" -> "Queens"),
      Document("name" -> "Yankee Bistro", "borough" -> "Bronx")
    )
    val observable: Observable[InsertManyResult] = collection.insertMany(docs)

    observable.subscribe(new Observer[InsertManyResult] {
      override def onNext(result: InsertManyResult): Unit = println(result)
      override def onError(e: Throwable): Unit = println("Failed: " + e.getMessage)
      override def onComplete(): Unit = println("Completed")
    })
    // end-insert-many

    // start-insert-opts
    val docs: Seq[Document] = Seq(
      Document("name" -> "One Night's Delight", "borough" -> "Queens"),
      Document("name" -> "Second Street Pub", "borough" -> "Manhattan"),
      Document("name" -> "Triple Crown Diner", "borough" -> "Brooklyn")
    )
    val opts: InsertManyOptions = InsertManyOptions().bypassDocumentValidation(true)
    val observable: Observable[InsertManyResult] = collection.insertMany(docs, opts)

    observable.subscribe(new Observer[InsertManyResult] {
      override def onNext(result: InsertManyResult): Unit = println(result)
      override def onError(e: Throwable): Unit = println("Failed: " + e.getMessage)
      override def onComplete(): Unit = println("Completed")
    })
    // end-insert-opts

    Thread.sleep(1000)
    mongoClient.close()
  }
}
