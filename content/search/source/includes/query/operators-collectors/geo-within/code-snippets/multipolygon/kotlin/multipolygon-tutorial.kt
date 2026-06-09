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
            "\$search",
            Document("geoWithin",
                Document("geometry",
                    Document("type", "MultiPolygon")
                        .append("coordinates", listOf(
                            listOf(
                                listOf(
                                    listOf(-157.8412413882, 21.2882235819),
                                    listOf(-157.8607925468, 21.2962046205),
                                    listOf(-157.8646640634, 21.3077019651),
                                    listOf(-157.862776699, 21.320776283),
                                    listOf(-157.8341758705, 21.3133826738),
                                    listOf(-157.8349985678, 21.3000822569),
                                    listOf(-157.8412413882, 21.2882235819)
                                )
                            ),
                            listOf(
                                listOf(
                                    listOf(-157.852898124, 21.301208833),
                                    listOf(-157.8580050499, 21.3050871833),
                                    listOf(-157.8587346108, 21.3098050385),
                                    listOf(-157.8508811028, 21.3119240258),
                                    listOf(-157.8454308541, 21.30396767),
                                    listOf(-157.852898124, 21.301208833)
                                )
                            )
                        )))
                .append("path", "address.location"))
        )

        // run query and print results
        val resultsFlow = collection.aggregate<Document>(
            listOf(
                agg,
                limit(3),
                project(fields(excludeId(), include("name", "address")))
            )
        )
        resultsFlow.collect { println(it) }
    }
    mongoClient.close()
}
