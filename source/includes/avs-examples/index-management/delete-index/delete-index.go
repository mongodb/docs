package main

import (
	"context"
	"fmt"
	"log"

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
	indexName := "<indexName>"

	err = coll.SearchIndexes().DropOne(ctx, indexName)
	if err != nil {
		log.Fatalf("failed to delete the index: %v", err)
	}

	fmt.Println("Successfully deleted the Vector Search index")
}
