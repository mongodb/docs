import com.mongodb.client.model.Aggregates.limit
import com.mongodb.client.model.Aggregates.project
import com.mongodb.client.model.Projections.*
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document

fun main() {
    // connect to your Atlas cluster
    val uri = "<connection-string>"
    val mongoClient = MongoClient.create(uri)

    // set namespace
    val database = mongoClient.getDatabase("sample_airbnb")
    val collection = database.getCollection<Document>("listingsAndReviews")

    runBlocking {
        // define pipeline
        val agg = Document(
            "\$search",
            Document("index", "geo-json-tutorial")
                .append(
                    "compound",
                    Document(
                        "must", listOf(
                            Document(
                                "geoWithin",
                                Document(
                                    "geometry",
                                    Document("type", "Polygon")
                                        .append(
                                            "coordinates",
                                            listOf(
                                                listOf(
                                                    listOf(-161.323242, 22.512557),
                                                    listOf(-152.446289, 22.065278),
                                                    listOf(-156.09375, 17.811456),
                                                    listOf(-161.323242, 22.512557)
                                                )
                                            )
                                        )
                                )
                                    .append("path", "address.location")
                            )
                        )
                    )
                        .append(
                            "should", listOf(
                                Document(
                                    "text",
                                    Document("path", "property_type")
                                        .append("query", "Condominium")
                                )
                            )
                        )
                )
        )
        
        // run pipeline and print results
        val resultsFlow = collection.aggregate<Document>(
            listOf(
                agg,
                limit(10),
                project(fields(
                    excludeId(),
                    include("name", "address", "property_type"),
                    computed("score", Document("\$meta", "searchScore"))
                ))
            )
        )
        resultsFlow.collect { println(it) }
    }
    mongoClient.close()
}
