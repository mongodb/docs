package sampledatautil;

import org.junit.jupiter.api.Assumptions;
import java.util.*;

/**
 * Helper class to check sample data availability and skip tests as needed.
 * Provides programmatic methods for tests that need fine-grained control over sample data checking.
 */
public class SampleDataTestHelper {
    
    /**
     * Ensures required sample data is available or skips the current test with a clear message.
     * 
     * @param database The sample database name required for the test
     * @param collections Specific collections required within the database
     */
    public static void ensureSampleDataOrSkip(String database, String... collections) {
        ensureSampleDataOrSkip(database, Arrays.asList(collections));
    }
    
    /**
     * Ensures required sample data is available or skips the current test with a clear message.
     * 
     * @param database The sample database name required for the test
     * @param collections List of specific collections required within the database
     */
    public static void ensureSampleDataOrSkip(String database, List<String> collections) {
        SampleDataChecker.showSampleDataSummary();
        
        try {
            boolean isAvailable = collections.isEmpty() ? 
                SampleDataChecker.checkSampleDataAvailable(database) :
                SampleDataChecker.checkSampleDataAvailable(database, collections);
            
            if (!isAvailable) {
                String collectionsInfo = collections.isEmpty() ? "" : 
                    " (collections: " + String.join(", ", collections) + ")";
                String message = "Missing required sample data: " + database + collectionsInfo;
                
                System.out.println("\n⚠️  " + message);
                Assumptions.assumeTrue(false, message);
            }
        } catch (Exception e) {
            String message = "Could not connect to MongoDB to check sample data availability: " + e.getMessage();
            System.out.println("\n⚠️  " + message);
            Assumptions.assumeTrue(false, message);
        }
    }
    
    /**
     * Ensures required sample data is available or skips the current test with a clear message.
     * 
     * @param database The sample database name required for the test
     */
    public static void ensureSampleDataOrSkip(String database) {
        ensureSampleDataOrSkip(database, Collections.emptyList());
    }
    
    /**
     * Ensures multiple sample databases are available or skips the current test with a clear message.
     * 
     * @param databases List of sample database names required for the test
     */
    public static void ensureSampleDataOrSkip(List<String> databases) {
        ensureSampleDataOrSkip(databases, null);
    }
    
    /**
     * Ensures multiple sample databases are available or skips the current test with a clear message.
     * 
     * @param databases List of sample database names required for the test
     * @param collectionsPerDatabase Map of database names to required collections
     */
    public static void ensureSampleDataOrSkip(List<String> databases, Map<String, List<String>> collectionsPerDatabase) {
        if (databases.isEmpty()) {
            return; // Nothing to check
        }
        
        SampleDataChecker.showSampleDataSummary();
        
        try {
            SampleDataAvailability availability = SampleDataChecker.checkMultipleSampleDatabases(
                databases, collectionsPerDatabase);
            
            if (!availability.isAvailable()) {
                String missingDatabasesList = String.join(", ", availability.getMissingDatabases());
                String message = "Missing required sample data: " + missingDatabasesList;
                
                System.out.println("\n⚠️  " + message);
                Assumptions.assumeTrue(false, message);
            }
        } catch (Exception e) {
            String message = "Could not connect to MongoDB to check sample data availability: " + e.getMessage();
            System.out.println("\n⚠️  " + message);
            Assumptions.assumeTrue(false, message);
        }
    }
    
    /**
     * Ensures multiple sample databases are available or skips the current test with a clear message.
     * 
     * @param database1 First required database
     * @param database2 Second required database
     * @param additionalDatabases Additional required databases
     */
    public static void ensureSampleDataOrSkip(String database1, String database2, String... additionalDatabases) {
        List<String> allDatabases = new ArrayList<>();
        allDatabases.add(database1);
        allDatabases.add(database2);
        allDatabases.addAll(Arrays.asList(additionalDatabases));
        ensureSampleDataOrSkip(allDatabases);
    }
}
