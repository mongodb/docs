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
		Collection("listings_SearchableTypes")

	// Run the aggregation query on the View
	pipeline := bson.A{
		bson.D{{Key: "$search", Value: bson.D{
			{Key: "index", Value: "listingsSearchableTypes"},
			{Key: "compound", Value: bson.D{
				{Key: "should", Value: bson.A{
					bson.D{{Key: "equals", Value: bson.D{
						{Key: "path", Value: "searchable_types.property_type"},
						{Key: "query", Value: "House"},
					}}},
					bson.D{{Key: "equals", Value: bson.D{
						{Key: "path", Value: "searchable_types.room_type"},
						{Key: "query", Value: "Private room"},
					}}},
				}},
			}},
		}}},
		bson.D{{Key: "$limit", Value: 10}},
		bson.D{{Key: "$project", Value: bson.D{
			{Key: "_id", Value: 0},
			{Key: "searchable_types", Value: 1},
			{Key: "name", Value: 1},
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
