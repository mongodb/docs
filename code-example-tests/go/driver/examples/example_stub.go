// THIS IS AN EXAMPLE. DO NOT USE ON A PAGE.
// You can copy this to get started on making a new Go code example.
// See https://mongodb-university.github.io/Bluehawk/ for more info on Bluehawk.

package examples

import (
	"context"
	"log"

	"driver-examples/utils"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// Write your code example inside a function that you can call from a corresponding test.
// When you call the function in the test, this executes the code example.
// The function should return meaningful output so the test can validate the
// output to confirm that the code works.

// YourExampleName demonstrates a basic MongoDB operation
// Replace this function name and implementation with your actual example
func YourExampleName() []bson.D {
	ctx := context.Background()

	// Replace the placeholder with your connection string from environment
	uri := utils.GetConnectionString()
	if uri == "" {
		log.Fatal("set your 'CONNECTION_STRING' environment variable")
	}

	// Create MongoDB client
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(clientOptions)
	if err != nil {
		log.Fatalf("failed to connect to the server: %v", err)
	}
	defer func() { _ = client.Disconnect(ctx) }()

	// The text string after the :snippet-start: tag is used in the name of the snippet.
	// It should be a unique identifier within this example file.
	// For this snippet, the filename will be: example-stub.snippet.stub-mongo-operation.go
	// :snippet-start: stub-mongo-operation
	db := client.Database("your-db-name")
	collection := db.Collection("your-collection-name")

	// Insert a sample document
	doc := bson.D{
		{Key: "message", Value: "Stub example. Do not use in a literal include."},
		{Key: "timestamp", Value: "2023-01-01T00:00:00Z"},
	}

	result, err := collection.InsertOne(ctx, doc)
	if err != nil {
		log.Fatalf("failed to insert document: %v", err)
	}

	// :remove-start:
	// Unnecessary code for tests. You can use the remove syntax to omit it from output.
	log.Printf("Inserted document with ID: %v", result.InsertedID)
	// :remove-end:

	// Be careful of whitespace when using 'remove'. There will be 2 newlines above this.

	// :snippet-end:
	// The rest of the file will not be included in the snippet!

	// Query the inserted document to return as test output
	var documents []bson.D
	cursor, err := collection.Find(ctx, bson.D{})
	if err != nil {
		log.Fatalf("failed to find documents: %v", err)
	}
	defer func() { _ = cursor.Close(ctx) }()

	if err = cursor.All(ctx, &documents); err != nil {
		log.Fatalf("failed to decode documents: %v", err)
	}

	// If we show output in the documentation, return the documents so the
	// test can validate the output. Create a matching output file that contains
	// the expected output. The compare utility will confirm that the code
	// outputs what we show in the docs. The utility supports both []bson.D
	// and []YourCustomStruct.
	return documents
}
