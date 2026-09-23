package main

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	// Connect to your Atlas deployment
	uri := "<connectionString>"
	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.TODO())

	// Access your database and collection (View)
	collection := client.Database("sample_airbnb").
		Collection("listingsAndReviews_totalPrice")

	// Run the aggregation query on the View
	pipeline := bson.A{
		bson.D{{Key: "$search", Value: bson.D{
			{Key: "index", Value: "totalPriceIndex"},
			{Key: "range", Value: bson.D{
				{Key: "path", Value: "totalPrice"},
				{Key: "lte", Value: 300},
			}},
			{Key: "returnStoredSource", Value: true},
		}}},
	}

	cursor, err := collection.Aggregate(context.TODO(), pipeline)
	if err != nil {
		panic(err)
	}

	var results []bson.D
	if err = cursor.All(context.TODO(), &results); err != nil {
		panic(err)
	}
	for _, result := range results {
		fmt.Println(result)
	}
}
