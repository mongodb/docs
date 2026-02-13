package timeseries;

import mongodb.comparison.Expect;
import mongodb.comparison.Schema;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.nio.file.Path;
import java.util.Map;

public class SecondaryIndexesTests {

    @AfterEach
    void tearDown() {
        SecondaryIndexes.cleanup();
    }

    @Test
    @DisplayName("Tests CreateSecondaryIndex and UseSecondaryIndex output matches the expected documentation examples")
    void testSecondaryIndex() {
        var result = SecondaryIndexes.createAndUseSecondaryIndex();

        Path outputFilePath = Path.of("src/main/java/timeseries/OutputFiles/SecondaryIndexOutput.txt");
        Expect.that(result.result)
                .withIgnoredFields("_id")
                .shouldMatch(outputFilePath);

        Path explainOutputFilePath = Path.of("src/main/java/timeseries/OutputFiles/SecondaryIndexExplainOutput.txt");
        Expect.that(result.explainResult)
                .shouldResemble(explainOutputFilePath)
                .withSchema(Schema.builder()
                        .withCount(1)
                        .withRequiredFields("stages[0].$cursor.queryPlanner.winningPlan.stage")
                        .withFieldValues(Map.of("stages[0].$cursor.queryPlanner.winningPlan.stage", "CLUSTERED_IXSCAN"))
                        .build());
    }
}
