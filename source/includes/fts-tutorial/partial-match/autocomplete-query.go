package main

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// define structure of movies collection
type Movie struct {
	title string
	plot  string
}

func main() {
	var err error
	// connect to the Atlas cluster
	ctx := context.Background()
	client, err := mongo.Connect(options.Client().SetTimeout(5 * time.Second).ApplyURI("<connection-string>"))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(ctx)
	// set namespace
	collection := client.Database("sample_mflix").Collection("movies")
	// define pipeline
	searchStage := bson.D{{Key: "$search", Value: bson.M{
		"index": "partial-match-tutorial",
		"autocomplete": bson.M{
			"path": "plot", "query": "new purchase", "tokenOrder": "any", "fuzzy": bson.M{
				"maxEdits": 2, "prefixLength": 1, "maxExpansions": 256},
		},
		"highlight": bson.D{
			{Key: "path", Value: "plot"},
		},
	}}}
	limitStage := bson.D{{Key: "$limit", Value: 5}}
	projectStage := bson.D{{Key: "$project", Value: bson.D{{Key: "title", Value: 1}, {Key: "plot", Value: 1}, {Key: "_id", Value: 0}, {Key: "highlights", Value: bson.D{{Key: "$meta", Value: "searchHighlights"}}}}}}
	// run pipeline
	cursor, err := collection.Aggregate(ctx, mongo.Pipeline{searchStage, limitStage, projectStage})
	if err != nil {
		panic(err)
	}
	// print results
	var results []Movie
	if err = cursor.All(context.TODO(), &results); err != nil {
		panic(err)
	}
	for _, result := range results {
		fmt.Println(result)
	}
}
