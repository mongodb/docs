package filter

import (
	"context"
	"driver-examples/utils"
	"log"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func RunPipeline() []bson.D {
	ctx := context.Background()
	// Get the connection string from environment
	uri := utils.GetConnectionString()
	if uri == "" {
		log.Fatal("set your 'CONNECTION_STRING' environment variable.")
	}

	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(clientOptions)
	if err != nil {
		log.Fatalf("failed to connect to the server: %v", err)
	}
	defer func() { _ = client.Disconnect(ctx) }()

	aggDB := client.Database("agg_tutorials_db")
	persons := aggDB.Collection("persons")
	// :snippet-start: match
	matchStage := bson.D{{Key: "$match", Value: bson.D{{Key: "vocation", Value: "ENGINEER"}}}}
	// :snippet-end:
	// :snippet-start: sort
	sortStage := bson.D{{Key: "$sort", Value: bson.D{{Key: "dateofbirth", Value: -1}}}}
	// :snippet-end:
	// :snippet-start: limit
	limitStage := bson.D{{Key: "$limit", Value: 3}}
	// :snippet-end:
	// :snippet-start: unset
	unsetStage := bson.D{{Key: "$unset", Value: bson.A{"_id", "address"}}}
	// :snippet-end:
	// :snippet-start: run-agg
	pipeline := mongo.Pipeline{matchStage, sortStage, limitStage, unsetStage}
	cursor, err := persons.Aggregate(ctx, pipeline)
	// :snippet-end:
	if err != nil {
		log.Fatal(err)
	}

	defer func() {
		if err := cursor.Close(ctx); err != nil {
			log.Fatalf("failed to close cursor: %v", err)
		}
	}()

	var results []bson.D
	if err = cursor.All(ctx, &results); err != nil {
		log.Fatalf("failed to decode results: %v", err)
	}
	return results
}
