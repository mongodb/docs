package timeseries;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import mongodb.comparison.Expect;
import org.junit.jupiter.api.*;

public class AggregationOperatorsTests {

    private final String uri = System.getenv("CONNECTION_STRING");
    static private MongoClient mongoClient;
    private MongoDatabase database;
    private AggregationOperators aggOp;

    @BeforeEach
    void setUp() {
        aggOp = new AggregationOperators();
        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("timeseries_db");
    }

    @AfterEach
    void tearDown() {
       aggOp.Cleanup();
    }

    @AfterAll
    static void tearDownAll(){
        mongoClient.close();
    }

    @Test
    @DisplayName("Test that agg pipeline returns the correct format and data.")
    void TestAveragePricePipeline() {
        var actual = aggOp.runAveragePricePipeline();

        var outputFile = "src/main/java/timeseries/AveragePricePiplineOutput.txt";

        Expect.that(actual).shouldMatch(outputFile);
    }

    @Test
    @DisplayName("Test that agg pipeline returns the correct format and data.")
    void TestRollingAveragePipeline() {
        var actual = aggOp.runRollingAveragePipeline();

        var outputFile = "src/main/java/timeseries/RollingPricePiplineOutput.txt";

        Expect.that(actual).withIgnoredFields("_id").shouldMatch(outputFile);
    }
}
