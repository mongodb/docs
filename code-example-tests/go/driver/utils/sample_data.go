package utils

import (
	"context"
	"fmt"
	"log"
	"strings"
	"sync"
	"testing"
	"time"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// SampleDatabases defines the standard MongoDB sample databases and their expected collections
var SampleDatabases = map[string][]string{
	"sample_mflix":       {"movies", "theaters", "users", "comments", "sessions"},
	"sample_restaurants": {"restaurants", "neighborhoods"},
	"sample_training":    {"posts", "companies", "inspections", "routes", "trips", "grades", "zips"},
	"sample_analytics":   {"customers", "accounts", "transactions"},
	"sample_airbnb":      {"listingsAndReviews"},
	"sample_geospatial":  {"shipwrecks"},
	"sample_guides":      {"planets", "comets"},
	"sample_stores":      {"sales"},
	"sample_supplies":    {"sales"},
	"sample_weatherdata": {"data"},
}

// SampleDataChecker handles sample data availability detection and caching
type SampleDataChecker struct {
	cache        map[string]bool
	cacheMutex   sync.RWMutex
	summaryShown bool
	summaryMutex sync.Mutex
}

// NewSampleDataChecker creates a new sample data checker instance
func NewSampleDataChecker() *SampleDataChecker {
	return &SampleDataChecker{
		cache: make(map[string]bool),
	}
}

// Global instance for easy access
var globalSampleChecker = NewSampleDataChecker()

// getConnectionString loads the connection string using the centralized environment loader
func (sdc *SampleDataChecker) getConnectionString() string {
	return GetConnectionString()
}

// checkSampleDataAvailable checks if a specific sample database and its collections exist
func (sdc *SampleDataChecker) checkSampleDataAvailable(databaseName string, requiredCollections []string) bool {
	// Use default collections if none specified
	collectionsToCheck := requiredCollections
	if collectionsToCheck == nil {
		if defaultCollections, exists := SampleDatabases[databaseName]; exists {
			collectionsToCheck = defaultCollections
		}
	}

	// Create cache key
	cacheKey := fmt.Sprintf("%s:%v", databaseName, collectionsToCheck)

	// Check cache first
	sdc.cacheMutex.RLock()
	if cached, exists := sdc.cache[cacheKey]; exists {
		sdc.cacheMutex.RUnlock()
		return cached
	}
	sdc.cacheMutex.RUnlock()

	// Check database availability
	available := sdc.performDatabaseCheck(databaseName, collectionsToCheck)

	// Cache result
	sdc.cacheMutex.Lock()
	sdc.cache[cacheKey] = available
	sdc.cacheMutex.Unlock()

	return available
}

// performDatabaseCheck performs the actual database and collection existence check
func (sdc *SampleDataChecker) performDatabaseCheck(databaseName string, collections []string) bool {
	connectionString := sdc.getConnectionString()
	if connectionString == "" {
		log.Printf("⚠️  sample data check for %q: CONNECTION_STRING is empty — check that .env is loaded", databaseName)
		return false
	}

	// 10s covers the full operation (connect + ListCollectionNames). Unlike Java/Python,
	// which set 2s per-socket timeouts on the client, Go's v2 driver relies on context
	// cancellation as its primary timeout mechanism, so this ceiling is set higher.
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(options.Client().ApplyURI(connectionString))
	if err != nil {
		log.Printf("⚠️  sample data check for %q: connect error: %v", databaseName, err)
		return false
	}
	defer func() {
		if err := client.Disconnect(ctx); err != nil {
			log.Printf("Failed to disconnect MongoDB client: %v", err)
		}
	}()

	// Check if database exists and collections are accessible by listing
	// collections directly. This avoids requiring the cluster-level
	// listDatabases privilege that Atlas M0 users often lack.
	database := client.Database(databaseName)
	existingCollections, err := database.ListCollectionNames(ctx, map[string]interface{}{})
	if err != nil {
		log.Printf("⚠️  sample data check for %q: ListCollectionNames error: %v", databaseName, err)
		return false
	}
	if len(existingCollections) == 0 {
		log.Printf("⚠️  sample data check for %q: no collections found (database may not exist or user may lack listCollections privilege)", databaseName)
		return false
	}

	// Check collections if specified
	if len(collections) > 0 {
		// Convert to map for faster lookup
		collectionMap := make(map[string]bool)
		for _, col := range existingCollections {
			collectionMap[col] = true
		}

		// Check if all required collections exist
		for _, reqCol := range collections {
			if !collectionMap[reqCol] {
				log.Printf("⚠️  sample data check for %q: missing collection %q (found: %v)", databaseName, reqCol, existingCollections)
				return false
			}
		}
	}

	return true
}

// showSampleDataSummary shows a helpful summary of sample data availability (only once per test run)
func (sdc *SampleDataChecker) showSampleDataSummary() {
	sdc.summaryMutex.Lock()
	defer sdc.summaryMutex.Unlock()

	if sdc.summaryShown {
		return
	}
	sdc.summaryShown = true

	connectionString := sdc.getConnectionString()

	if connectionString == "" {
		log.Println("📊 Sample Data Status: No CONNECTION_STRING environment variable set")
		log.Println("   Some tests may be skipped.")
		return
	}

	availableDatabases := sdc.getAvailableSampleDatabases()

	if len(availableDatabases) == 0 {
		log.Println("📊 Sample Data Status: No MongoDB sample databases found")
		log.Println("   Some tests may be skipped. To load sample data:")
		log.Println("   • Atlas: https://www.mongodb.com/docs/atlas/sample-data/")
		log.Println("   • Local: Use mongorestore with sample data archive")
	} else {
		log.Printf("📊 Sample Data Status: %d database(s) available", len(availableDatabases))
		log.Printf("   Found: %s", strings.Join(availableDatabases, ", "))
	}
}

// getAvailableSampleDatabases returns a list of available sample databases
func (sdc *SampleDataChecker) getAvailableSampleDatabases() []string {
	var available []string
	for dbName := range SampleDatabases {
		if sdc.checkSampleDataAvailable(dbName, nil) {
			available = append(available, dbName)
		}
	}
	return available
}

// RequiresSampleData checks if required sample databases are available and skips the test if not
// This function integrates with Go's testing framework using t.Skip()
//
// Example usage:
//
//	func TestMovieAggregation(t *testing.T) {
//	    RequiresSampleData(t, "sample_mflix")
//	    // Test implementation here - will only run if sample_mflix is available
//	}
//
//	func TestCrossDatabase(t *testing.T) {
//	    RequiresSampleData(t, "sample_mflix", "sample_restaurants")
//	    // Test implementation here - will only run if both databases are available
//	}
func RequiresSampleData(t *testing.T, requiredDatabases ...string) {
	t.Helper() // Mark as test helper for better error reporting

	// Show summary on first use
	globalSampleChecker.showSampleDataSummary()

	var missingDatabases []string
	for _, dbName := range requiredDatabases {
		if !globalSampleChecker.checkSampleDataAvailable(dbName, nil) {
			missingDatabases = append(missingDatabases, dbName)
		}
	}

	if len(missingDatabases) > 0 {
		t.Skipf("⚠️  Skipping test - Missing sample databases: %s", strings.Join(missingDatabases, ", "))
	}
}

// RequiresSampleDataWithCollections checks if specific collections in sample databases are available
//
// Example usage:
//
//	func TestMovieGenres(t *testing.T) {
//	    RequiresSampleDataWithCollections(t, map[string][]string{
//	        "sample_mflix": {"movies", "theaters"},
//	    })
//	    // Test implementation here
//	}
func RequiresSampleDataWithCollections(t *testing.T, requirements map[string][]string) {
	t.Helper() // Mark as test helper for better error reporting

	// Show summary on first use
	globalSampleChecker.showSampleDataSummary()

	var missingItems []string
	for dbName, collections := range requirements {
		if !globalSampleChecker.checkSampleDataAvailable(dbName, collections) {
			missingItems = append(missingItems, fmt.Sprintf("%s[%s]", dbName, strings.Join(collections, ",")))
		}
	}

	if len(missingItems) > 0 {
		t.Skipf("⚠️  Skipping test - Missing sample data: %s", strings.Join(missingItems, ", "))
	}
}

// WithSampleDataTest creates a subtest wrapper that handles sample data requirements
// This integrates with the existing subtest pattern used in the project
//
// Example usage:
//
//	func TestAggregationPipelines(t *testing.T) {
//	    tests := []struct {
//	        name           string
//	        testFunc       func(t *testing.T)
//	        sampleDatabase string // Add this field
//	    }{
//	        {"FilterTutorial", testFilterTutorial, ""},
//	        {"MovieAggregation", testMovieAggregation, "sample_mflix"},
//	    }
//
//	    for _, tt := range tests {
//	        WithSampleDataTest(t, tt.name, tt.testFunc, tt.sampleDatabase)
//	    }
//	}
func WithSampleDataTest(t *testing.T, name string, testFunc func(t *testing.T), requiredDatabases ...string) {
	t.Run(name, func(t *testing.T) {
		if len(requiredDatabases) > 0 && requiredDatabases[0] != "" {
			RequiresSampleData(t, requiredDatabases...)
		}
		testFunc(t)
	})
}

// CheckSampleDataAvailable provides a public function to check sample data availability
// without skipping tests (useful for conditional logic within tests)
func CheckSampleDataAvailable(databaseName string) bool {
	return globalSampleChecker.checkSampleDataAvailable(databaseName, nil)
}

// ClearSampleDataCache clears the sample data availability cache
// Useful for testing or when sample data availability may have changed
func ClearSampleDataCache() {
	globalSampleChecker.cacheMutex.Lock()
	defer globalSampleChecker.cacheMutex.Unlock()
	globalSampleChecker.cache = make(map[string]bool)
}
