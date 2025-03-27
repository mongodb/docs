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
	client, err := mongo.Connect(options.Client().ApplyURI("<connection-string>"))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.TODO())

	// set namespace
	collection := client.Database("sample_mflix").Collection("movies")

	// define pipeline stages
	searchStage := bson.D{{"$search", bson.M{
		"index": "multilingual-tutorial",
		"compound": bson.M{
			"must": bson.D{
				{"text", bson.M{
					"path": "fullplot", "query": "coppia",
				}}},
			"mustNot": bson.M{
				"range": bson.M{
					"path": "released",
					"gt":   time.Date(2000, time.January, 1, 0, 0, 0, 0, time.UTC),
					"lt":   time.Date(2009, time.January, 1, 0, 0, 0, 0, time.UTC),
				}},
			"should": bson.D{
				{"text", bson.M{
					"path": "genres", "query": "Drama",
				}}},
		}}}}
	projectStage := bson.D{{"$project", bson.D{{"_id", 0}, {"title", 1}, {"fullplot", 1}, {"released", 1}, {"genres", 1}, {"score", bson.D{{"$meta", "searchScore"}}}}}}

	// run pipeline
	cursor, err := collection.Aggregate(context.TODO(), mongo.Pipeline{searchStage, projectStage})
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
