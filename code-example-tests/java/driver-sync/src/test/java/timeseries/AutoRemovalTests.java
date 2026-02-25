package timeseries;

import mongodb.comparison.Expect;
import mongodb.comparison.Schema;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Map;

public class AutoRemovalTests {

    @AfterEach
    void tearDown() {
        AutoRemoval.cleanup();
    }

    @Test
    @DisplayName("Tests that collection options can be updated successfully")
    void testCollectionOptionsUpdate() {
        var updateCommandResult = AutoRemoval.updateCollectionOptions();

        Expect.that(updateCommandResult)
                .shouldResemble(Map.of("ok", 1.0))
                .withSchema(Schema.builder()
                        .withCount(1)
                        .withRequiredFields("ok")
                        .withFieldValues(Map.of("ok", 1.0))
                        .build());
    }

    @Test
    @DisplayName("Tests that collection expiry is correctly set")
    void testCollectionExpiry() {
        var result = AutoRemoval.getCollectionInfo();
        Expect.that(result).shouldMatch(86400L);
    }

    @Test
    @DisplayName("Tests that expireAfterSeconds can be removed")
    void testRemoveRemoval() {
        var result = AutoRemoval.removeRemoval();
        Expect.that(result).shouldMatch(true);
    }
}
