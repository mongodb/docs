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
	searchStage := bson.D{{"$search", bson.D{
		{"index", "null-check-tutorial"},
		{"compound", bson.D{{
			"should", bson.A{bson.D{{
				"wildcard", bson.D{
					{"path", "password"},
					{"query", "*"},
					{"allowAnalyzedField", true}}}}, bson.D{{
				"compound", bson.D{{
					"mustNot", bson.D{{
						"exists", bson.D{
							{"path", "password"}}}}},
					{"score", bson.D{{"constant", bson.D{{"value", 2}}}}},
				}}}}}}}}}}
	projectStage := bson.D{{"$project", bson.D{{"name", 1}, {"password", 1}, {"_id", 0}, {"score", bson.D{{"$meta", "searchScore"}}}}}}
	limitStage := bson.D{{"$limit", 5}}
	// run pipeline
	cursor, err := collection.Aggregate(context.TODO(), mongo.Pipeline{searchStage, projectStage, limitStage})
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
