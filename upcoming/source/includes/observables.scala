import org.mongodb.scala._
import org.mongodb.scala.bson.Document
import org.mongodb.scala.model.Filters._
import org.mongodb.scala.result._

object Observables {

  def main(args: Array[String]): Unit = {
    val mongoClient = MongoClient("<connection string URI>")

    // start-db-coll
    val database: MongoDatabase = mongoClient.getDatabase("sample_restaurants")
    val collection: MongoCollection[Document] = database.getCollection("restaurants")
    // end-db-coll

    // start-read-observable
    val filter = equal("cuisine", "Czech")
    val findObservable: Observable[Document] = collection.find(filter)

    findObservable.subscribe(new Observer[Document] {
      override def onNext(result: Document): Unit = println(result)
      override def onError(e: Throwable): Unit = println("Failed: " + e.getMessage)
      override def onComplete(): Unit = println("Processed all results")
    })
    // end-read-observable

    // start-write-observable
    val docs: Seq[Document] = Seq(
      Document("name" -> "Cafe Himalaya", "cuisine" -> "Nepalese"),
      Document("name" -> "Taste From Everest", "cuisine" -> "Nepalese")
    )
    val insertObservable: Observable[InsertManyResult] = collection.insertMany(docs)

    insertObservable.subscribe(new Observer[InsertManyResult] {
      override def onNext(result: InsertManyResult): Unit = println(result)
      override def onError(e: Throwable): Unit = println("Failed: " + e.getMessage)
      override def onComplete(): Unit = println("Processed all results")
    })
    // end-write-observable

    // start-lambda
    collection.distinct("borough")
              .subscribe((value: String) => println(value),
                         (e: Throwable) => println(s"Failed: $e"),
                         () => println("Processed all results"))
    // end-lambda

    // start-to-future
    val observable = collection.find(equal("name", "The Halal Guys"))
    val results = Await.result(observable.toFuture(), Duration(10, TimeUnit.SECONDS))
    results.foreach(println)
    // end-to-future

    // Wait for the operations to complete before closing client
    Thread.sleep(1000)
    mongoClient.close()
  }
}
