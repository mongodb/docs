package quickstart

import org.mongodb.scala._
import org.mongodb.scala.model.Filters._
import Helpers._

object Main {

  def main(args: Array[String]): Unit = {

    val mongoClient = MongoClient("<connection string>")

    val database: MongoDatabase = 
       mongoClient.getDatabase("sample_mflix")
    val collection: MongoCollection[Document] = 
       database.getCollection("movies")

    val filter = equal("title", "The Shawshank Redemption")
    collection.find(filter).printResults()

    mongoClient.close()
    
  }

}
