package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// Define structs.
// type MyStruct struct { ... }

func main() {
	ctx := context.Background()
	// Replace the placeholder with your connection string.
	const uri = "<connection string>"

	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(err)
	}

	defer func() {
		if err = client.Disconnect(ctx); err != nil {
			log.Fatal(err)
		}
	}()

	aggDB := client.Database("agg_tutorials_db")

	// Get a reference to relevant collections.
	// ... someColl := aggDB.Collection("...")
	// ... anotherColl := aggDB.Collection("...")

	// Delete any existing documents in collections if needed.
	// ... someColl.DeleteMany(cxt, bson.D{})

	// Insert sample data into the collection or collections.
	// ... _, err = someColl.InsertMany(...)

	// Add code to create pipeline stages.
	// ... myStage := bson.D{{...}}

	// Create a pipeline that includes the stages.
	// ... pipeline := mongo.Pipeline{...}

	// Run the aggregation.
	// ... cursor, err := someColl.Aggregate(ctx, pipeline)

	if err != nil {
		log.Fatal(err)
	}

	defer func() {
		if err := cursor.Close(ctx); err != nil {
			log.Fatalf("failed to close cursor: %v", err)
		}
	}()

	// Decode the aggregation results.
	var results []bson.D
	if err = cursor.All(ctx, &results); err != nil {
		log.Fatalf("failed to decode results: %v", err)
	}

	// Print the aggregation results.
	for _, result := range results {
		res, _ := bson.MarshalExtJSON(result, false, false)
		fmt.Println(string(res))
	}
}
