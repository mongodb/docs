package main

import (
	"context"
	"fmt"

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
	collection := client.Database("local_school_district").Collection("schools")

	// Defines the pipeline stages
	searchStage := bson.D{{Key: "$search", Value: bson.M{
		"index": "embedded-documents-tutorial",
		"embeddedDocument": bson.D{
			{Key: "path", Value: "clubs.sports"},
			{Key: "operator", Value: bson.D{
				{Key: "queryString", Value: bson.D{
					{Key: "defaultPath", Value: "clubs.sports.club_name"},
					{Key: "query", Value: "dodgeball OR frisbee"},
				}},
			}},
		},
	}}}

	projectStage := bson.D{
		{Key: "$project", Value: bson.D{
			{Key: "name", Value: 1},
			{Key: "clubs.sports", Value: 1},
			{Key: "score", Value: bson.D{
				{Key: "$meta", Value: "searchScore"},
			}},
		}},
	}

	// Runs the pipeline
	cursor, err := collection.Aggregate(context.TODO(), mongo.Pipeline{searchStage, projectStage})
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
