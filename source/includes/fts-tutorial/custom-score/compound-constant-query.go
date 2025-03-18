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
	// connect to the Atlas cluster and set a maximum operation time
	opts := options.Client().
		SetTimeout(5 * time.Second).
		ApplyURI("<connection-string>")

	client, err := mongo.Connect(opts)
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.TODO())

	// set namespace
	collection := client.Database("sample_mflix").Collection("movies")

	// define pipeline stages
	searchStage := bson.D{{"$search", bson.M{
		"index": "compound-query-custom-score-tutorial",
		"compound": bson.M{
			"filter": bson.M{
				"range": bson.M{
					"path": "year", "gte": 2013, "lte": 2015,
				},
			},
			"should": bson.D{
				{"text", bson.M{
					"path": "title", "query": "snow", "score": bson.M{
						"constant": bson.D{{"value", 5}},
					}}}},
		},
		"highlight": bson.D{{"path", "title"}},
	}}}
	limitStage := bson.D{{"$limit", 10}}
	projectStage := bson.D{{"$project", bson.D{{"title", 1}, {"year", 1}, {"_id", 0}, {"score", bson.D{{"$meta", "searchScore"}}}, {"highlights", bson.D{{"$meta", "searchHighlights"}}}}}}

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
