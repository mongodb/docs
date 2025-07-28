import com.mongodb.client.model.Aggregates.limit
import com.mongodb.client.model.Aggregates.project
import com.mongodb.client.model.Projections.excludeId
import com.mongodb.client.model.Projections.fields
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document

fun main() {
    val uri = "<connection string>"

    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_airbnb")
    val collection = database.getCollection<Document>("airbnb_mat_view")

    runBlocking {
        val agg = Document(
            "\$search",
            Document("index", "date-number-fields-tutorial")
                .append(
                    "queryString",
                    Document("defaultPath", "propertyType")
                        .append(
                            "query",
                            "propertyType: House OR accommodatesNumber: 2 OR lastScrapedDate: 2019 OR maximumNumberOfNights: 30"
                        )
                )
        )

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

