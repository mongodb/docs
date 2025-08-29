package utils

import (
	"os"
	"testing"
)

func TestSampleDataChecker(t *testing.T) {
	// Save original connection string
	originalConnectionString := os.Getenv("CONNECTION_STRING")
	defer func() {
		if originalConnectionString != "" {
			os.Setenv("CONNECTION_STRING", originalConnectionString)
		} else {
			os.Unsetenv("CONNECTION_STRING")
		}
	}()

	t.Run("WithoutConnectionString", func(t *testing.T) {
		os.Unsetenv("CONNECTION_STRING")
		checker := NewSampleDataChecker()

		// Should return false when no connection string is available
		available := checker.checkSampleDataAvailable("sample_mflix", nil)
		if available {
			t.Error("Expected sample data check to return false when no CONNECTION_STRING is set")
		}
	})

	t.Run("CacheKeyGeneration", func(t *testing.T) {
		checker := NewSampleDataChecker()

		// Test that different parameters create different cache entries
		checker.cache["sample_mflix:[]"] = true
		checker.cache["sample_mflix:[movies]"] = false

		if len(checker.cache) != 2 {
			t.Errorf("Expected 2 cache entries, got %d", len(checker.cache))
		}
	})

	t.Run("ClearCache", func(t *testing.T) {
		// Add some entries to global cache
		globalSampleChecker.cache["test_key"] = true

		ClearSampleDataCache()

		if len(globalSampleChecker.cache) != 0 {
			t.Errorf("Expected cache to be empty after clearing, got %d entries", len(globalSampleChecker.cache))
		}
	})
}

func TestCheckSampleDataAvailable(t *testing.T) {
	// This test will run regardless of actual sample data availability
	// It's testing the public API function
	result := CheckSampleDataAvailable("sample_mflix")

	// Result can be true or false depending on environment
	// We're just testing that the function doesn't panic or error
	_ = result
}

// Example of how to use RequiresSampleData in actual tests
func ExampleRequiresSampleData() {
	// This would be used in an actual test function
	// func TestMovieOperations(t *testing.T) {
	//     RequiresSampleData(t, "sample_mflix")
	//
	//     // Test implementation here - only runs if sample_mflix is available
	//     // If sample data is missing, test is skipped with clear message
	// }
}

// Example of how to use RequiresSampleDataWithCollections in actual tests
func ExampleRequiresSampleDataWithCollections() {
	// This would be used in an actual test function
	// func TestSpecificCollections(t *testing.T) {
	//     RequiresSampleDataWithCollections(t, map[string][]string{
	//         "sample_mflix": {"movies", "theaters"},
	//         "sample_restaurants": {"restaurants"},
	//     })
	//
	//     // Test implementation here - only runs if specified collections exist
	// }
}

// Example of integrating with existing subtest patterns
func ExampleWithSampleDataTest() {
	// This shows how to integrate with the existing test patterns
	// func TestAggregationPipelines(t *testing.T) {
	//     tests := []struct {
	//         name           string
	//         testFunc       func(t *testing.T)
	//         sampleDatabase string
	//     }{
	//         {"FilterTutorial", testFilterTutorial, ""},
	//         {"MovieAggregation", testMovieAggregation, "sample_mflix"},
	//         {"RestaurantSearch", testRestaurantSearch, "sample_restaurants"},
	//     }
	//
	//     for _, tt := range tests {
	//         WithSampleDataTest(t, tt.name, func(t *testing.T) {
	//             _, cleanup := setupTestDB(t)
	//             defer cleanup()
	//             tt.testFunc(t)
	//         }, tt.sampleDatabase)
	//     }
	// }
}
