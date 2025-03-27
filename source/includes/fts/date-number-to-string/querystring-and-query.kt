import com.mongodb.client.model.Aggregates.limit
import com.mongodb.client.model.Aggregates.project
import com.mongodb.client.model.Projections.*
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document

fun main() {
    // establish connection and set namespace
    val uri = "<connection-string>"
    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_airbnb")
    val collection = database.getCollection<Document>("airbnb_mat_view")

    runBlocking {
        // define query
        val agg = Document(
            "\$search",
            Document("index", "date-number-fields-tutorial")
                .append(
                    "queryString",
                    Document("defaultPath", "propertyType")
                        .append(
                            "query",
                            "propertyType: (Apartment OR Condominium) AND accommodatesNumber: 4 AND lastScrapedDate: 2019"
                        )
                )
        )

        // run query and print results
        val resultsFlow = collection.aggregate<Document>(
            listOf(
                agg,
                limit(5),
                project(fields(excludeId()))
            )
        )
        resultsFlow.collect { println(it) }
    }
    mongoClient.close()
}
