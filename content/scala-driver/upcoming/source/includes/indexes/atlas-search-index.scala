import org.mongodb.scala._
import org.mongodb.scala.model.SearchIndexModel
import com.mongodb.client.model.SearchIndexType

import java.util.concurrent.TimeUnit
import scala.concurrent.Await
import scala.concurrent.duration.Duration

object AtlasSearchIndexes {

  def main(args: Array[String]): Unit = {
    val mongoClient = MongoClient("<connection string URI>")

    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection("movies")

    {
      // start-create-search-index
      val index = Document("mappings" -> Document("dynamic" -> true))
      collection.createSearchIndex("<index name>", index)
                .subscribe((result: String) => ())

      // end-create-search-index
    }

    {
      // start-create-search-indexes
      val searchIdxMdl = SearchIndexModel(
        Option("searchIdx"),
        Document("analyzer" -> "lucene.standard", "mappings" -> Document("dynamic" -> true)),
        Option(SearchIndexType.search())
      )
      val vectorSearchIdxMdl = SearchIndexModel(
        Option("vsIdx"),
        Document(
          "fields" -> List(
            Document("type" -> "vector", "path" -> "embeddings", "numDimensions" -> 1536, "similarity" -> "dotProduct")
          )
        ),
        Option(SearchIndexType.vectorSearch())
      )
      collection.createSearchIndexes(List(searchIdxMdl, vectorSearchIdxMdl))
                .subscribe((result: String) => ())
      // end-create-search-indexes
    }

    {
      // start-list-search-indexes
      collection.listSearchIndexes()
                .subscribe((result: Document) => println(result.toJson()))
      // end-list-search-indexes
    }

    {
      // start-update-search-indexes
      val updateIndex = Document("mappings" -> Document("dynamic" -> false))
      collection.updateSearchIndex("<index to update>", updateIndex)
                .subscribe((result: Unit) => ())
      // end-update-search-indexes
    }

    // start-drop-search-index
    collection.dropSearchIndex("<index name>")
              .subscribe((result: Unit) => ())    
    // end-drop-search-index

    Thread.sleep(1000)
    mongoClient.close()
  }
}
