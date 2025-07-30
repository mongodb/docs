import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Projections
import com.mongodb.kotlin.client.MongoClient
import org.bson.Document
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId

// start-user-class
data class User(
    @BsonId val id: ObjectId,
    val gender: String,
    val age: Int,
    val email: String
)
// end-user-class

// start-result-class
data class Email(
    val email: String
)
// end-result-class

fun main() {
    val uri = "<connection string URI>"

    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .retryWrites(true)
        .build()

    val mongoClient = MongoClient.create(settings)
    val database = mongoClient.getDatabase("sample_restaurants")
    val collection = database.getCollection<User>("restaurants")

    // start-find
    val filter = Document("gender", "female").append("age", Document("\$gt", 29))
    val projection = Document("_id", 0).append("email", 1)
    val results = collection.find<Email>(filter).projection(projection)
    // end-find

    // start-find-builders
    val filter = Filters.and(
        Filters.eq(User::gender.name, "female"),
        Filters.gt(User::age.name, 29)
    )

    val projection = Projections.fields(
        Projections.excludeId(),
        Projections.include("email")
    )

    val results = collection.find<Email>(filter).projection(projection)
    // end-find-builders
}

