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

	// Specifies the index to retrieve
	const indexName = "<index-name>"
	opts := options.SearchIndexes().SetName(indexName)

	// Retrieves the details of the specified index
	cursor, err := coll.SearchIndexes().List(ctx, opts)
	if err != nil {
		log.Fatalf("failed to retrieve search index: %v", err)
	}

	// Prints the index details to the console as JSON
	var results []bson.D
	if err := cursor.All(ctx, &results); err != nil {
		log.Fatalf("failed to unmarshal results to bson: %v", err)
	}
	jsonResults, err := json.Marshal(results)
	if err != nil {
		log.Fatalf("failed to marshal results to json: %v", err)
	}
	fmt.Println(string(jsonResults))
}
