import com.mongodb.client.model.Aggregates.group
import com.mongodb.client.model.Aggregates.limit
import com.mongodb.client.model.Aggregates.sort

import com.mongodb.kotlin.client.model.Filters.eq
import com.mongodb.kotlin.client.model.Filters.all
import com.mongodb.kotlin.client.model.Indexes
import com.mongodb.kotlin.client.model.Projections.excludeId
import com.mongodb.kotlin.client.model.Projections.fields
import com.mongodb.kotlin.client.model.Projections.include
import com.mongodb.client.model.Sorts.orderBy
import com.mongodb.kotlin.client.MongoClient
import com.mongodb.kotlin.client.model.Accumulators.avg
import com.mongodb.kotlin.client.model.Sorts

import com.mongodb.kotlin.client.model.Filters.gte
import com.mongodb.kotlin.client.model.Updates.addToSet
import com.mongodb.kotlin.client.model.Updates.combine
import com.mongodb.kotlin.client.model.Updates.max

internal class BuildersDataClassTest {

    // start-data-class
    data class Student(
        val name: String,
        val teachers: List<String>,
        val gradeAverage: Double
    )
    // end-data-class

    fun main() {
        val uri = "<connection string>"

        val mongoClient = MongoClient.create(uri)
        val database = mongoClient.getDatabase("school")
        val collection = database.getCollection<Student>("students")

        // start-filters-data-class
        val student = Student(
            "Sandra Nook",
            listOf("Alvarez", "Gruber"),
            85.7
        )

        // Equivalent equality queries
        Student::name.eq(student.name)
        eq(Student::name, student.name)
        Student::name eq student.name // Infix notation

        // Equivalent array queries
        all(Student::teachers, student.teachers)
        Student::teachers.all(student.teachers)
        Student::teachers all student.teachers // Infix notation
        // end-filters-data-class

        collection.insertOne(student)
        val filter = eq(Student::name, student.name)
        val result = collection.find(filter).firstOrNull()

        // start-indexes-data-class
        val ascendingIdx = Indexes.ascending(Student::name)
        val descendingIdx = Indexes.descending(Student::teachers)

        val ascIdxName = collection.createIndex(ascendingIdx)
        val descIdxName = collection.createIndex(descendingIdx)
        // end-indexes-data-class

        val student = Student(
            "Sandra Nook",
            listOf("Alvarez", "Gruber"),
            85.7
        )
        collection.insertOne(student)

        // start-proj-data-class
        val combinedProj = fields(
            include(Student::name, Student::gradeAverage),
            excludeId()
        )

        collection.find().projection(combinedProj)
        // end-proj-data-class

        data class Result(val name: String, val gradeAverage: Double)
        val result = collection.find<Result>().projection(combinedProj).firstOrNull()

        val student1 = Student(
            "Sandra Nook",
            listOf("Alvarez", "Gruber"),
            85.7
        )
        val student2 = Student(
            "Paolo Sanchez",
            listOf("Gruber", "Piselli"),
            89.3
        )
        collection.insertMany(listOf(student1, student2))

        // start-sorts-data-class
        val sort = orderBy(
            Sorts.descending(Student::gradeAverage),
            Sorts.ascending(Student::name)
        )

        collection.find().sort(sort)
        // end-sorts-data-class

        val students = listOf(
            Student("Sandra Nook", listOf("Alvarez", "Gruber"),85.7),
            Student("Paolo Sanchez", listOf("Gruber", "Piselli"),89.3)
        )
        collection.insertMany(students)

        // start-updates-data-class
        val filter = Student::gradeAverage gte 85.0
        val update = combine(
            addToSet(Student::teachers, "Soto"),
            Student::gradeAverage.max(90.0)
        )
        collection.updateMany(filter, update)
        // end-updates-data-class

        val result = collection.find().firstOrNull()

        val students = listOf(
            Student("Sandra Nook", listOf("Alvarez", "Gruber"),85.7),
            Student("Paolo Sanchez", listOf("Gruber", "Piselli"),89.3),
            Student("Katerina Jakobsen", listOf("Alvarez", "Ender"),97.3),
            Student("Emma Frank", listOf("Piselli", "Harbour"),93.4),
            Student("Qasim Haq", listOf("Gruber", "Harbour"),80.6)
        )
        collection.insertMany(students)

        // start-agg-data-class
        // Data class to store aggregation result
        data class Summary ( val average: Double )

        val pipeline = listOf(
            // Sorts grades from high to low
            sort(Sorts.descending(Student::gradeAverage)),
            // Selects the top 3 students
            limit(3),
            // Calculates the average of their grades and stores value in a Summary instance
            group(null, avg(Summary::average, "\$${Student::gradeAverage.name}"))
        )

        val result = collection.aggregate<Summary>(pipeline)
        // end-agg-data-class

    }
}