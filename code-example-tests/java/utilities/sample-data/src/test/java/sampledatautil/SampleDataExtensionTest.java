package sampledatautil;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assumptions;

import static org.junit.jupiter.api.Assertions.*;

class SampleDataExtensionTest {

    @BeforeEach
    void setUp() {
        SampleDataChecker.clearSampleDataCache();
        SampleDataChecker.setConnectionStringOverride(null);
    }

    @AfterEach
    void tearDown() {
        SampleDataChecker.clearSampleDataCache();
        SampleDataChecker.setConnectionStringOverride(null);
    }

    // Test annotation with single database - this should be skipped due to no connection
    @Test
    @RequiresSampleData("sample_mflix")
    void testSingleDatabaseAnnotation() {
        SampleDataChecker.setConnectionStringOverride("mongodb://invalid-host:27017");
        fail("This test should have been skipped due to missing sample data");
    }

    // Test annotation with multiple databases - this should be skipped due to no connection
    @Test
    @RequiresSampleData({"sample_mflix", "sample_restaurants"})
    void testMultipleDatabaseAnnotation() {
        SampleDataChecker.setConnectionStringOverride("mongodb://invalid-host:27017");
        fail("This test should have been skipped due to missing sample data");
    }

    // Test annotation with specific collections - this should be skipped due to no connection
    @Test
    @RequiresSampleData(value = "sample_mflix", collections = {"movies", "theaters"})
    void testDatabaseWithSpecificCollections() {
        SampleDataChecker.setConnectionStringOverride("mongodb://invalid-host:27017");
        fail("This test should have been skipped due to missing sample data");
    }

    // Test that runs without annotation - should not be skipped
    @Test
    void testWithoutAnnotation() {
        SampleDataChecker.setConnectionStringOverride("mongodb://invalid-host:27017");
        // This test should run normally since it has no @RequiresSampleData annotation
        assertTrue(true, "Test without annotation should run normally");
    }

    // Test with valid connection but missing data (simulated by using invalid host)
    @Test
    @RequiresSampleData("nonexistent_database")
    void testNonexistentDatabase() {
        SampleDataChecker.setConnectionStringOverride("mongodb://invalid-host:27017");
        fail("This test should have been skipped due to missing sample data");
    }
}
