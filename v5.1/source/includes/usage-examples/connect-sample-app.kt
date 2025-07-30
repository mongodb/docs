import com.mongodb.kotlin.client.MongoClient
import org.bson.Document

fun main() {

    // Start example code here

    // End example code here

    val database = mongoClient.getDatabase("admin")

    val command = Document("ping", 1)
    val commandResult = database.runCommand(command)
    println("Pinged your deployment. You successfully connected to MongoDB!")
}