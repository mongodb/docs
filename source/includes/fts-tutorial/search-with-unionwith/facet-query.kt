import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document
import java.util.*

fun main() {
    // connect to Atlas cluster
    val uri = "<connection-string>"
    val mongoClient = MongoClient.create(uri)

    // set namespace
    val database = mongoClient.getDatabase("sample_training")
    val collection = database.getCollection<Document>("companies")

    runBlocking {
        // define pipeline stages
        val searchStage = Document(
            "\$search", Document(
                "text",
                Document("query", "mobile")
                    .append("path", "name")
                    .append("score", Document("boost", Document("value", 1.6)))
            )
        )

        val projectStage = Document(
            "\$project", Document("score", Document("\$meta", "searchScore"))
                .append("_id", 0)
                .append("number_of_employees", 1)
                .append("founded_year", 1)
                .append("name", 1)
        )

        val addFieldsStage = Document(
            "\$addFields", Document("source", "companies")
                .append("source_count", "$\$SEARCH_META.count.lowerBound")
        )

        val limitStage = Document("\$limit", 3)

        val unionWithStage = Document(
            "\$unionWith", Document("coll", "inspections")
                .append(
                    "pipeline", Arrays.asList(
                        Document(
                            "\$search", Document(
                                "text",
                                Document("query", "mobile")
                                    .append("path", "business_name")
                            )
                        ),
                        Document(
                            "\$project", Document("score", Document("\$meta", "searchScore"))
                                .append("business_name", 1)
                                .append("address", 1)
                                .append("_id", 0)
                        ),
                        Document("\$limit", 3),
                        Document(
                            "\$set", Document("source", "inspections")
                                .append("source_count", "$\$SEARCH_META.count.lowerBound")
                        ),
                        Document("\$sort", Document("score", -1))
                    )
                )
        )

        val facetStage = Document(
            "\$facet", Document("allDocs", Arrays.asList<Any>())
                .append(
                    "totalCount", Arrays.asList(
                        Document(
                            "\$group", Document("_id", "\$source")
                                .append("firstCount", Document("\$first", "\$source_count"))
                        ),
                        Document(
                            "\$project", Document(
                                "totalCount",
                                Document("\$sum", "\$firstCount")
                            )
                        )
                    )
                )
        )

        // run pipeline and print results
        val resultsFlow = collection.aggregate<Document>(
            listOf(
                searchStage,
                projectStage,
                addFieldsStage,
                limitStage,
                unionWithStage,
                facetStage
            )
        )
        resultsFlow.collect { println(it) }

    }
    mongoClient.close()
}
