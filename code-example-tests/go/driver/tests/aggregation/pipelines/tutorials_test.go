package pipelines

import (
	"context"
	"driver-examples/examples/aggregation/pipelines/filter"
	"driver-examples/examples/aggregation/pipelines/group"
	"driver-examples/examples/aggregation/pipelines/join_multi_field"
	"driver-examples/examples/aggregation/pipelines/join_one_to_one"
	"driver-examples/examples/aggregation/pipelines/unwind"
	"driver-examples/utils"
	"driver-examples/utils/compare"
	"testing"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// setupTestDB creates a MongoDB client and returns cleanup function
func setupTestDB(t *testing.T) (*mongo.Client, func()) {
	t.Helper() // Mark this as a helper function for better error reporting
	ctx := context.Background()

	// Get connection string using utility
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
		db := client.Database("agg_tutorials_db")
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

func TestAggregationPipelines(t *testing.T) {
	tests := []struct {
		name     string
		testFunc func(t *testing.T)
	}{
		{"FilterTutorial", testFilterTutorial},
		{"GroupTutorial", testGroupTutorial},
		{"UnwindTutorial", testUnwindTutorial},
		{"JoinOneToOneTutorial", testJoinOneToOneTutorial},
		{"JoinMultiFieldTutorial", testJoinMultiFieldTutorial},
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

func testFilterTutorial(t *testing.T) {
	t.Helper() // Mark this as a helper function for better error reporting

	// Run your test logic
	filter.LoadData()
	result := filter.RunPipeline()
	expectedOutputFilepath := "examples/aggregation/pipelines/filter/output.txt"

	// Compare the actual results with expected output using the new fluent API
	compare.ExpectThat(t, result).ShouldMatch(expectedOutputFilepath)
}

func testGroupTutorial(t *testing.T) {
	t.Helper() // Mark this as a helper function for better error reporting

	// Run your test logic
	group.LoadData()
	result := group.RunPipeline()
	expectedOutputFilepath := "examples/aggregation/pipelines/group/output.txt"

	// Compare the actual results with expected output using the comparison utility
	compare.ExpectThat(t, result).ShouldMatch(expectedOutputFilepath)
}

func testUnwindTutorial(t *testing.T) {
	t.Helper() // Mark this as a helper function for better error reporting

	// Run your test logic
	unwind.LoadData()
	result := unwind.RunPipeline()
	expectedOutputFilepath := "examples/aggregation/pipelines/unwind/output.txt"

	// Compare the actual results with expected output using the comparison utility
	compare.ExpectThat(t, result).ShouldMatch(expectedOutputFilepath)
}

func testJoinOneToOneTutorial(t *testing.T) {
	t.Helper() // Mark this as a helper function for better error reporting

	// Run your test logic
	join_one_to_one.LoadData()
	result := join_one_to_one.RunPipeline()
	expectedOutputFilepath := "examples/aggregation/pipelines/join_one_to_one/output.txt"

	// Compare the actual results with expected output using the comparison utility
	compare.ExpectThat(t, result).ShouldMatch(expectedOutputFilepath)
}

func testJoinMultiFieldTutorial(t *testing.T) {
	t.Helper() // Mark this as a helper function for better error reporting

	// Run your test logic
	join_multi_field.LoadData()
	result := join_multi_field.RunPipeline()
	expectedOutputFilepath := "examples/aggregation/pipelines/join_multi_field/output.txt"

	// Compare the actual results with expected output using the comparison utility
	compare.ExpectThat(t, result).ShouldMatch(expectedOutputFilepath)
}
