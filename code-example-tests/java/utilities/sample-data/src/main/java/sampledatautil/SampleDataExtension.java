package sampledatautil;

import org.junit.jupiter.api.extension.*;
import org.junit.jupiter.api.Assumptions;
import java.util.*;

/**
 * JUnit 5 extension that automatically skips tests when required sample data is not available.
 * This extension is automatically applied when using the @RequiresSampleData annotation.
 */
public class SampleDataExtension implements BeforeEachCallback, BeforeAllCallback {
    
    @Override
    public void beforeEach(ExtensionContext context) {
        checkAndSkip(context);
    }

    @Override
    public void beforeAll(ExtensionContext context) {
        checkAndSkip(context);
    }

    private void checkAndSkip(ExtensionContext context) {
        Optional<RequiresSampleData> annotation = findAnnotation(context);
        if (annotation.isPresent()) {
            RequiresSampleData sampleDataAnnotation = annotation.get();
            
            // Extract required databases
            List<String> requiredDatabases = extractRequiredDatabases(sampleDataAnnotation);
            List<String> requiredCollections = Arrays.asList(sampleDataAnnotation.collections());
            
            if (requiredDatabases.isEmpty()) {
                return; // No databases specified, nothing to check
            }
            
            // Show summary before checking
            SampleDataChecker.showSampleDataSummary();
            
            try {
                // Check availability
                SampleDataAvailability availability;
                if (requiredDatabases.size() == 1 && !requiredCollections.isEmpty()) {
                    // Single database with specific collections
                    boolean isAvailable = SampleDataChecker.checkSampleDataAvailable(
                        requiredDatabases.get(0), requiredCollections);
                    List<String> missing = isAvailable ? Collections.emptyList() : requiredDatabases;
                    List<String> available = isAvailable ? requiredDatabases : Collections.emptyList();
                    availability = new SampleDataAvailability(isAvailable, missing, available);
                } else if (requiredDatabases.size() == 1) {
                    // Single database with default collections
                    boolean isAvailable = SampleDataChecker.checkSampleDataAvailable(requiredDatabases.get(0));
                    List<String> missing = isAvailable ? Collections.emptyList() : requiredDatabases;
                    List<String> available = isAvailable ? requiredDatabases : Collections.emptyList();
                    availability = new SampleDataAvailability(isAvailable, missing, available);
                } else {
                    // Multiple databases
                    Map<String, List<String>> collectionsPerDatabase = null;
                    if (!requiredCollections.isEmpty()) {
                        // Apply same collections to all databases
                        collectionsPerDatabase = new HashMap<>();
                        for (String db : requiredDatabases) {
                            collectionsPerDatabase.put(db, requiredCollections);
                        }
                    }
                    availability = SampleDataChecker.checkMultipleSampleDatabases(
                        requiredDatabases, collectionsPerDatabase);
                }
                
                if (!availability.isAvailable()) {
                    String missingDatabasesList = String.join(", ", availability.getMissingDatabases());
                    String collectionsInfo = requiredCollections.isEmpty() ? "" : 
                        " (collections: " + String.join(", ", requiredCollections) + ")";
                    String message = "Missing required sample data: " + missingDatabasesList + collectionsInfo;
                    
                    System.out.println("\n⚠️  " + message);
                    Assumptions.assumeTrue(false, message);
                }
            } catch (Exception e) {
                // If we can't connect to check, assume data is not available
                String message = "Could not connect to MongoDB to check sample data availability: " + e.getMessage();
                System.out.println("\n⚠️  " + message);
                Assumptions.assumeTrue(false, message);
            }
        }
    }

    private List<String> extractRequiredDatabases(RequiresSampleData annotation) {
        List<String> databases = new ArrayList<>();
        
        // Check value array first (takes precedence)
        if (annotation.value().length > 0) {
            databases.addAll(Arrays.asList(annotation.value()));
        } else if (!annotation.database().isEmpty()) {
            // Fall back to single database field
            databases.add(annotation.database());
        }
        
        return databases;
    }

    private Optional<RequiresSampleData> findAnnotation(ExtensionContext context) {
        // Check method annotation first
        Optional<RequiresSampleData> methodAnnotation = context.getElement()
            .flatMap(element -> Optional.ofNullable(element.getAnnotation(RequiresSampleData.class)));
        if (methodAnnotation.isPresent()) {
            return methodAnnotation;
        }
        
        // Fall back to class annotation
        return context.getTestClass()
            .flatMap(testClass -> Optional.ofNullable(testClass.getAnnotation(RequiresSampleData.class)));
    }
}
