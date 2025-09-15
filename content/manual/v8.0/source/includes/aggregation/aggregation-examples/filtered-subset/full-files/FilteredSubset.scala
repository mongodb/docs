package org.example

import org.mongodb.scala._
import org.mongodb.scala.bson.Document
import org.mongodb.scala.model.{Aggregates, Filters, Sorts}

import java.text.SimpleDateFormat

object FilteredSubset {

  def main(args: Array[String]): Unit = {

    val uri = "<connection string>"
    val mongoClient = MongoClient(uri)
    Thread.sleep(1000)

    val aggDB = mongoClient.getDatabase("agg_tutorials_db")

    // start-insert-persons
    val persons = aggDB.getCollection("persons")

    persons.deleteMany(Filters.empty()).subscribe(
      _ => {},
      e => println("Error: " + e.getMessage),
    )

    val dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss")

    persons.insertMany(Seq(
      Document(
        "person_id" -> "6392529400",
        "firstname" -> "Elise",
        "lastname" -> "Smith",
        "dateofbirth" -> dateFormat.parse("1972-01-13T09:32:07"),
        "vocation" -> "ENGINEER",
        "address" -> Document(
          "number" -> 5625,
          "street" -> "Tipa Circle",
          "city" -> "Wojzinmoj"
        )
      ),
      Document(
        "person_id" -> "1723338115",
        "firstname" -> "Olive",
        "lastname" -> "Ranieri",
        "dateofbirth" -> dateFormat.parse("1985-05-12T23:14:30"),
        "gender" -> "FEMALE",
        "vocation" -> "ENGINEER",
        "address" -> Document(
          "number" -> 9303,
          "street" -> "Mele Circle",
          "city" -> "Tobihbo"
        )
      ),
      Document(
        "person_id" -> "8732762874",
        "firstname" -> "Toni",
        "lastname" -> "Jones",
        "dateofbirth" -> dateFormat.parse("1991-11-23T16:53:56"),
        "vocation" -> "POLITICIAN",
        "address" -> Document(
          "number" -> 1,
          "street" -> "High Street",
          "city" -> "Upper Abbeywoodington"
        )
      ),
      Document(
        "person_id" -> "7363629563",
        "firstname" -> "Bert",
        "lastname" -> "Gooding",
        "dateofbirth" -> dateFormat.parse("1941-04-07T22:11:52"),
        "vocation" -> "FLORIST",
        "address" -> Document(
          "number" -> 13,
          "street" -> "Upper Bold Road",
          "city" -> "Redringtonville"
        )
      ),
      Document(
        "person_id" -> "1029648329",
        "firstname" -> "Sophie",
        "lastname" -> "Celements",
        "dateofbirth" -> dateFormat.parse("1959-07-06T17:35:45"),
        "vocation" -> "ENGINEER",
        "address" -> Document(
          "number" -> 5,
          "street" -> "Innings Close",
          "city" -> "Basilbridge"
        )
      ),
      Document(
        "person_id" -> "7363626383",
        "firstname" -> "Carl",
        "lastname" -> "Simmons",
        "dateofbirth" -> dateFormat.parse("1998-12-26T13:13:55"),
        "vocation" -> "ENGINEER",
        "address" -> Document(
          "number" -> 187,
          "street" -> "Hillside Road",
          "city" -> "Kenningford"
        )
      )
    )).subscribe(
      _ => {},
      e => println("Error: " + e.getMessage),
    )
    // end-insert-persons

    Thread.sleep(1000)

    val pipeline = Seq(
      // start-match
      Aggregates.filter(Filters.equal("vocation", "ENGINEER")),
      // end-match
      // start-sort
      Aggregates.sort(Sorts.descending("dateofbirth")),
      // end-sort
      // start-limit
      Aggregates.limit(3),
      // end-limit
      // start-unset
      Aggregates.unset("_id", "address")
      // end-unset
    )

    // start-run-agg
    persons.aggregate(pipeline)
      .subscribe((doc: Document) => println(doc.toJson()),
        (e: Throwable) => println(s"Error: $e"))
    // end-run-agg

    Thread.sleep(1000)
    mongoClient.close()
  }
}
