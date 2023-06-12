import com.mongodb.client.model.Accumulators
import com.mongodb.client.model.Aggregates
import com.mongodb.client.model.Field
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Projections
import com.mongodb.client.model.mql.*
import com.mongodb.client.model.mql.MqlValues.current
import com.mongodb.client.model.mql.MqlValues.of
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import org.bson.Document
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Test
import java.time.LocalDate
import kotlin.test.assertEquals
import config.getConfig

class AggExpressionsTest {
    companion object {
        val config = getConfig()
        private val mongoClient = MongoClient.create(config.connectionUri)
        private val database = mongoClient.getDatabase("aggExpressions")

        @AfterAll
        @JvmStatic
        fun afterAll() {
            runBlocking {
                mongoClient.close()
            }
        }
    }

    @Test
    fun arithmeticOpsTest()  = runBlocking {

        data class Entry(val date: LocalDate, val precipitation: Double)

        val collection = database.getCollection<Entry>("weatherData")

        val entries = listOf(
            Entry(LocalDate.of(2021, 6, 24), 5.0),
            Entry(LocalDate.of(2021, 6, 25), 1.4))

        collection.insertMany(entries)

        // :snippet-start: arithmetic-aggregation
        val month = current().getDate("date").month(of("UTC"))
        val precip = current().getInteger("precipitation")

        val resultsFlow = collection.aggregate<Document>( // :remove:
        listOf(
            Aggregates.group(
                month,
                Accumulators.avg("avgPrecipMM", precip.multiply(25.4))
        ))
        // :snippet-end:
        )

        // Uncomment to see output
        // resultsFlow.collect { println(it) }

        val result = resultsFlow.toList()
        assertEquals(1, result.size)
        assertEquals(6, result[0].getInteger("_id"))
        assertEquals(81.28, result[0].getDouble("avgPrecipMM"))

        collection.drop()
    }

    @Test
    fun arrayOpsTest()  = runBlocking {

        data class Showtime(
            val date: String,
            val seats: List<Int>,
            val ticketsBought: Int
        )

        data class Movie(
            val movie: String,
            val showtimes: List<Showtime>,
        )

        val collection = database.getCollection<Movie>("movies")

        val entries = listOf(
            Movie("Hamlet",
                listOf(Showtime("May 14, 2023, 12:00 PM", listOf(20,80),100),
                    Showtime("May 20, 2023, 08:00 PM", listOf(10,40), 34))))

        collection.insertMany(entries)

        // :snippet-start: array-aggregation
        val showtimes = current().getArray<MqlDocument>("showtimes")

        val resultsFlow = collection.aggregate<Document>( // :remove:
        listOf(
            Aggregates.project(
                Projections.fields(
                    Projections.computed("availableShowtimes", showtimes
                        .filter { showtime ->
                            val seats = showtime.getArray<MqlInteger>("seats")
                            val totalSeats = seats.sum { n -> n }
                            val ticketsBought = showtime.getInteger("ticketsBought")
                            val isAvailable = ticketsBought.lt(totalSeats)
                            isAvailable
                        })
        )))
        // :snippet-end:
        )

        // Uncomment to see output
        // resultsFlow.collect { println(it) }

        val result = resultsFlow.toList()
        assertEquals(1, result.size)

        collection.drop()
    }

    @Test
    fun booleanOpsTest()  = runBlocking {

        data class Entry(val location: String, val temperature: Int)

        val collection = database.getCollection<Entry>("tempData")

        val entries = listOf(
            Entry("Randolph, NJ", 100),
            Entry("Seward, AK", 1),
            Entry("Lincoln, NE", 45))

        collection.insertMany(entries)

        // :snippet-start: boolean-aggregation
        val temperature = current().getInteger("temperature")

        val resultsFlow = collection.aggregate<Document>( // :remove:
        listOf(
            Aggregates.project(
                Projections.fields(
                    Projections.computed("extremeTemp", temperature
                        .lt(of(10))
                        .or(temperature.gt(of(95))))
        )))
        // :snippet-end:
        )

        // Uncomment to see output
        // resultsFlow.collect { println(it) }

        val result = resultsFlow.toList()
        assertEquals(3, result.size)
        assertEquals(true, result[0].getBoolean("extremeTemp"))
        assertEquals(true, result[1].getBoolean("extremeTemp"))
        assertEquals(false, result[2].getBoolean("extremeTemp"))

        collection.drop()
    }

    @Test
    fun comparisonOpsTest()  = runBlocking {

        data class Place(val location: String)

        val collection = database.getCollection<Place>("placesData")

        val entries = listOf(
            Place("Delaware"),
            Place("California"))

        collection.insertMany(entries)

        // :snippet-start: comparison-aggregation
        val location = current().getString("location")

        val resultsFlow = collection.aggregate<Document>( // :remove:
        listOf(
            Aggregates.match(
                Filters.expr(location.eq(of("California")))
        ))
        // :snippet-end:
        )

        // Uncomment to see output
        // resultsFlow.collect { println(it) }

        val result = resultsFlow.toList()
        assertEquals(1, result.size)
        assertEquals("California", result[0].getString("location"))

        collection.drop()
    }

