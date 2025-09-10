package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	// Create a context
	ctx := context.Background()

	// Connect to MongoDB
	uri := "<connection-string>"
	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(err)
	}

	// Ensure the client will be properly disconnected when main exits
	defer func() {
		if err := client.Disconnect(ctx); err != nil {
			log.Fatal(err)
		}
	}()

	// Ping the MongoDB server to verify the connection
	if err := client.Ping(ctx, nil); err != nil {
		log.Fatal(err)
	}

	database := client.Database("sample_airbnb")
	collection := database.Collection("listingsAndReviews")

	// Create the aggregation pipeline
	projectStage := bson.D{{Key: "$project", Value: bson.D{
		{Key: "lastScrapedDate", Value: bson.D{{Key: "$dateToString", Value: bson.D{
			{Key: "format", Value: "%Y-%m-%d"},
			{Key: "date", Value: "$last_scraped"},
		}}}},
		{Key: "accommodatesNumber", Value: bson.D{{Key: "$toString", Value: "$accommodates"}}},
		{Key: "maximumNumberOfNights", Value: bson.D{{Key: "$toString", Value: "$maximum_nights"}}},
		{Key: "propertyName", Value: "$name"},
		{Key: "propertyType", Value: "$property_type"},
	}}}
	mergeStage := bson.D{{Key: "$merge", Value: bson.D{
		{Key: "into", Value: "airbnb_mat_view"},
		{Key: "whenMatched", Value: "replace"},
	}}}

	pipeline := mongo.Pipeline{projectStage, mergeStage}

	// Execute the aggregation
	cursor, err := collection.Aggregate(ctx, pipeline)
	if err != nil {
		log.Fatal(err)
	}
	defer cursor.Close(ctx)
	fmt.Printf("Materialized view created!\n")
}
