package main

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	var err error
	// connect to the Atlas cluster
	ctx := context.Background()
	clOpts := options.Client().ApplyURI("<connection-string>").SetTimeout(5 * time.Second)
	client, err := mongo.Connect(clOpts)
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(ctx)
	// set namespace
	collection := client.Database("sample_analytics").Collection("customers")
	// define pipeline
	lookupStage := bson.D{{Key: "$lookup", Value: bson.D{
		{Key: "from", Value: "accounts"},
		{Key: "localField", Value: "accounts"},
		{Key: "foreignField", Value: "account_id"},
		{Key: "as", Value: "purchases"},
		{Key: "pipeline", Value: bson.A{
			bson.D{
				{Key: "$search", Value: bson.D{
					{Key: "index", Value: "lookup-with-search-tutorial"},
					{Key: "compound", Value: bson.D{
						{Key: "must", Value: bson.A{
							bson.D{{Key: "queryString", Value: bson.D{
								{Key: "defaultPath", Value: "products"},
								{Key: "query", Value: "products: (CurrencyService AND InvestmentStock)"},
							}}},
						}},
						{Key: "should", Value: bson.A{
							bson.D{{Key: "range", Value: bson.D{
								{Key: "path", Value: "limit"},
								{Key: "gte", Value: 5000},
								{Key: "lte", Value: 10000},
							}}},
						}},
					}},
				}},
			},
			bson.D{{Key: "$project", Value: bson.D{
				{Key: "_id", Value: 0},
				{Key: "address", Value: 0},
				{Key: "birthdate", Value: 0},
				{Key: "username", Value: 0},
				{Key: "tier_and_details", Value: 0},
			}}},
		}},
	}}}
	limitStage := bson.D{{Key: "$limit", Value: 5}}
	projectStage := bson.D{{Key: "$project", Value: bson.D{
		{Key: "name", Value: 1},
		{Key: "email", Value: 1},
		{Key: "active", Value: 1},
		{Key: "accounts", Value: 1},
		{Key: "purchases", Value: 1},
	}}}

	// run pipeline
	cursor, err := collection.Aggregate(ctx, mongo.Pipeline{lookupStage, limitStage, projectStage})
	if err != nil {
		panic(err)
	}
	// print results
	var results []bson.D
	if err = cursor.All(context.TODO(), &results); err != nil {
		panic(err)
	}
	for _, result := range results {
		fmt.Println(result)
	}
}
