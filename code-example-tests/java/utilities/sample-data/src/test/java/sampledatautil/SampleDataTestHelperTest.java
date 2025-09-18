package sampledatautil;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterEach;
import org.opentest4j.TestAbortedException;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

class SampleDataTestHelperTest {

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

    @Test
    void testEnsureSampleDataOrSkipSingleDatabaseMissing() {
        SampleDataChecker.setConnectionStringOverride("mongodb://invalid-host:27017");
        
        // Should skip the test when database is not available
        assertThrows(TestAbortedException.class, () -> {
            SampleDataTestHelper.ensureSampleDataOrSkip("sample_mflix");
        });
    }

    @Test
    void testEnsureSampleDataOrSkipSingleDatabaseWithCollections() {
        SampleDataChecker.setConnectionStringOverride("mongodb://invalid-host:27017");
        
        // Should skip the test when database with specific collections is not available
        assertThrows(TestAbortedException.class, () -> {
            SampleDataTestHelper.ensureSampleDataOrSkip("sample_mflix", 
                new String[]{"movies", "theaters"});
        });
    }

    @Test
    void testEnsureSampleDataOrSkipSingleDatabaseWithCollectionList() {
        SampleDataChecker.setConnectionStringOverride("mongodb://invalid-host:27017");
        
        List<String> collections = Arrays.asList("movies", "theaters");
        assertThrows(TestAbortedException.class, () -> {
            SampleDataTestHelper.ensureSampleDataOrSkip("sample_mflix", collections);
        });
    }

    @Test
    void testEnsureSampleDataOrSkipMultipleDatabases() {
        SampleDataChecker.setConnectionStringOverride("mongodb://invalid-host:27017");
        
        List<String> databases = Arrays.asList("sample_mflix", "sample_restaurants");
        assertThrows(TestAbortedException.class, () -> {
            SampleDataTestHelper.ensureSampleDataOrSkip(databases);
        });
    }

    @Test
    void testEnsureSampleDataOrSkipMultipleDatabasesWithCollections() {
        SampleDataChecker.setConnectionStringOverride("mongodb://invalid-host:27017");
        
        List<String> databases = Arrays.asList("sample_mflix", "sample_restaurants");
        Map<String, List<String>> collectionsPerDatabase = Map.of(
            "sample_mflix", Arrays.asList("movies", "theaters"),
            "sample_restaurants", Arrays.asList("restaurants")
        );
        
        assertThrows(TestAbortedException.class, () -> {
            SampleDataTestHelper.ensureSampleDataOrSkip(databases, collectionsPerDatabase);
        });
    }

    @Test
    void testEnsureSampleDataOrSkipVariadicDatabases() {
        SampleDataChecker.setConnectionStringOverride("mongodb://invalid-host:27017");
        
        assertThrows(TestAbortedException.class, () -> {
            SampleDataTestHelper.ensureSampleDataOrSkip("sample_mflix", "sample_restaurants", 
                new String[]{"sample_training"});
        });
    }

    @Test
    void testEnsureSampleDataOrSkipEmptyDatabaseList() {
        SampleDataChecker.setConnectionStringOverride("mongodb://invalid-host:27017");
        
        // Should not skip when no databases are specified
        assertDoesNotThrow(() -> {
            SampleDataTestHelper.ensureSampleDataOrSkip(Collections.emptyList());
        });
    }

    @Test
    void testEnsureSampleDataOrSkipWithConnectionError() {
        SampleDataChecker.setConnectionStringOverride("");
        
        // Should skip when connection string is invalid
        assertThrows(TestAbortedException.class, () -> {
            SampleDataTestHelper.ensureSampleDataOrSkip("sample_mflix");
        });
    }

    @Test
    void testEnsureSampleDataOrSkipWithNoConnectionString() {
        SampleDataChecker.setConnectionStringOverride(null);
        // Ensure no CONNECTION_STRING environment variable is set for this test
        
        assertThrows(TestAbortedException.class, () -> {
            SampleDataTestHelper.ensureSampleDataOrSkip("sample_mflix");
        });
    }
}
