import org.mongodb.scala._
import org.mongodb.scala.model.{ Aggregates, Filters, Updates }
import org.mongodb.scala.model.Projections._
import org.mongodb.scala.model.Sorts._
import scala.concurrent.Await
import scala.concurrent.duration._
import scala.util.{Failure, Success}
import scala.concurrent.ExecutionContext.Implicits.global
import org.mongodb.scala.result.UpdateResult

object ChangeStreams {
  def main(args: Array[String]): Unit = {
    val uri: String = "<connection string>"
    val client: MongoClient = MongoClient(uri)

    // start-db-coll
    val database: MongoDatabase = client.getDatabase("sample_restaurants")
    val collection: MongoCollection[Document] = database.getCollection("restaurants")
    // end-db-coll

    // start-latched-observer
    case class LatchedObserver() extends Observer[ChangeStreamDocument[Document]] {
      val latch = new CountDownLatch(1)

      override def onSubscribe(subscription: Subscription): Unit = subscription.request(Long.MaxValue) // Request data

      override def onNext(changeDocument: ChangeStreamDocument[Document]): Unit = println(changeDocument)

      override def onError(throwable: Throwable): Unit = {
          println(s"Error: '$throwable")
          latch.countDown()
      }

      override def onComplete(): Unit = latch.countDown()

      def await(): Unit = latch.await()
    }
    // end-latched-observer

    // Monitors and prints changes to the "restaurants" collection
    // start-open-change-stream
    val observer = LatchedObserver()
    collection.watch().subscribe(observer)
    observer.await()
    // end-open-change-stream

    // Updates a document that has a "name" value of "Blarney Castle"
    // start-update-for-change-stream
    val filter = equal("name", "Blarney Castle")
    val update = set("cuisine", "American")

    collection.updateOne(filter, update)
              .subscribe((res: UpdateResult) => println(res),
                        (e: Throwable) => println(s"There was an error: $e"))
    // end-update-for-change-stream

    // Passes a pipeline argument to watch() to monitor only update operations
    // start-change-stream-pipeline
    val observer = LatchedObserver()
    collection.watch(Seq(Aggregates.filter(Filters.in("operationType", "update"))))
    observer.await()
    // end-change-stream-pipeline

    // Passes an options argument to watch() to include the post-image of updated documents
    // start-change-stream-post-image
    val observer = LatchedObserver()
    collection.watch()
              .fullDocument(FullDocument.UPDATE_LOOKUP)
              .subscribe(observer)
    observer.await()
    // end-change-stream-post-image
  }
}