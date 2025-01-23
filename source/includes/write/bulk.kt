import com.mongodb.client.model.*
import com.mongodb.client.model.Filters.*
import com.mongodb.kotlin.client.MongoClient

// start-data-classes
data class Restaurant(
    val name: String,
    val borough: String,
    val cuisine: String
)

data class Movie(
    val title: String,
    val year: Int
)
// end-data-classes

fun main() {
    val uri = "<connection string>"

    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_restaurants")
    val collection = database.getCollection<Restaurant>("restaurants")

    // start-bulk-insert-one
    val blueMoon = InsertOneModel(Restaurant("Blue Moon Grill", "Brooklyn", "American"))
    // end-bulk-insert-one

    // start-bulk-update-one
    val updateOneFilter = Filters.eq(Restaurant::name.name, "White Horse Tavern")
    val updateOneDoc = Updates.set(Restaurant::borough.name, "Queens")
    val tavernUpdate = UpdateOneModel<Restaurant>(updateOneFilter, updateOneDoc)
    // end-bulk-update-one

    // start-bulk-update-many
    val updateManyFilter = Filters.eq(Restaurant::name.name, "Wendy's")
    val updateManyDoc = Updates.set(Restaurant::cuisine.name, "Fast food")
    val wendysUpdate = UpdateManyModel<Restaurant>(updateManyFilter, updateManyDoc)
    // end-bulk-update-many

    // start-bulk-replace-one
    val replaceFilter = Filters.eq(Restaurant::name.name, "Cooper Town Diner")
    val replaceDoc = Restaurant("Smith Town Diner", "Brooklyn", "American")
    val replacement = ReplaceOneModel(replaceFilter, replaceDoc)
    // end-bulk-replace-one

    // start-bulk-delete-one
    val deleteOne = DeleteOneModel<Restaurant>(Filters.eq(
        Restaurant::name.name,
        "Morris Park Bake Shop"
    ))
    // end-bulk-delete-one

    // start-bulk-delete-many
    val deleteMany = DeleteManyModel<Restaurant>(Filters.eq(
        Restaurant::cuisine.name,
        "Experimental"
    ))
    // end-bulk-delete-many

    // start-bulk-write-mixed
    val insertOneMdl = InsertOneModel(Restaurant("Red's Pizza", "Brooklyn", "Pizzeria"))
    val updateOneMdl = UpdateOneModel<Restaurant>(
        Filters.eq(Restaurant::name.name, "Moonlit Tavern"),
        Updates.set(Restaurant::borough.name, "Queens")
    )
    val deleteManyMdl = DeleteManyModel<Restaurant>(
        Filters.eq(Restaurant::name.name, "Crepe")
    )

    val bulkResult = collection.bulkWrite(
        listOf(insertOneMdl, updateOneMdl, deleteManyMdl)
    )

    println(bulkResult)
    // end-bulk-write-mixed

    val bulkOperations = listOf(insertOneMdl, updateOneMdl, deleteManyMdl)

    // start-bulk-write-unordered
    val opts = BulkWriteOptions().ordered(false)
    collection.bulkWrite(bulkOperations, opts)
    // end-bulk-write-unordered

}

