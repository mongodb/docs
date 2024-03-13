import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document

fun main() {
    // connect to Atlas cluster
    val uri = "<connection-string>"
    val mongoClient = MongoClient.create(uri)

    // set namespace
    val database = mongoClient.getDatabase("sample_training")
    val collection = database.getCollection<Document>("companies")

    runBlocking {
        // define pipeline
        val pipeline1 = listOf(
            Document("\$search", Document("text",
                Document("query", "Mobile")
                    .append("path", "name"))), Document("\$project", Document("score",
                Document("\$meta", "searchScore"))
                .append("_id", 0)
                .append("number_of_employees", 1)
                .append("founded_year", 1)
                .append("name", 1)), Document("\$set", Document("source", "companies")),
            Document("\$limit", 3)
        )

        val pipeline2 = listOf(
            Document(
                "\$search", Document(
                    "text",
                    Document("query", "Mobile")
                        .append("path", "business_name")
                )
            ),
            Document("\$set", Document("source", "inspections")),
            Document(
                "\$project", Document(
                    "score",
                    Document("\$meta", "searchScore")
                )
                    .append("source", 1)
                    .append("_id", 0)
                    .append("business_name", 1)
                    .append("address", 1)
            ),
            Document("\$limit", 3),
            Document("\$sort", Document("score", -1))
        )

        val unionWithStage: MutableList<Document> = ArrayList()
        val unionWith = Document(
            "\$unionWith", Document("coll", "inspections")
                .append("pipeline", pipeline2)
        )
        unionWithStage.add(unionWith)
        val finalPipeline: MutableList<Document> = ArrayList(pipeline1)
        finalPipeline.addAll(unionWithStage)

        // run pipeline and print results
        val resultsFlow = collection.aggregate<Document>(finalPipeline)
        resultsFlow.collect { println(it) }

    }
    mongoClient.close()
}
