package main

import (
	"context"
	"log"

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

	// Specifies the index name of the index to delete
	const indexName = "<index-name>"

	// Deletes the specified index
	err = coll.SearchIndexes().DropOne(ctx, indexName)
	if err != nil {
		log.Fatalf("Failed to delete the index: %v", err)
	}
}
