package sampledatautil;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterEach;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

class SampleDataCheckerTest {

    @BeforeEach
    void setUp() {
        // Clear cache and reset state before each test
        SampleDataChecker.clearSampleDataCache();
        SampleDataChecker.setConnectionStringOverride(null);
    }

    @AfterEach
    void tearDown() {
        // Clean up after each test
        SampleDataChecker.clearSampleDataCache();
        SampleDataChecker.setConnectionStringOverride(null);
    }

    @Test
    void testStandardSampleDatabasesRegistryExists() {
        Map<String, List<String>> databases = SampleDataChecker.STANDARD_SAMPLE_DATABASES;
        
        assertNotNull(databases);
        assertFalse(databases.isEmpty());
        
        // Check that all expected databases are present
        assertTrue(databases.containsKey("sample_mflix"));
        assertTrue(databases.containsKey("sample_restaurants"));
        assertTrue(databases.containsKey("sample_training"));
        assertTrue(databases.containsKey("sample_analytics"));
        assertTrue(databases.containsKey("sample_airbnb"));
        assertTrue(databases.containsKey("sample_geospatial"));
        assertTrue(databases.containsKey("sample_guides"));
        assertTrue(databases.containsKey("sample_stores"));
        assertTrue(databases.containsKey("sample_supplies"));
        assertTrue(databases.containsKey("sample_weatherdata"));
    }

    @Test
    void testStandardSampleDatabasesHaveExpectedCollections() {
        Map<String, List<String>> databases = SampleDataChecker.STANDARD_SAMPLE_DATABASES;
        
        // Test specific database collections
        List<String> mflixCollections = databases.get("sample_mflix");
        assertNotNull(mflixCollections);
        assertTrue(mflixCollections.contains("movies"));
        assertTrue(mflixCollections.contains("theaters"));
        assertTrue(mflixCollections.contains("users"));
        assertTrue(mflixCollections.contains("comments"));
        assertTrue(mflixCollections.contains("sessions"));
        
        List<String> restaurantCollections = databases.get("sample_restaurants");
        assertNotNull(restaurantCollections);
        assertTrue(restaurantCollections.contains("restaurants"));
        assertTrue(restaurantCollections.contains("neighborhoods"));
    }

    @Test
    void testCheckSampleDataAvailableWithNoConnection() {
        // Set an invalid connection string
        SampleDataChecker.setConnectionStringOverride("mongodb://invalid-host:27017");
        
        // Should return false for any database when connection fails
        boolean result = SampleDataChecker.checkSampleDataAvailable("sample_mflix");
        assertFalse(result);
        
        // Should also return false with specific collections
        List<String> collections = Arrays.asList("movies", "theaters");
        boolean resultWithCollections = SampleDataChecker.checkSampleDataAvailable("sample_mflix", collections);
        assertFalse(resultWithCollections);
    }

    @Test
    void testCheckSampleDataAvailableWithEmptyConnectionString() {
        // Set empty connection string
        SampleDataChecker.setConnectionStringOverride("");
        
        // Should return false when connection string is empty (graceful handling)
        boolean result = SampleDataChecker.checkSampleDataAvailable("sample_mflix");
        assertFalse(result);
    }

    @Test
    void testCheckMultipleSampleDatabasesWithNoConnection() {
        SampleDataChecker.setConnectionStringOverride("mongodb://invalid-host:27017");
        
        List<String> databases = Arrays.asList("sample_mflix", "sample_restaurants");
        SampleDataAvailability result = SampleDataChecker.checkMultipleSampleDatabases(databases);
        
        assertFalse(result.isAvailable());
        assertEquals(2, result.getMissingDatabases().size());
        assertTrue(result.getMissingDatabases().contains("sample_mflix"));
        assertTrue(result.getMissingDatabases().contains("sample_restaurants"));
        assertTrue(result.getAvailableDatabases().isEmpty());
    }

    @Test
    void testCheckMultipleSampleDatabasesWithCollectionsPerDatabase() {
        SampleDataChecker.setConnectionStringOverride("mongodb://invalid-host:27017");
        
        List<String> databases = Arrays.asList("sample_mflix", "sample_restaurants");
        Map<String, List<String>> collectionsPerDatabase = Map.of(
            "sample_mflix", Arrays.asList("movies", "theaters"),
            "sample_restaurants", Arrays.asList("restaurants")
        );
        
        SampleDataAvailability result = SampleDataChecker.checkMultipleSampleDatabases(databases, collectionsPerDatabase);
        
        assertFalse(result.isAvailable());
        assertEquals(2, result.getMissingDatabases().size());
    }

    @Test
    void testGetAvailableSampleDatabasesWithNoConnection() {
        SampleDataChecker.setConnectionStringOverride("mongodb://invalid-host:27017");
        
        List<String> availableDatabases = SampleDataChecker.getAvailableSampleDatabases();
        
        assertNotNull(availableDatabases);
        assertTrue(availableDatabases.isEmpty());
    }

    @Test
    void testCacheClearing() {
        SampleDataChecker.setConnectionStringOverride("mongodb://invalid-host:27017");
        
        // Make some calls to populate cache
        SampleDataChecker.checkSampleDataAvailable("sample_mflix");
        SampleDataChecker.checkSampleDataAvailable("sample_restaurants");
        
        // Clear cache
        SampleDataChecker.clearSampleDataCache();
        
        // Should be able to make calls again without issues
        boolean result = SampleDataChecker.checkSampleDataAvailable("sample_mflix");
        assertFalse(result); // Still false due to invalid connection, but no exception
    }

    @Test
    void testConnectionStringOverride() {
        // Test setting and clearing override
        String testConnectionString = "mongodb://test-host:27017";
        SampleDataChecker.setConnectionStringOverride(testConnectionString);
        
        // Clear override
        SampleDataChecker.setConnectionStringOverride(null);
        
        // Should not throw exception when clearing
        assertDoesNotThrow(() -> SampleDataChecker.clearSampleDataCache());
    }

    @Test
    void testShowSampleDataSummary() {
        // This test verifies the summary can be called without throwing exceptions
        assertDoesNotThrow(() -> SampleDataChecker.showSampleDataSummary());
        
        // Calling it again should not cause issues (summary should only show once)
        assertDoesNotThrow(() -> SampleDataChecker.showSampleDataSummary());
    }

    @Test
    void testConcurrentAccess() throws InterruptedException {
        SampleDataChecker.setConnectionStringOverride("mongodb://invalid-host:27017");
        
        // Test concurrent access to cache
        List<Thread> threads = new ArrayList<>();
        List<Boolean> results = Collections.synchronizedList(new ArrayList<>());
        
        for (int i = 0; i < 10; i++) {
            Thread thread = new Thread(() -> {
                boolean result = SampleDataChecker.checkSampleDataAvailable("sample_mflix");
                results.add(result);
            });
            threads.add(thread);
            thread.start();
        }
        
        // Wait for all threads to complete
        for (Thread thread : threads) {
            thread.join();
        }
        
        // All results should be false (due to invalid connection) and we should have 10 results
        assertEquals(10, results.size());
        assertTrue(results.stream().allMatch(result -> !result));
    }
}
