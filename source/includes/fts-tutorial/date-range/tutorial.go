package main

import (
	"context"
	"fmt"
	"time"

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
	collection := client.Database("sample_mflix").Collection("movies")

	// define pipeline stages
	searchStage := bson.D{{"$search", bson.M{
		"index": "date-range-tutorial",
		"compound": bson.M{
			"must": bson.M{
				"range": bson.M{
					"path": "released",
					"gt":   time.Date(2015, time.January, 1, 0, 0, 0, 0, time.UTC),
					"lt":   time.Date(2015, time.December, 31, 0, 0, 0, 0, time.UTC),
				}},
			"should": bson.D{
				{"near", bson.M{
					"path":   "released",
					"origin": time.Date(2015, time.July, 1, 0, 0, 0, 0, time.UTC),
					"pivot":  2629800000,
				}}},
		}}}}
	projectStage := bson.D{{"$project", bson.D{{"_id", 0}, {"title", 1}, {"released", 1}, {"genres", 1}, {"score", bson.D{{"$meta", "searchScore"}}}}}}
	limitStage := bson.D{{"$limit", 6}}

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
