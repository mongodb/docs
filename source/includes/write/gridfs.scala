import org.mongodb.scala._
import org.mongodb.scala.bson.{Document, ObjectId}
import org.mongodb.scala.gridfs.GridFSBucket
import org.mongodb.scala.model._

import java.nio.ByteBuffer
import java.nio.charset.StandardCharsets
import java.util.concurrent.TimeUnit
import scala.concurrent.Await
import scala.concurrent.duration.Duration

object GridFS {

  def main(args: Array[String]): Unit = {
    val mongoClient = MongoClient("<connection string URI>")

    // start-db-coll
    val database: MongoDatabase = mongoClient.getDatabase("sample_gridfs")
    // end-db-coll

    // start-create-bucket
    val bucket = GridFSBucket(database)
    // end-create-bucket

    // start-create-custom-bucket
    val filesBucket = GridFSBucket(database, "files")
    // end-create-custom-bucket

    {
      // start-upload-files
      // Get the input stream
      val observableToUploadFrom = Observable(
        Seq(ByteBuffer.wrap("MongoDB Tutorial".getBytes(StandardCharsets.UTF_8)))
      )

      // Create some custom options
      val options = new GridFSUploadOptions()
        .chunkSizeBytes(358400)
        .metadata(Document("type" -> "presentation"))

      // Upload the file
      val fileIdObservable = filesBucket.uploadFromObservable("mongodb-tutorial", observableToUploadFrom, options)
      val fileId = Await.result(fileIdObservable.toFuture(), Duration(10, TimeUnit.SECONDS))
      println(s"File uploaded with id: ${fileId.toHexString}")
      // end-upload-files
    }

    {
      // start-retrieve-file-info
      val filesObservable = filesBucket.find()
      val results = Await.result(filesObservable.toFuture(), Duration(10, TimeUnit.SECONDS))
      results.foreach(file => println(s" - ${file.getFilename}"))
      // end-retrieve-file-info
    }

    {
      // start-retrieve-file-info-filter
      val filesObservable = filesBucket.find(Filters.equal("metadata.contentType", "image/png"))
      val results = Await.result(filesObservable.toFuture(), Duration(10, TimeUnit.SECONDS))
      results.foreach(file => println(s" - ${file.getFilename}"))
      // end-retrieve-file-info-filter
    }

    {
      // start-download-files-id
      val downloadObservable = filesBucket.downloadToObservable("<example file ID>")
      val downloadById = Await.result(downloadObservable.toFuture(), Duration(10, TimeUnit.SECONDS))
      // end-download-files-id
    }

    {
      // start-download-files-name
      val downloadObservable = filesBucket.downloadToObservable("mongodb-tutorial")
      val downloadById = Await.result(downloadObservable.toFuture(), Duration(10, TimeUnit.SECONDS))
      // end-download-files-name
    }

    {
      // start-rename-files
      val renameObservable = filesBucket.rename("<example file ID>", "mongodbTutorial")
      Await.result(renameObservable.toFuture(), Duration(10, TimeUnit.SECONDS))
      // end-rename-files
    }

    {
      // start-delete-files
      val deleteObservable = filesBucket.delete("<example file ID>")
      Await.result(deleteObservable.toFuture(), Duration(10, TimeUnit.SECONDS))
      // end-delete-files
    }

    Thread.sleep(1000)
    mongoClient.close()
  }
}
