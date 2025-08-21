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
	// connect to the MongoDB deployment
	ctx := context.Background()
	clOpts := options.Client().ApplyURI("<connection-string>").SetTimeout(5 * time.Second)
	client, err := mongo.Connect(clOpts)
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(ctx)

	// set namespace
	collection := client.Database("sample_supplies").Collection("monthlyPhoneTransactions")

	// define pipeline
	searchStage := bson.D{{Key: "$search", Value: bson.D{
		{Key: "index", Value: "monthlySalesIndex"},
		{Key: "range", Value: bson.D{
			{Key: "gt", Value: 10000},
			{Key: "path", Value: bson.A{"sales_price"}},
		}},
	}}}

	countStage := bson.D{{Key: "$count", Value: "months_w_over_10000"}}

	// run pipeline
	cursor, err := collection.Aggregate(ctx, mongo.Pipeline{searchStage, countStage})
	if err != nil {
		panic(err)
	}

	// print results
	var results []bson.M
	if err = cursor.All(ctx, &results); err != nil {
		panic(err)
	}

	for _, result := range results {
		fmt.Println(result)
	}
}
