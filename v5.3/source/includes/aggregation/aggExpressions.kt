import com.mongodb.client.model.*
import com.mongodb.client.model.mql.*
import com.mongodb.client.model.mql.MqlValues.current
import com.mongodb.client.model.mql.MqlValues.of
import com.mongodb.kotlin.client.MongoClient
import org.bson.Document
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import java.time.LocalDate

class AggExpressionsTest {
    companion object {
        val uri = "<connection string>"
        val mongoClient = MongoClient.create(uri)
        private val database = mongoClient.getDatabase("aggExpressions")

        @AfterAll
        @JvmStatic
        fun afterAll() {
            mongoClient.close()
        }
    }

    @Test
    fun arithmeticOpsTest() {

        data class Entry(val date: LocalDate, val precipitation: Double)

        val collection = database.getCollection<Entry>("weatherData")

        val entries = listOf(
            Entry(LocalDate.of(2021, 6, 24), 5.0),
            Entry(LocalDate.of(2021, 6, 25), 1.4)
        )

        collection.insertMany(entries)

        // start-arithmetic-aggregation
        val month = current().getDate("date").month(of("UTC"))
        val precip = current().getInteger("precipitation")

        val results = collection.aggregate<Document>(
            listOf(
                Aggregates.group(
                    month,
                    Accumulators.avg("avgPrecipMM", precip.multiply(25.4))
                )
            )
        )
        // end-arithmetic-aggregation

        val result = results.toList()
        assertEquals(1, result.size)
        assertEquals(6, result[0].getInteger("_id"))
        assertEquals(81.28, result[0].getDouble("avgPrecipMM"))

        collection.drop()
    }

    @Test
    fun arrayOpsTest() {

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
            Movie(
                "Hamlet",
                listOf(
                    Showtime("May 14, 2023, 12:00 PM", listOf(20, 80), 100),
                    Showtime("May 20, 2023, 08:00 PM", listOf(10, 40), 34)
                )
            )
        )

        collection.insertMany(entries)

        // start-array-aggregation
        val showtimes = current().getArray<MqlDocument>("showtimes")

