import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.model.*
import com.mongodb.kotlin.client.*
import org.bson.Document

fun main() {
    val uri = "<connection string URI>"

    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .retryWrites(true)
        .build()

    // Create a new client and connect to the server
    val mongoClient = MongoClient.create(settings)
    val database = mongoClient.getDatabase("<database name>")
    val collection = database.getCollection<Document>("<collection name>")

    // start-insert-one
    val result = collection.insertOne(Document("<field name>", "<value>"))
    print(result.insertedId)
    // end-insert-one

    // start-insert-multiple
    val docList = listOf(
        Document("<field name>", "<value>"),
        Document("<field name>", "<value>")
    )

    val result = collection.insertMany(docList)
    print(result.insertedIds)
    // end-insert-multiple

    // start-update-one
    val query = Filters.eq("<field to match>", "<value to match>")
    val update = Updates.set("<field name>", "<value>")

    val result = collection.updateOne(query, update)
    print(result.modifiedCount)
    // end-update-one

    // start-update-multiple
    val query = Filters.eq("<field to match>", "<value to match>")
    val update = Updates.set("<field name>", "<value>")

    val result = collection.updateMany(query, update)
    print(result.modifiedCount)
    // end-update-multiple

    // start-replace-one
    val query = Filters.eq("<field to match>", "<value to match>")
    val replacement = Document("<new document field name>", "<new document value>")

    val result = collection.replaceOne(query, replacement)
    print(result.modifiedCount)
    // end-replace-one

    // start-delete-one
    val query = Filters.eq("<field to match>", "<value to match>")

    val result = collection.deleteOne(query)
    print(result.deletedCount)
    // end-delete-one

    // start-delete-multiple
    val query = Filters.eq("<field to match>", "<value to match>")

    val result = collection.deleteMany(query)
    print(result.deletedCount)
    // end-delete-multiple

    // start-bulk-write
    val bulkOps = listOf(
        InsertOneModel(Document("<field name>", "<value>")),
        UpdateOneModel(
            Filters.eq("<field to match>", "<value to match>"),
            Updates.set("<field name>", "<value>")),
        DeleteOneModel(Filters.eq("<field to match>", "<value to match>"))
    )

    val result = collection.bulkWrite(bulkOps)
    print(result)
    // end-bulk-write
}
