import org.mongodb.scala._
import org.mongodb.scala.model.{ Aggregates, Filters, Accumulators }
import org.mongodb.scala.bson.Document
import com.mongodb.ExplainVerbosity
import org.mongodb.scala.model.Projections
import org.mongodb.scala.model.search._
import org.mongodb.scala.model.search.SearchOptions.searchOptions

object Aggregation {

  def main(args: Array[String]): Unit = {
    val mongoClient = MongoClient("<connection string URI>")

    val database: MongoDatabase = mongoClient.getDatabase("sample_restaurants")
    val collection: MongoCollection[Document] = database.getCollection("restaurants")

    // Retrieves documents with a cuisine value of "Bakery", groups them by "borough", and
    // counts each borough's matching documents
    // start-match-group
    val pipeline = Seq(Aggregates.filter(Filters.equal("cuisine", "Bakery")),
                       Aggregates.group("$borough", Accumulators.sum("count", 1))
    )

    collection.aggregate(pipeline)
              .subscribe((doc: Document) => println(doc.toJson()),
                        (e: Throwable) => println(s"There was an error: $e"))
    // end-match-group

    // Performs the same aggregation operation as above but asks MongoDB to explain it
    // start-explain
    val pipelineToExplain = Seq(Aggregates.filter(Filters.equal("cuisine", "Bakery")),
                       Aggregates.group("$borough", Accumulators.sum("count", 1))
    )

    collection.aggregate(pipelineToExplain)
              .explain(ExplainVerbosity.EXECUTION_STATS)
              .subscribe((doc: Document) => println(doc.toJson()),
                        (e: Throwable) => println(s"There was an error: $e"))
    // end-explain

    // start-atlas-search
    val operator = SearchOperator.text(SearchPath.fieldPath("name"), "Salt")
    val options = searchOptions().index("<search index name>")
    
    val pipeline = Seq(Aggregates.search(operator, options),
                       Aggregates.project(Projections.include("name")))

    collection.aggregate(pipeline)
              .subscribe((doc: Document) => println(doc.toJson()),
                        (e: Throwable) => println(s"There was an error: $e"))
    // end-atlas-search

    Thread.sleep(1000)
    mongoClient.close()
  }
}
