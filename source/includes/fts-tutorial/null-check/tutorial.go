package main

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	// connect to your Atlas cluster
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("<connection-string>"))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.TODO())
	// set namespace
	collection := client.Database("sample_mflix").Collection("users")
	// define pipeline stages
	searchStage := bson.D{{"$search", bson.D{{"index", "null-check-tutorial"}, {"compound", bson.D{{"must", bson.D{{"exists", bson.D{{"path", "password"}}}}}, {"mustNot", bson.D{{"wildcard", bson.D{{"path", "password"}, {"query", "*"}, {"allowAnalyzedField", true}}}}}}}}}}
	// run pipeline
	cursor, err := collection.Aggregate(context.TODO(), mongo.Pipeline{searchStage})
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
