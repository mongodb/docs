import com.mongodb.client.model.Filters
import com.mongodb.client.model.Filters.*
import com.mongodb.client.model.FindOneAndUpdateOptions
import com.mongodb.client.model.ReturnDocument
import com.mongodb.client.model.Updates
import com.mongodb.kotlin.client.MongoClient
import org.bson.BsonType
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.codecs.pojo.annotations.BsonProperty
import org.bson.codecs.pojo.annotations.BsonRepresentation
import org.bson.types.ObjectId
import java.time.LocalDate

// start-data-class
data class DataStorage(val productName: String, val capacity: Double)
// end-data-class

// start-ann-class
data class NetworkDevice(
    @BsonId
    @BsonRepresentation(BsonType.OBJECT_ID)
    val deviceId: String,
    val name: String,
    @BsonProperty("type")
    val deviceType: String
)
// end-ann-class

// start-recur-class
data class DataClassTree(
    val content: String,
    val left: DataClassTree?,
    val right: DataClassTree?
)
// end-recur-class


fun main() {
    val uri = "<connection string>"

    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_db")

    // start-insert
    val collection = database.getCollection<DataStorage>("data_storage")
    val record = DataStorage("tape", 5.0)
    collection.insertOne(record)
    // end-insert

    // start-retrieve
    val result = collection.find().firstOrNull()
    println("${result}")
    // end-retrieve

    // start-alt-retrieve
    // Define a data class for returned documents
    data class DataStorageAlt(
        val productName: String,
        val capacity: Double,
        val releaseDate: LocalDate
    )

    val filter = Filters.eq(DataStorage::productName.name, "tape")
    val update = Updates.currentDate("releaseDate")
    val options = FindOneAndUpdateOptions().returnDocument(ReturnDocument.AFTER)

    // Specify the class for returned documents
    val newResult = collection
        .withDocumentClass<DataStorageAlt>()
        .findOneAndUpdate(filter, update, options)

    println("Document after update:\n${newResult}")
    // end-alt-retrieve

    // start-insert-ann
    val ntwkColl = database.getCollection<NetworkDevice>("network_devices")
    val deviceId = ObjectId().toHexString()
    val device = NetworkDevice(deviceId, "Enterprise Wi-fi", "router")
    ntwkColl.insertOne(device)
    // end-insert-ann

    // start-retr-ann
    val annotatedClassResult = ntwkColl.find().toList()
    println(annotatedClassResult)
    // end-retr-ann

    val treeColl1 = database.getCollection<DataClassTree>("language_trees")
    val exampleTree = DataClassTree(
        "indo-european",
        DataClassTree(
            "germanic",
            DataClassTree("german", null, DataClassTree("high german", null, null)),
            DataClassTree(
                "norse", DataClassTree("swedish", null, null),
                DataClassTree("danish", null, null)
            )
        ),
        DataClassTree(
            "romance",
            DataClassTree("spanish", null, null),
            DataClassTree("french", null, null)
        )
    )
    treeColl1.insertOne(exampleTree)

    // start-tree-retrieve
    val treeColl = database.getCollection<DataClassTree>("language_trees")

    val treeFilter = Filters.eq("left.left.right.content", "high german")
    val treeResult = treeColl.find(treeFilter).firstOrNull()
    println(treeResult)
    // end-tree-retrieve

}