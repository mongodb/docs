// Start AWS Lambda Example 1
import org.mongodb.scala.{MongoClient, Document}
import scala.concurrent.Await
import scala.concurrent.duration.Duration
import com.amazonaws.services.lambda.runtime.Context
import com.amazonaws.services.lambda.runtime.RequestHandler

class ExampleAwsLambdaHandler extends RequestHandler[String, String] {

    private val client: MongoClient = MongoClient(System.getenv("MONGODB_URI"))

    override def handleRequest(input: String, context: Context): String = {
        val database = client.getDatabase("admin")
        val command = Document("ping" -> 1)
        val futureResult = database.runCommand(command).toFuture()

        val result = Await.result(futureResult, Duration(30, "second"))
        result.toJson()
    }
}
// End AWS Lambda Example 1