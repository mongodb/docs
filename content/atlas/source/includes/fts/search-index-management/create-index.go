package main

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	ctx := context.Background()

	// Replace the placeholder with your Atlas connection string
	const uri = "<connection-string>"

	// Connect to your Atlas cluster
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(clientOptions)
	if err != nil {
		log.Fatalf("failed to connect to the server: %v", err)
	}
	defer func() { _ = client.Disconnect(ctx) }()

	// Set the namespace
	coll := client.Database("<database-name>").Collection("<collection-name>")

	// Define a simple MongoDB Search index
	indexName := "<index-name>"

	// Create the default definition for search index
	definition := bson.D{{"mappings", bson.D{{"dynamic", true}}}}
	indexModel := mongo.SearchIndexModel{
		Definition: definition,
		Options:    options.SearchIndexes().SetName(indexName),
	}

	// Create the index
	searchIndexName, err := coll.SearchIndexes().CreateOne(ctx, indexModel)
	if err != nil {
		log.Fatalf("failed to create the search index: %v", err)
	}
	log.Println("New search index named " + searchIndexName + " is building.")
}
