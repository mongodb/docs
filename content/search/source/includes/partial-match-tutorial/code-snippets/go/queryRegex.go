package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	// Connect to your Atlas cluster
	uri := "<connection-string>"

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Fatal(err)
		}
	}()

	// Set namespace
	database := client.Database("sample_mflix")
	collection := database.Collection("movies")

	// Define pipeline - regex requires allowAnalyzedField: true
	pipeline := bson.A{
		bson.D{
			{Key: "$search", Value: bson.D{
				{Key: "index", Value: "partial-match-tutorial"},
				{Key: "regex", Value: bson.D{
					{Key: "path", Value: "title"},
					{Key: "query", Value: "[0-9]{2} (.){4}s"},
					{Key: "allowAnalyzedField", Value: true},
				}},
			}},
		},
		bson.D{
			{Key: "$project", Value: bson.D{
				{Key: "_id", Value: 0},
				{Key: "title", Value: 1},
			}},
		},
	}

	// Run pipeline
	cursor, err := collection.Aggregate(context.TODO(), pipeline)
	if err != nil {
		log.Fatal(err)
	}
	defer cursor.Close(context.TODO())

	// Print results
	for cursor.Next(context.TODO()) {
		var result bson.M
		if err := cursor.Decode(&result); err != nil {
			log.Fatal(err)
		}
		fmt.Println(result)
	}

	if err := cursor.Err(); err != nil {
		log.Fatal(err)
	}
}
