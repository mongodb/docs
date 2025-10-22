package pipelines

import (
	"context"
	"driver-examples/utils/compare"
	"testing"

	"driver-examples/examples/aggregation/pipelines"
	"driver-examples/utils"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// setupTest creates a MongoDB client and returns cleanup function
func setupTemplateAppTest(t *testing.T) (*mongo.Client, func()) {
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

func TestTemplateApp(t *testing.T) {
	tests := []struct {
		name     string
		testFunc func(t *testing.T)
	}{
		{"TemplateApp", testTemplateApp},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Setup for each subtest (equivalent to beforeEach)
			_, cleanup := setupTemplateAppTest(t)
			defer cleanup() // Cleanup for each subtest (equivalent to afterEach)

			// Run the actual test
			tt.testFunc(t)
		})
	}
}

func testTemplateApp(t *testing.T) {
	t.Helper() // Mark this as a helper function for better error reporting

	results := pipelines.RunTemplateApp()
	expectedOutput := []bson.D{
		{
			{Key: "message", Value: "This is some example data for the template app."},
			{Key: "timestamp", Value: "2023-01-01T00:00:00Z"},
		},
	}

	compare.ExpectThat(t, results).ShouldMatch(expectedOutput)
}
