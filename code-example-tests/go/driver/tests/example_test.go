// Import the package that contains the examples you want to test
package tests

import (
	"context"
	"testing"

	"driver-examples/examples"
	"driver-examples/utils"
	"driver-examples/utils/compare"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// setupTestDB creates a MongoDB client and returns cleanup function
func setupTestDB(t *testing.T) (*mongo.Client, func()) {
	t.Helper() // Mark this as a helper function for better error reporting
	ctx := context.Background()

	// Get connection string using centralized utility - handles .env loading automatically
	uri := utils.GetConnectionString()
	if uri == "" {
		t.Fatal("set your 'CONNECTION_STRING' environment variable")
	}

	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(clientOptions)
	if err != nil {
		t.Fatalf("failed to connect to the server: %v", err)
	}

	// Return cleanup function that will be called with defer
	cleanup := func() {
		// Drop the test database
		db := client.Database("your-db-name")
		if err := db.Drop(ctx); err != nil {
			t.Logf("failed to drop database: %v", err)
		}

		// Close the client connection
		if err := client.Disconnect(ctx); err != nil {
			t.Logf("failed to disconnect client: %v", err)
		}
	}

	return client, cleanup
}

// TestExampleOperations is the main test function that groups related test cases
func TestExampleOperations(t *testing.T) {
	tests := []struct {
		name     string
		testFunc func(t *testing.T)
	}{
		{"YourExampleName", testYourExampleName},
		// Add more test cases here as you create them:
		// {"AnotherExample", testAnotherExample},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Setup for each subtest (equivalent to beforeEach)
			_, cleanup := setupTestDB(t)
			defer cleanup() // Cleanup for each subtest (equivalent to afterEach)

			// Run the actual test
			tt.testFunc(t)
		})
	}
}

// testYourExampleName tests the stub example function
func testYourExampleName(t *testing.T) {
	t.Helper() // Mark this as a helper function for better error reporting

	// Execute your example function
	actualResults := examples.YourExampleName()

	// Specify the path to the expected output file
	expectedOutputFilepath := "examples/example-stub-output.txt"

	// Compare the actual results with expected output using compare options
	comparisonOptions := &compare.Options{
		IgnoreFieldValues: []string{"_id"}, // Ignore ObjectId since it's auto-generated
	}

	// For BSON.D results, use BsonDocuments (current approach):
	comparisonResult := compare.BsonDocuments(expectedOutputFilepath, actualResults, comparisonOptions)

	// Alternative: If your function returns struct types instead of []bson.D,
	// use StructDocuments for improved type safety:
	// comparisonResult = utils.StructDocuments(expectedOutputFilepath, actualResults, comparisonOptions)

	// Report test results
	if !comparisonResult.IsMatch {
		t.Errorf("Results do not match expected output: %s", comparisonResult.Error())

		// Print detailed error information for debugging
		for _, err := range comparisonResult.Errors {
			t.Errorf("  Path: %s, Expected: %s, Actual: %s, Message: %s",
				err.Path, err.Expected, err.Actual, err.Message)
		}
	}
}
