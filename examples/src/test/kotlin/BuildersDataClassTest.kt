import com.mongodb.client.model.Aggregates.group
import com.mongodb.client.model.Aggregates.limit
import com.mongodb.client.model.Aggregates.sort
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance

import com.mongodb.kotlin.client.model.Filters.eq
import com.mongodb.kotlin.client.model.Filters.all
import com.mongodb.kotlin.client.model.Indexes
import com.mongodb.kotlin.client.model.Projections.excludeId
import com.mongodb.kotlin.client.model.Projections.fields
import com.mongodb.kotlin.client.model.Projections.include
import com.mongodb.client.model.Sorts.orderBy
import com.mongodb.kotlin.client.model.Accumulators.avg
import com.mongodb.kotlin.client.model.Sorts

import com.mongodb.kotlin.client.model.Filters.gte
import com.mongodb.kotlin.client.model.Updates.addToSet
import com.mongodb.kotlin.client.model.Updates.combine
import com.mongodb.kotlin.client.model.Updates.max
import kotlin.test.assertEquals
import kotlin.test.assertTrue

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class BuildersDataClassTest {

    companion object {
        val config = getConfig()
        val client = MongoClient.create(config.connectionUri)
        val database = client.getDatabase("school")

        @AfterAll
        @JvmStatic
        fun afterAll() {
            runBlocking {
                client.close()
            }
        }
    }

    @AfterEach
    fun afterEach() {
        runBlocking {
            database.drop()
        }
    }

    // :snippet-start: data-class
    data class Student(
        val name: String,
        val teachers: List<String>,
        val gradeAverage: Double
    )
    // :snippet-end:


    @Test
    fun filtersTest() = runBlocking {

        val collection = database.getCollection<Student>("students")

        // :snippet-start: filters-data-class
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
        // :snippet-end:

        collection.insertOne(student)
        val filter = eq(Student::name, student.name)
        val result = collection.find(filter).firstOrNull()
        Assertions.assertEquals(student, result)
    }

    @Test
    fun indexesTest() = runBlocking {

        val collection = database.getCollection<Student>("students")

        // :snippet-start: indexes-data-class
        val ascendingIdx = Indexes.ascending(Student::name)
        val descendingIdx = Indexes.descending(Student::teachers)

        val ascIdxName = collection.createIndex(ascendingIdx)
        val descIdxName = collection.createIndex(descendingIdx)
        // :snippet-end:

        assertEquals("name_1", ascIdxName)
    }

    @Test
    fun projectionsTest() = runBlocking {

        val collection = database.getCollection<Student>("students")

        val student = Student(
            "Sandra Nook",
            listOf("Alvarez", "Gruber"),
            85.7
        )
        collection.insertOne(student)

        // :snippet-start: projections-data-class
        val combinedProj = fields(
            include(Student::name, Student::gradeAverage),
            excludeId()
        )

        collection.find().projection(combinedProj)
        // :snippet-end:

        data class Result(val name: String, val gradeAverage: Double)
        val result = collection.find<Result>().projection(combinedProj).firstOrNull()

        if (result != null) {
            assertEquals(85.7, result.gradeAverage)
        }
    }

    @Test
    fun sortsTest() = runBlocking {

        val collection = database.getCollection<Student>("students")

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

        // :snippet-start: sorts-data-class
        val sort = orderBy(
            Sorts.descending(Student::gradeAverage),
            Sorts.ascending(Student::name)
        )

        collection.find().sort(sort)
        // :snippet-end:

        val result = collection.find().sort(sort).firstOrNull()

        if (result != null) {
            assertEquals(89.3, result.gradeAverage)
        }
    }

    @Test
    fun updatesTest() = runBlocking {

        val collection = database.getCollection<Student>("students")

        val students = listOf(
            Student("Sandra Nook", listOf("Alvarez", "Gruber"),85.7),
            Student("Paolo Sanchez", listOf("Gruber", "Piselli"),89.3)
        )
        collection.insertMany(students)

        // :snippet-start: updates-data-class
        val filter = Student::gradeAverage gte 85.0
        val update = combine(
            addToSet(Student::teachers, "Soto"),
            Student::gradeAverage.max(90.0)
        )
        collection.updateMany(filter, update)
        // :snippet-end:

        val result = collection.find().firstOrNull()

        if (result != null) {
            assertTrue("Soto" in result.teachers)
            assertEquals(result.gradeAverage, 90.0)
        }
    }

    @Test
    fun aggregatesTest() = runBlocking {

        val collection = database.getCollection<Student>("students")

        val students = listOf(
            Student("Sandra Nook", listOf("Alvarez", "Gruber"),85.7),
            Student("Paolo Sanchez", listOf("Gruber", "Piselli"),89.3),
            Student("Katerina Jakobsen", listOf("Alvarez", "Ender"),97.3),
            Student("Emma Frank", listOf("Piselli", "Harbour"),93.4),
            Student("Qasim Haq", listOf("Gruber", "Harbour"),80.6)
        )
        collection.insertMany(students)

        // :snippet-start: aggregates-data-class
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
        // :snippet-end:

        val r = result.firstOrNull()
        if (r != null) {
            assertEquals(93.33333333333333, r.average)
        }
    }
}