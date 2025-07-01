import com.mongodb.client.model.Aggregates.limit
import com.mongodb.client.model.Aggregates.project
import com.mongodb.client.model.Projections.*
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document
import java.util.*

fun main() {
    // connect to your Atlas cluster
    val uri = "<connection-string>"
    val mongoClient = MongoClient.create(uri)

    // set namespace
    val database = mongoClient.getDatabase("sample_analytics")
    val collection = database.getCollection<Document>("customers")

    runBlocking {
        // define pipeline
        val agg = Document(
            "\$lookup",
            Document("from", "accounts")
                .append("localField", "accounts")
                .append("foreignField", "account_id")
                .append("as", "purchases")
                .append(
                    "pipeline", Arrays.asList(
                        Document(
                            "\$search",
                            Document("index", "lookup-with-search-tutorial")
                                .append(
                                    "compound",
                                    Document(
                                        "must", Arrays.asList(
                                            Document(
                                                "queryString",
                                                Document("defaultPath", "products")
                                                    .append("query", "products: (CurrencyService AND InvestmentStock)")
                                            )
                                        )
                                    )
                                        .append(
                                            "should", Arrays.asList(
                                                Document(
                                                    "range",
                                                    Document("path", "limit")
                                                        .append("gte", 5000)
                                                        .append("lte", 10000)
                                                )
                                            )
                                        )
                                )
                        ),
                        Document("\$limit", 5),
                        Document(
                            "\$project",
                            Document("_id", 0)
                                .append("address", 0)
                                .append("birthdate", 0)
                                .append("username", 0)
                                .append("tier_and_details", 0)
                        )
                    )
                )
        )

        // run pipeline and print results
        val resultsFlow = collection.aggregate<Document>(
            listOf(
                agg,
                limit(5),
                project(fields(excludeId(), include("name", "email", "active", "accounts", "purchases")))
            )
        )
        resultsFlow.collect { println(it) }
    }
    mongoClient.close()
}

