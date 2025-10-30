package main

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	var err error
	// connect to the Atlas cluster
	ctx := context.Background()
	// Retrieves your Atlas connection string
	uri := os.Getenv("MONGODB_ATLAS_URI")
	if uri == "" {
		log.Fatal("MONGODB_ATLAS_URI environment variable is not set")
	}
	client, err := mongo.Connect(options.Client().SetTimeout(5 * time.Second).ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(ctx)

	// set namespace
	collection := client.Database("sample_mflix").Collection("movies")

	// begin-atlas-search
	// Defines the pipeline
	searchStage := bson.D{{"$search", bson.D{
		{"text", bson.D{
			{"path", "title"},
			{"query", "Alabama"},
		}},
	}}}
	projectStage := bson.D{{"$project", bson.D{{"title", 1}}}}

	// Runs the pipeline
	cursor, err := collection.Aggregate(ctx, mongo.Pipeline{searchStage, projectStage})
	if err != nil {
		panic(err)
	}

	// Prints the results
	var results []bson.D
	if err = cursor.All(ctx, &results); err != nil {
		panic(err)
	}
	for _, result := range results {
		fmt.Println(result)
	}
	// end-atlas-search
}
