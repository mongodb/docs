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
type MovieCollection struct {
	title string `bson:"Title,omitempty"`
}

func main() {
	var err error
	// connect to the Atlas cluster
	ctx := context.Background()
	client, err := mongo.Connect(options.Client().ApplyURI("<connection-string>"))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(ctx)
	// set namespace
	collection := client.Database("sample_mflix").Collection("movies")
	// define pipeline
	searchStage := bson.D{{"$search", bson.D{{"index", "default"}, {"text", bson.D{{"path", "title"}, {"query", "boat"}, {"synonyms", "transportSynonyms"}}}}}}
	limitStage := bson.D{{"$limit", 10}}
	projectStage := bson.D{{"$project", bson.D{{"title", 1}, {"_id", 0}, {"score", bson.D{{"$meta", "searchScore"}}}}}}
	// specify the amount of time the operation can run on the server
	opts := options.Aggregate()

	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	cursor, err := collection.Aggregate(ctx, mongo.Pipeline{searchStage, limitStage, projectStage}, opts)
	if err != nil {
		panic(err)
	}
	// print results
	var results []bson.D
	if err = cursor.All(ctx, &results); err != nil {
		panic(err)
	}
	for _, result := range results {
		fmt.Println(result)
	}
}
