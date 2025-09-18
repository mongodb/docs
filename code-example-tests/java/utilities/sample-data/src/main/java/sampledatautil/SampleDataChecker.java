package sampledatautil;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

/**
 * Utility for checking MongoDB sample data availability and conditionally skipping tests.
 * 
 * This class provides methods to automatically skip tests when sample data is missing,
 * with clear feedback about what's missing and how to fix it.
 */
public class SampleDataChecker {
    private static final String DEFAULT_CONN_STRING_ENV = "CONNECTION_STRING";
    
    /**
     * Standard MongoDB sample database names and their expected collections
     */
    public static final Map<String, List<String>> STANDARD_SAMPLE_DATABASES = Map.of(
        "sample_mflix", List.of("movies", "theaters", "users", "comments", "sessions"),
        "sample_restaurants", List.of("restaurants", "neighborhoods"),
        "sample_training", List.of("posts", "companies", "inspections", "routes", "trips", "grades", "zips"),
        "sample_analytics", List.of("customers", "accounts", "transactions"),
        "sample_airbnb", List.of("listingsAndReviews"),
        "sample_geospatial", List.of("shipwrecks"),
        "sample_guides", List.of("planets", "comets"),
        "sample_stores", List.of("sales"),
        "sample_supplies", List.of("sales"),
        "sample_weatherdata", List.of("data")
    );

    /**
     * Cache for sample data availability to avoid repeated database queries
     */
    private static final Map<String, Boolean> sampleDataCache = new ConcurrentHashMap<>();
    
    /**
     * Global flag to track if we've shown sample data availability summary
     */
    private static volatile boolean hasShownSummary = false;
    private static final Object summaryLock = new Object();
    
    private static MongoClient mongoClient = null;
    private static String overrideConnectionString = null;

    /**
     * For testing: override the connection string used by the checker.
     * Pass null to clear the override and use the environment variable.
     */
    public static void setConnectionStringOverride(String uri) {
        overrideConnectionString = uri;
        if (mongoClient != null) {
            mongoClient.close();
            mongoClient = null;
        }
    }

    /**
     * Clears the sample data availability cache.
     * Useful for testing or when sample data availability may have changed.
     */
    public static void clearSampleDataCache() {
        sampleDataCache.clear();
        hasShownSummary = false;
        if (mongoClient != null) {
            mongoClient.close();
            mongoClient = null;
        }
    }

    /**
     * Creates a MongoDB client with appropriate timeouts for testing
     */
    private static MongoClient createClientWithTimeouts(String connectionString) {
        MongoClientSettings settings = MongoClientSettings.builder()
            .applyConnectionString(new ConnectionString(connectionString))
            .applyToClusterSettings(builder -> 
                builder.serverSelectionTimeout(2000, TimeUnit.MILLISECONDS))
            .applyToSocketSettings(builder -> 
                builder.connectTimeout(2000, TimeUnit.MILLISECONDS)
                      .readTimeout(2000, TimeUnit.MILLISECONDS))
            .build();
        return MongoClients.create(settings);
    }

    private static MongoClient getClient() {
        if (mongoClient == null) {
            String uri = loadConnectionString();
            if (uri == null || uri.isEmpty()) {
                throw new IllegalStateException("No MongoDB connection string found in environment variable '" + DEFAULT_CONN_STRING_ENV + "'.");
            }
            mongoClient = createClientWithTimeouts(uri);
        }
        return mongoClient;
    }

    private static String loadConnectionString() {
        // Try override first
        if (overrideConnectionString != null) {
            if (overrideConnectionString.isEmpty()) {
                return null; // Return null for empty string to trigger the exception later
            }
            return overrideConnectionString;
        }
        
        // Fall back to system environment
        return System.getenv(DEFAULT_CONN_STRING_ENV);
    }

    /**
     * Shows a helpful summary of sample data availability (only once per test run).
     * Returns immediately if already shown to avoid duplicate logging.
     */
    public static void showSampleDataSummary() {
        if (hasShownSummary) return;

        synchronized (summaryLock) {
            if (hasShownSummary) return;
            hasShownSummary = true;
        }

        try {
            List<String> availableDatabases = getAvailableSampleDatabases();

            if (availableDatabases.isEmpty()) {
                System.out.println("\n📊 Sample Data Status: No MongoDB sample databases found");
                System.out.println("   Some tests may be skipped. To load sample data:");
                System.out.println("   • Atlas: https://www.mongodb.com/docs/atlas/sample-data/");
                System.out.println("   • Local: Use mongorestore with sample data archive\n");
            } else {
                System.out.println(String.format("\n📊 Sample Data Status: %d database(s) available", availableDatabases.size()));
                System.out.println(String.format("   Found: %s\n", String.join(", ", availableDatabases)));
            }
        } catch (Exception e) {
            // Silently fail - we don't want to break test runs over this
        }
    }

