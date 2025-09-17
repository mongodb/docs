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
	// Connect to your Atlas deployment
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

	// Define your MongoDB Search index
	indexModel := mongo.SearchIndexModel{
		Definition: bson.D{
			{Key: "mappings", Value: bson.D{
				{Key: "dynamic", Value: false},
				{Key: "fields", Value: bson.D{
					{Key: "title", Value: bson.D{
						{Key: "type", Value: "autocomplete"},
						{Key: "analyzer", Value: "lucene.standard"},
						{Key: "tokenization", Value: "edgeGram"},
						{Key: "minGrams", Value: 3},
						{Key: "maxGrams", Value: 5},
						{Key: "foldDiacritics", Value: false},
					}},
				}},
			}},
		},
		Options: options.SearchIndexes().SetName("partial-match-tutorial-autocomplete"),
	}

	// Run the helper method
	result, err := collection.SearchIndexes().CreateOne(context.TODO(), indexModel)
	if err != nil {
		log.Fatal(err)
	}
	
	fmt.Printf("New index name: %s\n", result)
}
