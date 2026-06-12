package getStarted;

import mongodb.comparison.Expect;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import sampledatautil.RequiresSampleData;

public class GetStartedTests {
    @Test
    @RequiresSampleData("sample_mflix")
    @DisplayName("Test that Get Started code returns the expected output")
    void TestGetStartedOutputMatchesDocs() {
        var output = new GetStarted().runGetStarted();

        Expect.that(output)
            .shouldMatch("src/main/java/getStarted/GetStartedOutput.txt");
    }
}
