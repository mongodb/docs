// Start AWS Lambda Example 1
import com.mongodb.kotlin.client.coroutine.MongoClient
import com.mongodb.kotlin.client.coroutine.MongoDatabase
import org.bson.Document
import kotlinx.coroutines.runBlocking
import com.amazonaws.services.lambda.runtime.Context
import com.amazonaws.services.lambda.runtime.RequestHandler

class ExampleAwsLambdaHandler : RequestHandler<String, String> {
    private val client: MongoClient = MongoClient.create(System.getenv("MONGODB_URI"))

    override fun handleRequest(input: String, context: Context): String = runBlocking {
        val database: MongoDatabase = client.getDatabase("admin")
        val command = Document("ping", 1)
        val result = database.runCommand(command)
        result.toJson()
    }
}
// End AWS Lambda Example 1