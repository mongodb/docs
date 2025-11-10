//		:replace-start: {
//		  "terms": {
//		    "pipelines": "main",
//		    "RunTemplateApp": "main",
//	        "[]bson.D {": "{"
//		  }
//		}
package pipelines

import (
	"context"
	"fmt"
	"log"

	"driver-examples/utils" // :remove:

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// Define structs.
// type MyStruct struct { ... }

func RunTemplateApp() []bson.D {
	ctx := context.Background()
	// Replace the placeholder with your connection string.
	// :uncomment-start:
	//const uri = "<connection string>"
	// :uncomment-end:
	// :remove-start:
	uri := utils.GetConnectionString()
	if uri == "" {
		log.Fatal("set your 'CONNECTION_STRING' environment variable.")
	}
	// :remove-end:

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
	someColl := aggDB.Collection("some_coll") // :remove:
	// ... anotherColl := aggDB.Collection("...")

	// Delete any existing documents in collections if needed.
	// ... someColl.DeleteMany(cxt, bson.D{})
	someColl.DeleteMany(ctx, bson.D{}) // :remove:

	// Insert sample data into the collection or collections.
	// ... _, err = someColl.InsertMany(...)
	// :remove-start:
	someData := bson.D{
		{Key: "message", Value: "This is some example data for the template app."},
		{Key: "timestamp", Value: "2023-01-01T00:00:00Z"},
	}
	_, err = someColl.InsertMany(ctx, []any{someData})
	// :remove-end:

	// Add code to create pipeline stages.
	// ... myStage := bson.D{{...}}
	// :remove-start:
	match := bson.D{{"$match", bson.D{{"message", "This is some example data for the template app."}}}}
	project := bson.D{{
		"$project", bson.D{
			{Key: "_id", Value: 0},
		},
	}}
	// :remove-end:

	// Create a pipeline that includes the stages.
	// ... pipeline := mongo.Pipeline{...}
	pipeline := mongo.Pipeline{match, project} // :remove:

	// Run the aggregation.
	// ... cursor, err := someColl.Aggregate(ctx, pipeline)
	cursor, err := someColl.Aggregate(ctx, pipeline) // :remove:

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
	return results // :remove:
}

// :replace-end:
