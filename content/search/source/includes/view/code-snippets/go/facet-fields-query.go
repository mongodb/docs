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
		bson.D{{Key: "$searchMeta", Value: bson.D{
			{Key: "index", Value: "listingsSearchableTypes"},
			{Key: "facet", Value: bson.D{
				{Key: "operator", Value: bson.D{
					{Key: "text", Value: bson.D{
						{Key: "path", Value: "summary"},
						{Key: "query", Value: "ocean view"},
					}},
				}},
				{Key: "facets", Value: bson.D{
					{Key: "idFacet", Value: bson.D{
						{Key: "type", Value: "string"},
						{Key: "path", Value: "idString"},
						{Key: "numBuckets", Value: 10},
					}},
					{Key: "hostFacet", Value: bson.D{
						{Key: "type", Value: "string"},
						{Key: "path", Value: "superHostString"},
					}},
				}},
			}},
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
