package main

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	// connect to your Atlas cluster
	client, err := mongo.Connect(options.Client().ApplyURI("<connection-string>"))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.TODO())

	// set namespace
	collection := client.Database("sample_mflix").Collection("movies")

	// define pipeline stages
	searchStage := bson.D{
		{Key: "$search", Value: bson.D{
			{Key: "index", Value: "autocomplete-tutorial"},
			{Key: "compound", Value: bson.D{
				{Key: "should", Value: bson.A{
					bson.D{
						{Key: "autocomplete", Value: bson.D{{Key: "query", Value: "pri"}, {Key: "path", Value: "title"}}},
					},
					bson.D{
						{Key: "autocomplete", Value: bson.D{{Key: "query", Value: "pri"}, {Key: "path", Value: "plot"}}},
					},
				}},
				{Key: "minimumShouldMatch", Value: 1},
			}},
		}},
	}
	limitStage := bson.D{{Key: "$limit", Value: 5}}
	projectStage := bson.D{{Key: "$project", Value: bson.D{{Key: "title", Value: 1}, {Key: "plot", Value: 1}, {Key: "_id", Value: 0}}}}
	// run pipeline
	cursor, err := collection.Aggregate(context.TODO(), mongo.Pipeline{searchStage, limitStage, projectStage})
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
