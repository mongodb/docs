package cursor

import (
	"context"
	"testing"

	"driver-examples/examples/crud/cursor"
	"driver-examples/utils"
	"driver-examples/utils/compare"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// setupTestDB creates a MongoDB client and returns a cleanup function that
// drops the database the example creates.
func setupTestDB(t *testing.T) (*mongo.Client, func()) {
	t.Helper()
	ctx := context.Background()

	uri := utils.GetConnectionString()
	if uri == "" {
		t.Fatal("set your 'CONNECTION_STRING' environment variable")
	}

	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(clientOptions)
	if err != nil {
		t.Fatalf("failed to connect to the server: %v", err)
	}

	// The example inserts into db.sample_data. Clear any leftover documents
	// so the test starts from a known state. We use DeleteMany rather than
	// dropping the database because the deployment's user may lack
	// dropDatabase privileges.
	coll := client.Database("db").Collection("sample_data")
	if _, err := coll.DeleteMany(ctx, bson.D{}); err != nil {
		t.Fatalf("failed to clear collection: %v", err)
	}

	cleanup := func() {
		if _, err := coll.DeleteMany(ctx, bson.D{}); err != nil {
			t.Logf("failed to clean up collection: %v", err)
		}
		if err := client.Disconnect(ctx); err != nil {
			t.Logf("failed to disconnect client: %v", err)
		}
	}

	return client, cleanup
}

func TestCursor(t *testing.T) {
	tests := []struct {
		name     string
		testFunc func(t *testing.T)
	}{
		{"AccessDataFromCursor", testAccessDataFromCursor},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			_, cleanup := setupTestDB(t)
			defer cleanup()
			tt.testFunc(t)
		})
	}
}

func testAccessDataFromCursor(t *testing.T) {
	t.Helper()

	result := cursor.Cursor()
	expectedOutputFilepath := "examples/crud/cursor/output.txt"

	compare.ExpectThat(t, result).ShouldMatch(expectedOutputFilepath)
}
