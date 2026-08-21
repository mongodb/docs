import org.mongodb.scala._

object LoggerExamples {
  def main(args: Array[String]): Unit = {
    {
      // start-find-first
      val mongoClient = MongoClient("<connection string>")
      val database: MongoDatabase = mongoClient.getDatabase("<database>")
      val collection: MongoCollection[Document] = database.getCollection("<collection>")
      collection.find().first().printHeadResult()
      // end-find-first
    }
    {
      // start-log-error
      import org.slf4j.Logger
      import org.slf4j.LoggerFactory

      val logger: Logger = LoggerFactory.getLogger("MyApp")
      logger.error("Logging an Error")
      // end-log-error
    }
    {
      // start-logger-hierarchy
      import org.slf4j.Logger
      import org.slf4j.LoggerFactory

      val loggerParent: Logger = LoggerFactory.getLogger("parent")
      val loggerChild: Logger = LoggerFactory.getLogger("parent.child")
      // end-logger-hierarchy
    }
    {
      // start-logger-settings
      val mongoClient = MongoClient(
          MongoClientSettings.builder()
              .applyConnectionString(ConnectionString("<your connection string>"))
              .applicationName("<application name>")
              .applyToLoggerSettings(builder =>
                  builder.maxDocumentLength(5000))
              .build())
      // end-logger-settings
    }
  }
}
