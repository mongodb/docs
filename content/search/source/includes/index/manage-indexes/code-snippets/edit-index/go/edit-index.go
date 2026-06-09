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

	// Specifies the index name and the new index definition
	const indexName = "<index-name>"

	// Define the new index definition
	definition := bson.D{<index-definition>}

	// Updates the specified index
	err = coll.SearchIndexes().UpdateOne(ctx, indexName, definition)
	if err != nil {
		log.Fatalf("Failed to update the index: %v", err)
	}
}