    @Test
    fun conditionalOpsTest()  = runBlocking {

        val collection = database.getCollection<Document>("memberData")

        val entries = listOf(
            Document("name", "Sandra K").append("member","Gold"),
            Document("name","Darren I").append("member", true),
            Document("name","Corey P").append("member", false),
            Document("name", "Francine D").append("member", 7),
            Document("name", "Lily A").append("member", listOf("None", "Gold", "Premium"))
        )

        collection.insertMany(entries)

        // :snippet-start: conditional-aggregation
        val member = current().getField("member")

        val resultsFlow = collection.aggregate<Document>( // :remove:
        listOf(
            Aggregates.project(
                Projections.fields(
                    Projections.computed("membershipLevel",
                        member.switchOn{field -> field
                            .isString{s-> s}
                            .isBoolean{b -> b.cond(of("Gold"), of("Guest"))}
                            .isArray { a -> a.last()}
                            .defaults{ d -> of("Guest")}})
        )))
        // :snippet-end:
        )

        // Uncomment to see output
        // resultsFlow.collect { println(it) }

        val result = resultsFlow.toList()
        assertEquals(5, result.size)
        assertEquals("Gold", result[0].getString("membershipLevel"))
        assertEquals("Gold", result[1].getString("membershipLevel"))
        assertEquals("Guest", result[2].getString("membershipLevel"))
        assertEquals("Guest", result[3].getString("membershipLevel"))
        assertEquals("Premium", result[4].getString("membershipLevel"))

        collection.drop()
    }

    @Test
    fun convenienceOpsTest()  = runBlocking {

        data class Student(val name: String, val finalGrade: Int)
        data class Class(val title: String, val students: List<Student>)

        val collection = database.getCollection<Class>("classData")

        val entries = listOf(
            Class("History", listOf(Student("Kaley", 99), Student("Kevin", 80))),
            Class("Math", listOf(Student("Dan", 68), Student("Shelley", 45))),
            Class("Language Arts", listOf(Student("Kaley", 83), Student("Shelley", 86)))
        )

        collection.insertMany(entries)

        // :snippet-start: convenience-aggregation-methods
        fun gradeAverage(students: MqlArray<MqlDocument>, fieldName: String): MqlNumber {
            val sum = students.sum{ student -> student.getInteger(fieldName) }
            val avg = sum.divide(students.size())
            return avg
        }

        fun evaluate(grade: MqlNumber, cutoff1: MqlNumber, cutoff2: MqlNumber): MqlString {
            val message = grade.switchOn{ on -> on
                .lte(cutoff1) { g -> of("Needs improvement") }
                .lte(cutoff2) { g -> of("Meets expectations") }
                .defaults{g -> of("Exceeds expectations")}}
            return message
        }
        // :snippet-end:

        // :snippet-start: convenience-aggregation
        val students = current().getArray<MqlDocument>("students")

        val resultsFlow = collection.aggregate<Document>( // :remove:
        listOf(
            Aggregates.project(
                Projections.fields(
                    Projections.computed("evaluation", students
                        .passArrayTo { s -> gradeAverage(s, "finalGrade") }
                        .passNumberTo { grade -> evaluate(grade, of(70), of(85)) })
        )))
        // :snippet-end:
        )

        // Uncomment to see output
        // resultsFlow.collect { println(it) }

        val result = resultsFlow.toList()
        assertEquals(3, result.size)
        assertEquals("Exceeds expectations", result[0].getString("evaluation"))
        assertEquals("Needs improvement", result[1].getString("evaluation"))
        assertEquals("Meets expectations", result[2].getString("evaluation"))

        collection.drop()
    }

    @Test
    fun conversionOpsTest()  = runBlocking {

        data class Alumnus(val name: String, val graduationYear: String)

        val collection = database.getCollection<Alumnus>("alumniData")

        val entries = listOf(
            Alumnus("Shelley E", "2009"),
            Alumnus("Courtney S", "1994")
        )

        collection.insertMany(entries)

        // :snippet-start: conversion-aggregation
        val graduationYear = current().getString("graduationYear")

        val resultsFlow = collection.aggregate<Document>( // :remove:
        listOf(
            Aggregates.addFields(
                Field("reunionYear",
                    graduationYear
                        .parseInteger()
                        .add(5))
        ))
        // :snippet-end:
        )

        // Uncomment to see output
        // resultsFlow.collect { println(it) }

        val result = resultsFlow.toList()
        assertEquals(2, result.size)
        assertEquals(2014, result[0].getInteger("reunionYear"))
        assertEquals(1999, result[1].getInteger("reunionYear"))

        collection.drop()
    }

