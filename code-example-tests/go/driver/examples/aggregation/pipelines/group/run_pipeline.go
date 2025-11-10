package group

import (
	"context"
	"driver-examples/utils"
	"log"
	"time"

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
	// :snippet-start: match
	matchStage := bson.D{{Key: "$match", Value: bson.D{
		{Key: "orderdate", Value: bson.D{
			{Key: "$gte", Value: time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC)},
			{Key: "$lt", Value: time.Date(2021, 1, 1, 0, 0, 0, 0, time.UTC)},
		}},
	}}}
	// :snippet-end:
	// :snippet-start: sort-orderdate
	sortStageOrderDate := bson.D{{Key: "$sort", Value: bson.D{
		{Key: "orderdate", Value: 1},
	}}}
	// :snippet-end:
	// :snippet-start: group
	groupStage := bson.D{{Key: "$group", Value: bson.D{
		{Key: "_id", Value: "$customer_id"},
		{Key: "first_purchase_date", Value: bson.D{{Key: "$first", Value: "$orderdate"}}},
		{Key: "total_value", Value: bson.D{{Key: "$sum", Value: "$value"}}},
		{Key: "total_orders", Value: bson.D{{Key: "$sum", Value: 1}}},
		{Key: "orders", Value: bson.D{{Key: "$push", Value: bson.D{
			{Key: "orderdate", Value: "$orderdate"},
			{Key: "value", Value: "$value"},
		}}}},
	}}}
	// :snippet-end:
	// :snippet-start: sort-first-purchase-date
	sortStageFirstPurchaseDate := bson.D{{Key: "$sort", Value: bson.D{
		{Key: "first_purchase_date", Value: 1},
	}}}
	// :snippet-end:
	// :snippet-start: set
	setStage := bson.D{{Key: "$set", Value: bson.D{
		{Key: "customer_id", Value: "$_id"},
	}}}
	// :snippet-end:
	// :snippet-start: unset
	unsetStage := bson.D{{Key: "$unset", Value: bson.A{"_id"}}}
	// :snippet-end:
	// :snippet-start: run-agg
	pipeline := mongo.Pipeline{
		matchStage,
		sortStageOrderDate,
		groupStage,
		sortStageFirstPurchaseDate,
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
