package join_multi_field

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
	products := aggDB.Collection("products")
	// :snippet-start: embedded-pl-match-product-info
	embeddedMatchProductInfoStage := bson.D{
		{Key: "$match", Value: bson.D{
			{Key: "$expr", Value: bson.D{
				{Key: "$and", Value: bson.A{
					bson.D{{Key: "$eq", Value: bson.A{"$product_name", "$$prdname"}}},
					bson.D{{Key: "$eq", Value: bson.A{"$product_variation", "$$prdvartn"}}},
				}},
			}},
		}},
	}
	// :snippet-end:
	// :snippet-start: embedded-pl-match-order-date
	embeddedMatchOrderDateStage := bson.D{
		{Key: "$match", Value: bson.D{
			{Key: "orderdate", Value: bson.D{
				{Key: "$gte", Value: time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC)},
				{Key: "$lt", Value: time.Date(2021, 1, 1, 0, 0, 0, 0, time.UTC)},
			}},
		}},
	}
	// :snippet-end:
	// :snippet-start: embedded-pl-unset
	embeddedUnsetStage := bson.D{
		{Key: "$unset", Value: bson.A{"_id", "product_name", "product_variation"}},
	}
	// :snippet-end:
	// :snippet-start: lookup
	embeddedPipeline := mongo.Pipeline{embeddedMatchProductInfoStage, embeddedMatchOrderDateStage, embeddedUnsetStage}

	lookupStage := bson.D{
		{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "orders"},
			{Key: "let", Value: bson.D{
				{Key: "prdname", Value: "$name"},
				{Key: "prdvartn", Value: "$variation"},
			}},
			{Key: "pipeline", Value: embeddedPipeline},
			{Key: "as", Value: "orders"},
		}},
	}
	// :snippet-end:
	// :snippet-start: match
	matchStage := bson.D{
		{Key: "$match", Value: bson.D{
			{Key: "orders", Value: bson.D{{Key: "$ne", Value: bson.A{}}}},
		}},
	}
	// :snippet-end:
	// :snippet-start: unset
	unsetStage := bson.D{
		{Key: "$unset", Value: bson.A{"_id", "description"}},
	}
	// :snippet-end:
	// :snippet-start: run-agg
	pipeline := mongo.Pipeline{lookupStage, matchStage, unsetStage}
	cursor, err := products.Aggregate(ctx, pipeline)
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
