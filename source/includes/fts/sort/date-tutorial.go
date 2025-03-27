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
	// connect to your Atlas cluster
	client, err := mongo.Connect(options.Client().ApplyURI("<connection-string"))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.TODO())

	// set namespace
	collection := client.Database("sample_mflix").Collection("movies")

	// define pipeline stages
	searchStage := bson.D{{Key: "$search", Value: bson.M{
		"index": "sort-tutorial",
		"compound": bson.M{
			"filter": bson.A{
				bson.M{
					"wildcard": bson.D{
						{Key: "path", Value: "title"},
						{Key: "query", Value: "Summer*"},
					}},
			},
			"must": bson.A{
				bson.M{
					"near": bson.M{
						"path":   "released",
						"origin": time.Date(2014, time.April, 18, 0, 0, 0, 0, time.UTC),
						"pivot":  13149000000}},
			},
		},
		"sort": bson.D{{Key: "released", Value: -1}},
	}}}

	limitStage := bson.D{{Key: "$limit", Value: 5}}
	projectStage := bson.D{{Key: "$project", Value: bson.D{{Key: "_id", Value: 0}, {Key: "title", Value: 1}, {Key: "released", Value: 1}, {Key: "score", Value: bson.D{{Key: "$meta", Value: "searchScore"}}}}}}

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
