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

	// Access your database and collection
	collection := client.Database("sample_airbnb").
		Collection("listingsAndReviews")

	// Run the aggregation query
	pipeline := bson.A{
		bson.D{{Key: "$search", Value: bson.D{
			{Key: "index", Value: "listingsSearchablePrice"},
			{Key: "range", Value: bson.D{
				{Key: "path", Value: "totalPrice"},
				{Key: "gte", Value: 100},
				{Key: "lte", Value: 200},
			}},
		}}},
		bson.D{{Key: "$project", Value: bson.D{
			{Key: "_id", Value: 0},
			{Key: "totalPrice", Value: 1},
			{Key: "price", Value: 1},
			{Key: "cleaning_fee", Value: 1},
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
