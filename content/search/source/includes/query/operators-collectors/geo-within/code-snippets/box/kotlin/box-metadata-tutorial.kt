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
    val collection = database.getCollection<Document>("listingsAndReviews")

    runBlocking {
        // define query
        val agg = Document(
            "\$searchMeta",
            Document("facet",
                Document("operator",
                    Document("geoWithin",
                        Document("path", "address.location")
                            .append("box",
                                Document("bottomLeft",
                                    Document("type", "Point")
                                        .append("coordinates", listOf(112.467, -55.050)))
                                .append("topRight",
                                    Document("type", "Point")
                                        .append("coordinates", listOf(168.000, -9.133))))))
                .append("facets",
                    Document("propertyTypeFacet",
                        Document("type", "string")
                            .append("path", "property_type"))))
        )

        // run query and print results
        val resultsFlow = collection.aggregate<Document>(listOf(agg))
        resultsFlow.collect { println(it) }
    }
    mongoClient.close()
}
