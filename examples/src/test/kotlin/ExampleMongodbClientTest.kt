import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.*
import kotlin.test.*
internal class ExampleMongodbClientTest {
    val client = ExampleMongodbClient("mongodb://localhost:27017", "test")
    @Test
    fun test() {
        assertEquals(1, 1)
    }

//    @AfterAll
//    fun afterAll(){
//        client.close()
//    }
}