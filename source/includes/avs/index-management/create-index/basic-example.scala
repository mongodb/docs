import org.mongodb.scala._
import org.mongodb.scala.model._
import com.mongodb.client.model.SearchIndexType

class VectorIndex {
  def createIndex(): Unit = {
    val collection =
      MongoClient("<connection-string>")
        .getDatabase("sample_mflix")
        .getCollection("embedded_movies")
    val indexName = "vector_index"
    val indexNameAsOption = Option(indexName)
    val indexDefinition = Document(
      "fields" -> List(
        Document(
          "type" -> "vector",
          "path" -> "plot_embedding",
          "numDimensions" -> 1536,
          "similarity" -> "dotProduct",
          "quantization" -> "scalar"
        )
      )
    )
    val indexType = Option(SearchIndexType.vectorSearch())
    val indexModel: SearchIndexModel = SearchIndexModel(
      indexNameAsOption, indexDefinition, indexType
    )
    collection.createSearchIndexes(List(indexModel)).foreach { doc => println(s"New search index named $doc is building.") }
    Thread.sleep(2000)
    println("Polling to check if the index is ready. This may take up to a minute.")
    var indexReady = false
    while (!indexReady) {
      val searchIndexes = collection.listSearchIndexes()
      searchIndexes.foreach { current =>
        val document = current.toBsonDocument()
        val name = document.get("name").asString().getValue
        val queryable = document.get("queryable").asBoolean().getValue
        if (name == indexName && queryable) {
          indexReady = true
        }
      }
      if (!indexReady) {
        Thread.sleep(5000)
      }
    }
    println(s"$indexName is ready for querying.")
  }
}