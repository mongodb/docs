package sampledatautil.examples;

import sampledatautil.RequiresSampleData;
import sampledatautil.SampleDataTestHelper;
import sampledatautil.SampleDataChecker;
import sampledatautil.SampleDataAvailability;
import org.junit.jupiter.api.Test;

import java.util.*;

/**
 * Example usage of the MongoDB Sample Data Utility.
 * 
 * This class demonstrates various ways to use the utility to check for
 * sample data availability and conditionally skip tests.
 */
public class SampleDataExamples {

    // ============================================================================
    // ANNOTATION-BASED EXAMPLES
    // ============================================================================

    /**
     * Example: Single database requirement
     * This test will only run if the sample_mflix database is available
     */
    @Test
    @RequiresSampleData("sample_mflix")
    public void testMovieAnalysis() {
        // Test code that uses sample_mflix database
        System.out.println("Testing movie analysis with sample_mflix database");
        // ... actual test implementation
    }

    /**
     * Example: Multiple database requirement
     * This test will only run if both databases are available
     */
    @Test
    @RequiresSampleData({"sample_mflix", "sample_restaurants"})
    public void testCrossDatabaseAnalysis() {
        // Test code that uses both databases
        System.out.println("Testing cross-database analysis");
        // ... actual test implementation
    }

    /**
     * Example: Database with specific collections
     * This test will only run if sample_mflix has movies and theaters collections
     */
    @Test
    @RequiresSampleData(value = "sample_mflix", collections = {"movies", "theaters"})
    public void testMovieAndTheaterData() {
        // Test code that specifically needs movies and theaters collections
        System.out.println("Testing movie and theater data");
        // ... actual test implementation
    }

    // ============================================================================
    // PROGRAMMATIC EXAMPLES
    // ============================================================================

    /**
     * Example: Programmatic single database check
     */
    @Test
    public void testProgrammaticSingleDatabase() {
        SampleDataTestHelper.ensureSampleDataOrSkip("sample_mflix");
        
        // Test code here - will only execute if sample_mflix is available
        System.out.println("Running test with sample_mflix data");
        // ... actual test implementation
    }

    /**
     * Example: Programmatic check with specific collections
     */
    @Test
    public void testProgrammaticWithCollections() {
        SampleDataTestHelper.ensureSampleDataOrSkip("sample_mflix", 
            new String[]{"movies", "users"});
        
        // Test code here - will only execute if sample_mflix has movies and users collections
        System.out.println("Running test with movie and user data");
        // ... actual test implementation
    }

    /**
     * Example: Programmatic multiple database check
     */
    @Test
    public void testProgrammaticMultipleDatabases() {
        List<String> requiredDatabases = Arrays.asList("sample_mflix", "sample_restaurants", "sample_training");
        SampleDataTestHelper.ensureSampleDataOrSkip(requiredDatabases);
        
        // Test code here - will only execute if all three databases are available
        System.out.println("Running test with multiple sample databases");
        // ... actual test implementation
    }

    /**
     * Example: Complex collection requirements per database
     */
    @Test
    public void testComplexRequirements() {
        List<String> databases = Arrays.asList("sample_mflix", "sample_restaurants");
        Map<String, List<String>> collectionsPerDatabase = Map.of(
            "sample_mflix", Arrays.asList("movies", "theaters"),
            "sample_restaurants", Arrays.asList("restaurants", "neighborhoods")
        );
        
        SampleDataTestHelper.ensureSampleDataOrSkip(databases, collectionsPerDatabase);
        
        // Test code here - will only execute if both databases have their required collections
        System.out.println("Running test with complex collection requirements");
        // ... actual test implementation
    }

    // ============================================================================
    // DIRECT AVAILABILITY CHECKING EXAMPLES
    // ============================================================================

    /**
     * Example: Direct availability checking without skipping
     * Useful when you want to conditionally run different test logic
     */
    @Test
    public void testConditionalLogic() {
        // Check if sample data is available without skipping the test
        boolean hasMflixData = SampleDataChecker.checkSampleDataAvailable("sample_mflix");
        
        if (hasMflixData) {
            System.out.println("Running full test with sample_mflix data");
            // ... test logic with sample data
        } else {
            System.out.println("Running limited test without sample data");
            // ... alternative test logic without sample data
        }
    }

    /**
     * Example: Checking multiple databases with detailed results
     */
    @Test
    public void testDetailedAvailabilityCheck() {
        List<String> databases = Arrays.asList("sample_mflix", "sample_restaurants", "sample_training");
        SampleDataAvailability result = SampleDataChecker.checkMultipleSampleDatabases(databases);
        
        System.out.println("Overall availability: " + result.isAvailable());
        System.out.println("Available databases: " + result.getAvailableDatabases());
        System.out.println("Missing databases: " + result.getMissingDatabases());
        
        // Run different test logic based on what's available
        if (result.getAvailableDatabases().contains("sample_mflix")) {
            System.out.println("Testing with movie data");
            // ... movie-specific tests
        }
        
        if (result.getAvailableDatabases().contains("sample_restaurants")) {
            System.out.println("Testing with restaurant data");
            // ... restaurant-specific tests
        }
    }

    /**
     * Example: Getting all available sample databases
     */
    @Test
    public void testDiscoverAvailableDatabases() {
        List<String> availableDatabases = SampleDataChecker.getAvailableSampleDatabases();
        
        System.out.println("Found " + availableDatabases.size() + " available sample databases:");
        for (String database : availableDatabases) {
            System.out.println("  - " + database);
        }
        
        // Run tests based on what's actually available
        if (availableDatabases.isEmpty()) {
            System.out.println("No sample data available - running basic tests only");
            // ... basic tests that don't require sample data
        } else {
            System.out.println("Sample data available - running comprehensive tests");
            // ... comprehensive tests using available sample data
        }
    }

    // ============================================================================
    // CACHE MANAGEMENT EXAMPLES
    // ============================================================================

    /**
     * Example: Cache management for dynamic testing scenarios
     */
    @Test
    public void testCacheManagement() {
        // Clear cache if sample data availability might have changed
        SampleDataChecker.clearSampleDataCache();
        
        // Now check availability (will query database again)
        boolean isAvailable = SampleDataChecker.checkSampleDataAvailable("sample_mflix");
        
        System.out.println("Fresh check result: " + isAvailable);
        // ... test implementation
    }
}
