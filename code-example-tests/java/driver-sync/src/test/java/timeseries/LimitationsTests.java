package timeseries;

import mongodb.comparison.Expect;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class LimitationsTests {

    @Test
    @DisplayName("Test that agg pipeline returns the correct format and data.")
    void TestDistinct() {
        var result = Limitations.getDistinctDocuments();

        Expect.that(result.size()).shouldMatch(2);
        Expect.that(result.get(0).get("_id")).shouldMatch("a");
        Expect.that(result.get(1).get("_id")).shouldMatch("b");
    }

    @AfterAll
    static void tearDownAll() {
        Limitations.Cleanup();
    }
}
