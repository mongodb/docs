package unwind

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
	orders := aggDB.Collection("orders")
	// :snippet-start: unwind
	unwindStage := bson.D{{Key: "$unwind", Value: bson.D{
		{Key: "path", Value: "$products"},
	}}}
	// :snippet-end:
	// :snippet-start: match
	matchStage := bson.D{{Key: "$match", Value: bson.D{
		{Key: "products.price", Value: bson.D{{Key: "$gt", Value: 15}}},
	}}}
	// :snippet-end:
	// :snippet-start: group
	groupStage := bson.D{{Key: "$group", Value: bson.D{
		{Key: "_id", Value: "$products.prod_id"},
		{Key: "product", Value: bson.D{{Key: "$first", Value: "$products.name"}}},
		{Key: "total_value", Value: bson.D{{Key: "$sum", Value: "$products.price"}}},
		{Key: "quantity", Value: bson.D{{Key: "$sum", Value: 1}}},
	}}}
	// :snippet-end:
	// :snippet-start: set
	setStage := bson.D{{Key: "$set", Value: bson.D{
		{Key: "product_id", Value: "$_id"},
	}}}
	// :snippet-end:
	// :snippet-start: unset
	unsetStage := bson.D{{Key: "$unset", Value: bson.A{"_id"}}}
	// :snippet-end:
	// :snippet-start: run-agg
	pipeline := mongo.Pipeline{
		unwindStage,
		matchStage,
		groupStage,
		setStage,
		unsetStage,
	}
	cursor, err := orders.Aggregate(ctx, pipeline)
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
