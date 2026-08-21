import org.mongodb.scala._
import org.mongodb.scala.bson.Document
import org.mongodb.scala.model.Filters.{empty, equal}
import org.mongodb.scala.model.Sorts.descending
import org.mongodb.scala.model.Updates.{combine, set}
import org.mongodb.scala.model.{FindOneAndDeleteOptions, FindOneAndReplaceOptions, FindOneAndUpdateOptions, ReturnDocument}
import scala.concurrent.Await
import scala.concurrent.duration.Duration
import java.util.concurrent.TimeUnit

object CompoundOperations {

  def main(args: Array[String]): Unit = {
    val mongoClient = MongoClient("<connection string URI>")

    // start-db-coll
    val database: MongoDatabase = mongoClient.getDatabase("compound_operations")
    val collection: MongoCollection[Document] = database.getCollection("example")
    val hotelCollection: MongoCollection[Document] = database.getCollection("rooms")
    // end-db-coll

    // start-find-one-update
    val filter = equal("color", "green")
    val update = set("food", "pizza")
    val options = new FindOneAndUpdateOptions()
      .upsert(true)
      .maxTime(5, TimeUnit.SECONDS)

    val observable: SingleObservable[Document] =
      collection.findOneAndUpdate(filter, update, options)

    observable.subscribe(new Observer[Document] {
      override def onNext(doc: Document): Unit = println(doc.toJson())
      override def onError(e: Throwable): Unit = println(s"Failed: ${e.getMessage}")
      override def onComplete(): Unit = println("Completed")
    })
    // end-find-one-update

    // start-find-one-replace
    val replaceFilter = equal("color", "green")
    val replacement = Document(
      "music" -> "classical",
      "color" -> "green"
    )
    val replaceOptions = new FindOneAndReplaceOptions()
      .returnDocument(ReturnDocument.AFTER)

    val replaceObservable: SingleObservable[Document] =
      collection.findOneAndReplace(replaceFilter, replacement, replaceOptions)

    replaceObservable.subscribe(new Observer[Document] {
      override def onNext(doc: Document): Unit = println(doc.toJson())
      override def onError(e: Throwable): Unit = println(s"Failed: ${e.getMessage}")
      override def onComplete(): Unit = println("Completed")
    })
    // end-find-one-replace

    // start-find-one-delete
    val deleteOptions = new FindOneAndDeleteOptions()
      .sort(descending("_id"))

    val deleteObservable: SingleObservable[Document] =
      collection.findOneAndDelete(empty(), deleteOptions)

    deleteObservable.subscribe(new Observer[Document] {
      override def onNext(doc: Document): Unit = println(doc.toJson())
      override def onError(e: Throwable): Unit = println(s"Failed: ${e.getMessage}")
      override def onComplete(): Unit = println("Completed")
    })
    // end-find-one-delete

    // start-unsafe
    def bookARoomUnsafe(guestName: String): Unit = {
      val availableFilter = equal("reserved", false)
      val findResults = Await.result(
        hotelCollection.find(availableFilter).first().toFuture(),
        Duration(10, TimeUnit.SECONDS)
      )

      if (Option(findResults).isEmpty) {
        println(s"Sorry, we are booked, $guestName")
        return
      }

      val room = findResults
      val roomName = room.getString("room")
      println(s"You got the $roomName, $guestName")

      val reserveUpdate = combine(
        set("reserved", true),
        set("guest", guestName)
      )
      val roomFilter = equal("_id", room.get("_id").get)
      Await.result(
        hotelCollection.updateOne(roomFilter, reserveUpdate).toFuture(),
        Duration(10, TimeUnit.SECONDS)
      )
    }
    // end-unsafe

    // start-safe
    def bookARoomSafe(guestName: String): Unit = {
      val reserveUpdate = combine(
        set("reserved", true),
        set("guest", guestName)
      )
      val availableFilter = equal("reserved", false)
      val room: Document = Await.result(
        hotelCollection.findOneAndUpdate(availableFilter, reserveUpdate).toFuture(),
        Duration(10, TimeUnit.SECONDS)
      )

      if (Option(room).isEmpty) {
        println(s"Sorry, we are booked, $guestName")
        return
      }

      val roomName = room.getString("room")
      println(s"You got the $roomName, $guestName")
    }
    // end-safe

    Thread.sleep(1000)
    mongoClient.close()
  }
}
