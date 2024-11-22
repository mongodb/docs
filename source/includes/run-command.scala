import org.mongodb.scala._

object RunCommand {
  def main(args: Array[String]): Unit = {
    val mongoClient = MongoClient("<connection string>")
    
    // start-db
    val database: MongoDatabase = mongoClient.getDatabase("sample_restaurants")
    // end-db

    // Runs a command that returns information about the deployment
    // start-hello
    database.runCommand(Document("hello" -> 1))
            .subscribe((doc: Document) => ())
    // end-hello

    // Runs a command that returns deployment information and sets a read preference
    // start-readpref
    database.runCommand(Document("hello" -> 1), ReadPreference.secondary())
            .subscribe((doc: Document) => ())
    // end-readpref

    // Runs a command to retrieve database statistics and prints the result
    // start-print-command
    database.runCommand(Document("dbStats" -> 1))
            .subscribe((doc: Document) => println(doc.toJson()),
                      (e: Throwable) => println(s"There was an error: $e"))
    // end-print-command

    // Keep the main thread alive long enough for the asynchronous operations to complete
    Thread.sleep(5000)

    // Close the MongoClient connection
    mongoClient.close()
  }
}