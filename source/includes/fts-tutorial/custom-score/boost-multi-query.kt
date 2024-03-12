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

    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Document>("movies")

    runBlocking {
        // define pipeline
        val agg = Document(
            "\$search",
            Document("index", "compound-query-custom-score-tutorial")
                .append(
                    "compound",
                    Document(
                        "must", listOf(
                            Document(
                                "text",
                                Document("path", "genres")
                                    .append("query", "comedy")
                                    .append(
                                        "score",
                                        Document(
                                            "boost",
                                            Document("value", 9)
                                        )
                                    )
                            ),
                            Document(
                                "text",
                                Document("path", "title")
                                    .append("query", "snow")
                                    .append(
                                        "score",
                                        Document(
                                            "boost",
                                            Document("value", 5)
                                        )
                                    )
                            )
                        )
                    )
                        .append(
                            "should", listOf(
                                Document(
                                    "range",
                                    Document("path", "year")
                                        .append("gte", 2013)
                                        .append("lte", 2015)
                                        .append(
                                            "score",
                                            Document(
                                                "boost",
                                                Document("value", 3)
                                            )
                                        )
                                )
                            )
                        )
                )
        )

        // run query and print results
        val resultsFlow = collection.aggregate<Document>(
            listOf(
                agg,
                limit(10),
                project(fields(
                    excludeId(),
                    include("title", "year","genres"),
                    computed("score", Document("\$meta", "searchScore"))
                ))
            )
        )
        resultsFlow.collect { println(it) }
    }
    mongoClient.close()
}
