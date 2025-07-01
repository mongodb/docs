// Start AWS Lambda Example 1
import com.mongodb.kotlin.client.MongoClient
import com.mongodb.kotlin.client.MongoDatabase
import org.bson.Document
import com.amazonaws.services.lambda.runtime.Context
import com.amazonaws.services.lambda.runtime.RequestHandler

class ExampleAwsLambdaHandler : RequestHandler<String, String> {
    private val client: MongoClient = MongoClient.create(System.getenv("MONGODB_URI"))

    override fun handleRequest(input: String, context: Context): String {
        val database: MongoDatabase = client.getDatabase("admin")
        val command = Document("ping", 1)
        val result = database.runCommand(command)
        return result.toJson()
    }
}
// End AWS Lambda Example 1