        val results = collection.aggregate<Document>(
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
                    )
                )
            )
        )
        // end-array-aggregation

        val result = results.toList()
        assertEquals(1, result.size)

        collection.drop()
    }

    @Test
    fun booleanOpsTest() {

        data class Entry(val location: String, val temperature: Int)

        val collection = database.getCollection<Entry>("tempData")

        val entries = listOf(
            Entry("Randolph, NJ", 100),
            Entry("Seward, AK", 1),
            Entry("Lincoln, NE", 45)
        )

        collection.insertMany(entries)

        // start-boolean-aggregation
        val temperature = current().getInteger("temperature")

        val results = collection.aggregate<Document>(
            listOf(
                Aggregates.project(
                    Projections.fields(
                        Projections.computed(
                            "extremeTemp", temperature
                                .lt(of(10))
                                .or(temperature.gt(of(95)))
                        )
                    )
                )
            )
        )
        // end-boolean-aggregation

        val result = results.toList()
        assertEquals(3, result.size)
        assertEquals(true, result[0].getBoolean("extremeTemp"))
        assertEquals(true, result[1].getBoolean("extremeTemp"))
        assertEquals(false, result[2].getBoolean("extremeTemp"))

        collection.drop()
    }

    @Test
    fun comparisonOpsTest() {

        data class Place(val location: String)

        val collection = database.getCollection<Place>("placesData")

        val entries = listOf(
            Place("Delaware"),
            Place("California")
        )

        collection.insertMany(entries)

        // start-comparison-aggregation
        val location = current().getString("location")

        val results = collection.aggregate<Document>(
            listOf(
                Aggregates.match(
                    Filters.expr(location.eq(of("California")))
                )
            )
        )
        // end-comparison-aggregation

        val result = results.toList()
        assertEquals(1, result.size)
        assertEquals("California", result[0].getString("location"))

        collection.drop()
    }

    @Test
    fun conditionalOpsTest() {

        val collection = database.getCollection<Document>("memberData")

        val entries = listOf(
            Document("name", "Sandra K").append("member", "Gold"),
            Document("name", "Darren I").append("member", true),
            Document("name", "Corey P").append("member", false),
            Document("name", "Francine D").append("member", 7),
            Document("name", "Lily A").append("member", listOf("None", "Gold", "Premium"))
        )

        collection.insertMany(entries)

        // start-conditional-aggregation
        val member = current().getField("member")

        val results = collection.aggregate<Document>(
            listOf(
                Aggregates.project(
                    Projections.fields(
                        Projections.computed("membershipLevel",
                            member.switchOn { field ->
                                field
                                    .isString { s -> s }
                                    .isBoolean { b -> b.cond(of("Gold"), of("Guest")) }
                                    .isArray { a -> a.last() }
                                    .defaults { d -> of("Guest") }
                            })
                    )
                )
            )
        )
        // end-conditional-aggregation

        val result = results.toList()
        assertEquals(5, result.size)
        assertEquals("Gold", result[0].getString("membershipLevel"))
        assertEquals("Gold", result[1].getString("membershipLevel"))
        assertEquals("Guest", result[2].getString("membershipLevel"))
        assertEquals("Guest", result[3].getString("membershipLevel"))
        assertEquals("Premium", result[4].getString("membershipLevel"))

        collection.drop()
    }

    @Test
    fun convenienceOpsTest() {

        data class Student(val name: String, val finalGrade: Int)
        data class Class(val title: String, val students: List<Student>)

        val collection = database.getCollection<Class>("classData")

        val entries = listOf(
            Class("History", listOf(Student("Kaley", 99), Student("Kevin", 80))),
            Class("Math", listOf(Student("Dan", 68), Student("Shelley", 45))),
            Class("Language Arts", listOf(Student("Kaley", 83), Student("Shelley", 86)))
        )

        collection.insertMany(entries)

        // start-convenience-aggregation-methods
        fun gradeAverage(students: MqlArray<MqlDocument>, fieldName: String): MqlNumber {
            val sum = students.sum { student -> student.getInteger(fieldName) }
            val avg = sum.divide(students.size())
            return avg
        }

        fun evaluate(grade: MqlNumber, cutoff1: MqlNumber, cutoff2: MqlNumber): MqlString {
            val message = grade.switchOn { on ->
                on
                    .lte(cutoff1) { g -> of("Needs improvement") }
                    .lte(cutoff2) { g -> of("Meets expectations") }
                    .defaults { g -> of("Exceeds expectations") }
            }
            return message
        }
        // end-convenience-aggregation-methods

        // start-convenience-aggregation
        val students = current().getArray<MqlDocument>("students")

        val results = collection.aggregate<Document>(
            listOf(
                Aggregates.project(
                    Projections.fields(
                        Projections.computed("evaluation", students
                            .passArrayTo { s -> gradeAverage(s, "finalGrade") }
                            .passNumberTo { grade -> evaluate(grade, of(70), of(85)) })
                    )
                )
            )
        )
        // end-convenience-aggregation

        val result = results.toList()
        assertEquals(3, result.size)
        assertEquals("Exceeds expectations", result[0].getString("evaluation"))
        assertEquals("Needs improvement", result[1].getString("evaluation"))
        assertEquals("Meets expectations", result[2].getString("evaluation"))

        collection.drop()
    }

    @Test
    fun conversionOpsTest() {

        data class Alumnus(val name: String, val graduationYear: String)

        val collection = database.getCollection<Alumnus>("alumniData")

        val entries = listOf(
            Alumnus("Shelley E", "2009"),
            Alumnus("Courtney S", "1994")
        )

        collection.insertMany(entries)

        // start-conversion-aggregation
        val graduationYear = current().getString("graduationYear")

        val results = collection.aggregate<Document>(
            listOf(
                Aggregates.addFields(
                    Field(
                        "reunionYear",
                        graduationYear
                            .parseInteger()
                            .add(5)
                    )
                )
            )
        )
        // end-conversion-aggregation

        val result = results.toList()
        assertEquals(2, result.size)
        assertEquals(2014, result[0].getInteger("reunionYear"))
        assertEquals(1999, result[1].getInteger("reunionYear"))

        collection.drop()
    }

    @Test
    fun dateOpsTest() {

        data class Delivery(val desc: String, val deliveryDate: String)

        val collection = database.getCollection<Delivery>("deliveryData")

        val entries = listOf(
            Delivery("Order #1234", "2018-01-15T16:00:00Z"),
            Delivery("Order #4397", "Jan 15, 2018, 12:00 PM EST"),
            Delivery("Order #4397", "Jun 8, 2023, 12:00 PM EST")
        )

        collection.insertMany(entries)

        // start-date-aggregation
        val deliveryDate = current().getString("deliveryDate")

        val results = collection.aggregate<Document>(
            listOf(
                Aggregates.match(
                    Filters.expr(
                        deliveryDate
                            .parseDate()
                            .dayOfWeek(of("America/New_York"))
                            .eq(of(2))
                    )
                )
            )
        )
        // end-date-aggregation

        val result = results.toList()
        assertEquals(2, result.size)
        assertEquals("Order #1234", result[0].getString("desc"))
        assertEquals("Order #4397", result[1].getString("desc"))

        collection.drop()
    }

    @Test
    fun documentOpsTest() {

        val collection = database.getCollection<Document>("addressData")

        val address1 = Document("street", "601 Mongo Drive").append("city", "Vasqueztown").append("state", "CO")
            .append("zip", 27017)
        val address2 =
            Document("street", "533 Maple Ave").append("city", "Bellevue").append("state", "WA").append("zip", 98004)

        val entries = listOf(
            Document("customer.name", "Mary Kenneth Keller").append("mailing.address", address1),
            Document("customer.name", "Surathi Raj").append("mailing.address", address2)
        )

        collection.insertMany(entries)

        // start-document-aggregation
        val address = current().getDocument("mailing.address")

        val results = collection.aggregate<Document>(
            listOf(
                Aggregates.match(
                    Filters.expr(
                        address
                            .getString("state")
                            .eq(of("WA"))
                    )
                )
            )
        )
        // end-document-aggregation

        val result = results.toList()
        assertEquals(1, result.size)
        assertEquals("Surathi Raj", result[0].getString("customer.name"))

        collection.drop()
    }

    @Test
    fun mapOpsTest() {

        data class Item(val item: String, val warehouses: Map<String, Int>)

        val collection = database.getCollection<Item>("stockData")

        val doc = Item("notebook", mapOf("Atlanta" to 50, "Chicago" to 0, "Portland" to 120, "Dallas" to 6))

        collection.insertOne(doc)

        // start-map-aggregation
        val warehouses = current().getMap<MqlNumber>("warehouses")

        val results = collection.aggregate<Document>(
            listOf(
                Aggregates.project(
                    Projections.fields(
                        Projections.computed("totalInventory", warehouses
                            .entries()
                            .sum { v -> v.getValue() })
                    )
                )
            )
        )
        // end-map-aggregation

        val result = results.toList()
        assertEquals(1, result.size)
        assertEquals(176, result[0].getInteger("totalInventory"))

        collection.drop()
    }

    @Test
    fun stringOpsTest() {

        data class Employee(val lastName: String, val employeeID: String)

        val collection = database.getCollection<Employee>("employeeData")

        val entries = listOf(
            Employee("Carter", "12w2"),
            Employee("Derry", "32rj")
        )

        collection.insertMany(entries)

        // start-string-aggregation
        val lastName = current().getString("lastName")
        val employeeID = current().getString("employeeID")

        val results = collection.aggregate<Document>(
            listOf(
                Aggregates.project(
                    Projections.fields(
                        Projections.computed(
                            "username", lastName
                                .append(employeeID)
                                .toLower()
                        )
                    )
                )
            )
        )
        // end-string-aggregation

        val result = results.toList()
        assertEquals(2, result.size)
        assertEquals("carter12w2", result[0].getString("username"))
        assertEquals("derry32rj", result[1].getString("username"))

        collection.drop()
    }

    @Test
    fun typeOpsTest() {

        val collection = database.getCollection<Document>("movieRatingData")

        val entries = listOf(
            Document("movie", "Narnia").append("rating", 4),
            Document("movie", "Jaws").append("rating", null),
            Document("movie", "Phantom Thread").append("rating", "hate!!")
        )

        collection.insertMany(entries)

        // start-type-aggregation
        val rating = current().getField("rating")

        val results = collection.aggregate<Document>(
            listOf(
                Aggregates.project(
                    Projections.fields(
                        Projections.computed(
                            "numericalRating", rating
                                .isNumberOr(of(1))
                        )
                    )
                )
            )
        )
        // end-type-aggregation

        val result = results.toList()
        assertEquals(3, result.size)
        assertEquals(4, result[0].getInteger("numericalRating"))
        assertEquals(1, result[1].getInteger("numericalRating"))
        assertEquals(1, result[2].getInteger("numericalRating"))

        collection.drop()
    }
}