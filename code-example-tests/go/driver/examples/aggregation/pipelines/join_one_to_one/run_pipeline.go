package join_one_to_one

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
	// :snippet-start: lookup
	lookupStage := bson.D{{Key: "$lookup", Value: bson.D{
		{Key: "from", Value: "products"},
		{Key: "localField", Value: "product_id"},
		{Key: "foreignField", Value: "id"},
		{Key: "as", Value: "product_mapping"},
	}}}
	// :snippet-end:
	// :snippet-start: set
	setProductMappingStage := bson.D{{Key: "$set", Value: bson.D{
		{Key: "product_mapping", Value: bson.D{{Key: "$first", Value: "$product_mapping"}}},
	}}}

	setProductNameCategoryStage := bson.D{{Key: "$set", Value: bson.D{
		{Key: "product_name", Value: "$product_mapping.name"},
		{Key: "product_category", Value: "$product_mapping.category"},
	}}}
	// :snippet-end:
	// :snippet-start: unset
	unsetStage := bson.D{{Key: "$unset", Value: bson.A{"_id", "product_id", "product_mapping"}}}
	// :snippet-end:
	// :snippet-start: run-agg
	pipeline := mongo.Pipeline{
		matchStage,
		lookupStage,
		setProductMappingStage,
		setProductNameCategoryStage,
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
