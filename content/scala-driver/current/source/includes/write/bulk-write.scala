import org.mongodb.scala._
import org.mongodb.scala.bson.Document
import org.mongodb.scala.model.Filters.equal
import org.mongodb.scala.model.Updates.set
import org.mongodb.scala.model._

object BulkWrite {

  def main(args: Array[String]): Unit = {
    val mongoClient = MongoClient("<connection string URI>")

    // start-db-coll
    val database: MongoDatabase = mongoClient.getDatabase("sample_restaurants")
    val collection: MongoCollection[Document] = database.getCollection("restaurants")
    // end-db-coll

    {
      // start-bulk-insert-one
      val insertOneModel = InsertOneModel(
          Document("name" -> "Blue Moon Grill",
                   "borough" -> "Brooklyn",
                   "cuisine" -> "American")
      )
      // end-bulk-insert-one

      // start-bulk-update-one
      val updateOneFilter = equal("name", "White Horse Tavern")
      val updateOneDoc = set("borough", "Queens")
      val updateOneModel = UpdateOneModel(updateOneFilter, updateOneDoc)
      // end-bulk-update-one

      // start-bulk-update-many
      val updateManyFilter = equal("name", "Wendy's")
      val updateManyDoc = set("cuisine", "Fast food")
      val updateManyModel = UpdateManyModel(updateManyFilter, updateManyDoc)
      // end-bulk-update-many

      // start-bulk-replace-one
      val replaceFilter = equal("name", "Cooper Town Diner")
      val replaceDoc = Document("name" -> "Smith Town Diner",
                                "borough" -> "Brooklyn",
                                "cuisine" -> "American")
      val replaceOneModel = ReplaceOneModel(replaceFilter, replaceDoc)
      // end-bulk-replace-one

      // start-bulk-delete-one
      val deleteOneModel = DeleteOneModel(equal("name", "Morris Park Bake Shop"))
      // end-bulk-delete-one

      // start-bulk-delete-many
      val deleteManyModel = DeleteManyModel(equal("cuisine", "Experimental"))
      // end-bulk-delete-many
    }
    {
      // start-bulk-write-mixed
      val insertOneModel = InsertOneModel(
          Document("name" -> "Red's Pizza",
                   "borough" -> "Brooklyn",
                   "cuisine" -> "Pizzeria")
      )
      val updateOneModel = UpdateOneModel(equal("name", "Moonlit Tavern"), set("borough", "Queens"))
      val deleteManyModel = DeleteManyModel(equal("name", "Crepe"))

      val writes = Seq(insertOneModel, updateOneModel, deleteManyModel)
      val observable = collection.bulkWrite(writes)

      observable.subscribe(
        (result: BulkWriteResult) => println(s"Success: $result"),
        (error: Throwable) => println(s"Error: ${error.getMessage}"),
        () => println("Completed")
      )
      // end-bulk-write-mixed
    }

    {
      val insertOneModel = InsertOneModel(Document("name" -> "Red's Pizza", "borough" -> "Brooklyn", "cuisine" -> "Pizzeria"))
      val updateOneModel = UpdateOneModel(equal("name", "Moonlit Tavern"), set("borough", "Queens"))
      val deleteManyModel = DeleteManyModel(equal("name", "Crepe"))

      val writes = Seq(insertOneModel, updateOneModel, deleteManyModel)

      // start-bulk-write-unordered
      val options = BulkWriteOptions().ordered(false)
      val observable = collection.bulkWrite(writes, options)
      // end-bulk-write-unordered
    }

    Thread.sleep(1000)
    mongoClient.close()
  }
}