    @Test
    fun dateOpsTest()  = runBlocking {

        data class Delivery(val desc: String, val deliveryDate: String)

        val collection = database.getCollection<Delivery>("deliveryData")

        val entries = listOf(
            Delivery("Order #1234", "2018-01-15T16:00:00Z"),
            Delivery("Order #4397", "Jan 15, 2018, 12:00 PM EST"),
            Delivery("Order #4397", "Jun 8, 2023, 12:00 PM EST")
        )

        collection.insertMany(entries)

        // :snippet-start: date-aggregation
        val deliveryDate = current().getString("deliveryDate")

        val resultsFlow = collection.aggregate<Document>( // :remove:
        listOf(
            Aggregates.match(
                Filters.expr(deliveryDate
                    .parseDate()
                    .dayOfWeek(of("America/New_York"))
                    .eq(of(2))
        )))
        // :snippet-end:
        )

        // Uncomment to see output
        // resultsFlow.collect { println(it) }

        val result = resultsFlow.toList()
        assertEquals(2, result.size)
        assertEquals("Order #1234", result[0].getString("desc"))
        assertEquals("Order #4397", result[1].getString("desc"))

        collection.drop()
    }

    @Test
    fun documentOpsTest()  = runBlocking {

        val collection = database.getCollection<Document>("addressData")

        val address1 = Document("street", "601 Mongo Drive").append("city", "Vasqueztown").append("state", "CO").append("zip", 27017)
        val address2 = Document("street", "533 Maple Ave").append("city", "Bellevue").append("state", "WA").append("zip", 98004)

        val entries = listOf(
            Document("customer.name", "Mary Kenneth Keller").append("mailing.address", address1),
            Document("customer.name", "Surathi Raj").append("mailing.address", address2))

        collection.insertMany(entries)

        // :snippet-start: document-aggregation
        val address = current().getDocument("mailing.address")

        val resultsFlow = collection.aggregate<Document>( // :remove:
        listOf(
            Aggregates.match(
                Filters.expr(address
                    .getString("state")
                    .eq(of("WA"))
        )))
        // :snippet-end:
        )

        // Uncomment to see output
        // resultsFlow.collect { println(it) }

        val result = resultsFlow.toList()
        assertEquals(1, result.size)
        assertEquals("Surathi Raj", result[0].getString("customer.name"))

        collection.drop()
    }

    @Test
    fun mapOpsTest()  = runBlocking {

        data class Item(val item: String, val warehouses: Map<String, Int>)

        val collection = database.getCollection<Item>("stockData")

        val doc = Item("notebook", mapOf("Atlanta" to 50, "Chicago" to 0, "Portland" to 120,"Dallas" to 6))

        collection.insertOne(doc)

        // :snippet-start: map-aggregation
        val warehouses = current().getMap<MqlNumber>("warehouses")

        val resultsFlow = collection.aggregate<Document>( // :remove:
        listOf(
            Aggregates.project(
                Projections.fields(
                    Projections.computed("totalInventory", warehouses
                        .entries()
                        .sum { v -> v.getValue() })
        )))
        // :snippet-end:
        )

        // Uncomment to see output
        // resultsFlow.collect { println(it) }

        val result = resultsFlow.toList()
        assertEquals(1, result.size)
        assertEquals(176, result[0].getInteger("totalInventory"))

        collection.drop()
    }

    @Test
    fun stringOpsTest()  = runBlocking {

        data class Employee(val lastName: String, val employeeID: String)

        val collection = database.getCollection<Employee>("employeeData")

        val entries = listOf(
            Employee("Carter", "12w2"),
            Employee("Derry", "32rj")
        )

        collection.insertMany(entries)

        // :snippet-start: string-aggregation
        val lastName = current().getString("lastName")
        val employeeID = current().getString("employeeID")

        val resultsFlow = collection.aggregate<Document>( // :remove:
        listOf(
            Aggregates.project(
                Projections.fields(
                    Projections.computed("username", lastName
                        .append(employeeID)
                        .toLower())
        )))
        // :snippet-end:
        )

        // Uncomment to see output
        // resultsFlow.collect { println(it) }

        val result = resultsFlow.toList()
        assertEquals(2, result.size)
        assertEquals("carter12w2", result[0].getString("username"))
        assertEquals("derry32rj", result[1].getString("username"))

        collection.drop()
    }

    @Test
    fun typeOpsTest()  = runBlocking {

        val collection = database.getCollection<Document>("movieRatingData")

        val entries = listOf(
            Document("movie", "Narnia").append("rating", 4),
            Document("movie", "Jaws").append("rating", null),
            Document("movie", "Phantom Thread").append("rating", "hate!!")
        )

        collection.insertMany(entries)

        // :snippet-start: type-aggregation
        val rating = current().getField("rating")

        val resultsFlow = collection.aggregate<Document>( // :remove:
        listOf(
            Aggregates.project(
                Projections.fields(
                    Projections.computed("numericalRating", rating
                        .isNumberOr(of(1)))
        )))
        // :snippet-end:
        )

        // Uncomment to see output
        // resultsFlow.collect { println(it) }

        val result = resultsFlow.toList()
        assertEquals(3, result.size)
        assertEquals(4, result[0].getInteger("numericalRating"))
        assertEquals(1, result[1].getInteger("numericalRating"))
        assertEquals(1, result[2].getInteger("numericalRating"))

        collection.drop()
    }
}