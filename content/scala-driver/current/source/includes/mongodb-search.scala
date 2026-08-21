import org.mongodb.scala._
import org.mongodb.scala.model.Aggregates
import org.mongodb.scala.bson.Document
import org.mongodb.scala.model.Projections
import org.mongodb.scala.model.search._
import org.mongodb.scala.model.search.SearchOptions.searchOptions
import org.mongodb.scala.model.search.SearchPath.fieldPath
import scala.jdk.CollectionConverters._
import scala.concurrent.Await
import scala.concurrent.duration._

object MongoDBSearch {

  def main(args: Array[String]): Unit = {
    val mongoClient = MongoClient("<connection string URI>")

    val database: MongoDatabase =
      mongoClient.getDatabase("sample_mflix")
    val collection: MongoCollection[Document] =
      database.getCollection("movies")

    {
      // start-search-query
      val operator = SearchOperator.text(
        SearchPath.fieldPath("title"), "Alabama")
      val options = searchOptions().index("<search index name>")

      val pipeline = Seq(
        Aggregates.search(operator, options),
        Aggregates.project(Projections.include("title"))
      )

      try {
        Await
          .result(collection.aggregate(pipeline).toFuture(), 20.seconds)
          .foreach((doc: Document) => println(doc.toJson()))
      } catch {
        case e: Throwable => println(s"There was an error: $e")
      }
      // end-search-query
    }

    {
      // start-search-meta
      try {
        Await
          .result(
            collection.aggregate(Seq(
              Aggregates.searchMeta(
                SearchOperator.near(2010, 1, SearchPath.fieldPath("year")))
            )).toFuture(),
            20.seconds
          )
          .foreach((doc: Document) => println(doc.toJson()))
      } catch {
        case e: Throwable => println(s"There was an error: $e")
      }
      // end-search-meta
    }

    {
      // start-compound-query
      val searchStage = Aggregates.search(
        SearchOperator.compound()
          .must(
            Iterable(
              SearchOperator.in(fieldPath("genres"), List("Comedy")),
              SearchOperator.phrase(fieldPath("fullplot"), "new york"),
              SearchOperator.numberRange(fieldPath("year")).gtLt(1950, 2000),
              SearchOperator.wildcard("Love *", fieldPath("title")),
            ).asJava
          )
      )

      val projectStage = Aggregates.project(
        Projections.include("title", "year", "genres"))

      try {
        Await
          .result(
            collection.aggregate(Seq(searchStage, projectStage)).toFuture(),
            20.seconds
          )
          .foreach((doc: Document) => println(doc.toJson()))
      } catch {
        case e: Throwable => println(s"There was an error: $e")
      }
      // end-compound-query
    }

    mongoClient.close()
  }
}