    /**
     * Checks if a specific sample database and its expected collections exist
     * 
     * @param databaseName The sample database name to check
     * @param requiredCollections Optional list of specific collections to verify
     * @return True if the sample database and collections exist
     */
    public static boolean checkSampleDataAvailable(String databaseName, List<String> requiredCollections) {
        List<String> collectionsToCheck = requiredCollections != null ? requiredCollections 
            : STANDARD_SAMPLE_DATABASES.getOrDefault(databaseName, Collections.emptyList());
        
        String collectionsKey = collectionsToCheck.stream().sorted().collect(Collectors.joining(","));
        String cacheKey = databaseName + ":" + collectionsKey;

        return sampleDataCache.computeIfAbsent(cacheKey, key -> {
            try {
                MongoClient client = getClient();

                // Check if database exists
                List<String> databases = new ArrayList<>();
                client.listDatabaseNames().into(databases);
                
                if (!databases.contains(databaseName)) {
                    return false;
                }

                // Check collections if specified
                if (!collectionsToCheck.isEmpty()) {
                    List<String> existingCollections = new ArrayList<>();
                    client.getDatabase(databaseName).listCollectionNames().into(existingCollections);

                    for (String collection : collectionsToCheck) {
                        if (!existingCollections.contains(collection)) {
                            return false;
                        }
                    }
                }

                return true;
            } catch (Exception e) {
                // Quietly handle connection errors - this is expected when MongoDB is not available
                return false;
            }
        });
    }

    /**
     * Checks if a specific sample database and its expected collections exist
     * 
     * @param databaseName The sample database name to check
     * @return True if the sample database exists with default collections
     */
    public static boolean checkSampleDataAvailable(String databaseName) {
        return checkSampleDataAvailable(databaseName, null);
    }

    /**
     * Checks if any of the standard MongoDB sample databases are available
     * 
     * @return List of available sample database names
     */
    public static List<String> getAvailableSampleDatabases() {
        List<CompletableFuture<String>> futures = STANDARD_SAMPLE_DATABASES.keySet().stream()
            .map(dbName -> CompletableFuture.supplyAsync(() -> {
                if (checkSampleDataAvailable(dbName)) {
                    return dbName;
                }
                return null;
            }))
            .collect(Collectors.toList());

        return futures.stream()
            .map(CompletableFuture::join)
            .filter(Objects::nonNull)
            .collect(Collectors.toList());
    }

    /**
     * Checks if multiple sample databases are available
     * 
     * @param requiredDatabases The sample database names to check
     * @param collectionsPerDatabase Optional map of database names to required collections
     * @return SampleDataAvailability result containing availability status and missing databases
     */
    public static SampleDataAvailability checkMultipleSampleDatabases(
            List<String> requiredDatabases,
            Map<String, List<String>> collectionsPerDatabase) {
        
        List<CompletableFuture<DatabaseCheckResult>> futures = requiredDatabases.stream()
            .map(dbName -> CompletableFuture.supplyAsync(() -> {
                List<String> requiredCollections = collectionsPerDatabase != null 
                    ? collectionsPerDatabase.get(dbName) : null;
                boolean isAvailable = checkSampleDataAvailable(dbName, requiredCollections);
                return new DatabaseCheckResult(dbName, isAvailable);
            }))
            .collect(Collectors.toList());

        List<DatabaseCheckResult> results = futures.stream()
            .map(CompletableFuture::join)
            .collect(Collectors.toList());

        List<String> missingDatabases = results.stream()
            .filter(r -> !r.isAvailable())
            .map(DatabaseCheckResult::databaseName)
            .collect(Collectors.toList());

        List<String> availableDatabases = results.stream()
            .filter(DatabaseCheckResult::isAvailable)
            .map(DatabaseCheckResult::databaseName)
            .collect(Collectors.toList());

        return new SampleDataAvailability(
            missingDatabases.isEmpty(),
            missingDatabases,
            availableDatabases
        );
    }

    /**
     * Checks if multiple sample databases are available
     * 
     * @param requiredDatabases The sample database names to check
     * @return SampleDataAvailability result containing availability status and missing databases
     */
    public static SampleDataAvailability checkMultipleSampleDatabases(List<String> requiredDatabases) {
        return checkMultipleSampleDatabases(requiredDatabases, null);
    }

    /**
     * Internal record for database check results
     */
    private record DatabaseCheckResult(String databaseName, boolean isAvailable) {}
}
