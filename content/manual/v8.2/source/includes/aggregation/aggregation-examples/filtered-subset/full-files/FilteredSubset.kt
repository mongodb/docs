package org.example

import com.mongodb.client.model.Aggregates
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Sorts
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable
import org.bson.Document
import org.bson.conversions.Bson

// start-data-classes
@Serializable
data class Address(
    val number: Int,
    val street: String,
    val city: String
)

@Serializable
data class Person(
    val personID: String,
    val firstname: String,
    val lastname: String,
    @Contextual val dateOfBirth: LocalDateTime,
    val vocation: String,
    val address: Address,
    val gender: String? = null
)
// end-data-classes

suspend fun main() {
    val uri = "<connection string>"

    MongoClient.create(uri).use { mongoClient ->
        val aggDB = mongoClient.getDatabase("agg_tutorials_db")
        // start-insert-persons
        val persons = aggDB.getCollection<Person>("persons")
        persons.deleteMany(Filters.empty())

        persons.insertMany(
            listOf(
                Person(
                    "6392529400",
                    "Elise",
                    "Smith",
                    LocalDateTime.parse("1972-01-13T09:32:07"),
                    "ENGINEER",
                    Address(5625, "Tipa Circle", "Wojzinmoj")
                ),
                Person(
                    "1723338115",
                    "Olive",
                    "Ranieri",
                    LocalDateTime.parse("1985-05-12T23:14:30"),
                    "ENGINEER",
                    Address(9303, "Mele Circle", "Tobihbo"),
                    "FEMALE"
                ),
                Person(
                    "8732762874",
                    "Toni",
                    "Jones",
                    LocalDateTime.parse("1991-11-23T16:53:56"),
                    "POLITICIAN",
                    Address(1, "High Street", "Upper Abbeywoodington")
                ),
                Person(
                    "7363629563",
                    "Bert",
                    "Gooding",
                    LocalDateTime.parse("1941-04-07T22:11:52"),
                    "FLORIST",
                    Address(13, "Upper Bold Road", "Redringtonville")
                ),
                Person(
                    "1029648329",
                    "Sophie",
                    "Celements",
                    LocalDateTime.parse("1959-07-06T17:35:45"),
                    "ENGINEER",
                    Address(5, "Innings Close", "Basilbridge")
                ),
                Person(
                    "7363626383",
                    "Carl",
                    "Simmons",
                    LocalDateTime.parse("1998-12-26T13:13:55"),
                    "ENGINEER",
                    Address(187, "Hillside Road", "Kenningford")
                )
            )
        )
        // end-insert-persons
        val pipeline = mutableListOf<Bson>()

        // start-match
        pipeline.add(Aggregates.match(Filters.eq(Person::vocation.name, "ENGINEER")))
        // end-match


        // start-sort
        pipeline.add(Aggregates.sort(Sorts.descending(Person::dateOfBirth.name)))
        // end-sort

        // start-limit
        pipeline.add(Aggregates.limit(3))
        // end-limit

        // start-unset
        pipeline.add(Aggregates.unset("_id", Person::address.name))
        // end-unset

        // start-run-agg
        val aggregationResult = persons.aggregate<Document>(pipeline)
        // end-run-agg

        aggregationResult.collect { println(it) }
    }
}
