package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	ctx := context.Background()

	// Replace the placeholder with your Atlas connection string
	const uri = "<connectionString>"

	// Connect to your Atlas cluster
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(clientOptions)
	if err != nil {
		log.Fatalf("failed to connect to the server: %v", err)
	}
	defer func() { _ = client.Disconnect(ctx) }()

	// Set the namespace
	coll := client.Database("<databaseName>").Collection("<collectionName>")

	// Specify the options for the index to retrieve
	indexName := "<indexName>"
	opts := options.SearchIndexes().SetName(indexName)

	// Get the index
	cursor, err := coll.SearchIndexes().List(ctx, opts)
	if err != nil {
		log.Fatalf("failed to get the index: %v", err)
	}

	// Print the index details to the console as JSON
	var results []bson.M
	if err := cursor.All(ctx, &results); err != nil {
		log.Fatalf("failed to unmarshal results to bson: %v", err)
	}
	res, err := json.Marshal(results)
	if err != nil {
		log.Fatalf("failed to marshal results to json: %v", err)
	}
	fmt.Println(string(res))
}
