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
	// Connects to your Atlas cluster
	client, err := mongo.Connect(options.Client().ApplyURI("<connection-string>"))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.TODO())

	// Sets the namespace
	collection := client.Database("sample_mflix").Collection("movies")

	// Defines the pipeline stages
	searchStage := bson.D{{Key: "$search", Value: bson.M{
		"index": "date-range-tutorial",
		"compound": bson.M{
			"must": bson.M{
				"range": bson.M{
					"path": "released",
					"gt":   time.Date(2015, time.January, 1, 0, 0, 0, 0, time.UTC),
					"lt":   time.Date(2015, time.December, 31, 0, 0, 0, 0, time.UTC),
				}},
			"should": bson.D{
				{Key: "near", Value: bson.M{
					"path":   "released",
					"origin": time.Date(2015, time.July, 1, 0, 0, 0, 0, time.UTC),
					"pivot":  2629800000,
				}}},
		}}}}
	projectStage := bson.D{
		{Key: "$project", Value: bson.D{
			{Key: "_id", Value: 0},
			{Key: "title", Value: 1},
			{Key: "released", Value: 1},
			{Key: "genres", Value: 1},
			{Key: "score", Value: bson.D{
				{Key: "$meta", Value: "searchScore"},
			}},
		}},
	}
	limitStage := bson.D{{Key: "$limit", Value: 6}}

	// Runs the pipeline
	cursor, err := collection.Aggregate(context.TODO(), mongo.Pipeline{searchStage, projectStage, limitStage})
	if err != nil {
		panic(err)
	}

	// Prints the results
	var results []bson.D
	if err = cursor.All(context.TODO(), &results); err != nil {
		panic(err)
	}
	for _, result := range results {
		fmt.Println(result)
	}
}
