package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {

	ctx := context.TODO()

	// Replace the placeholder with your Atlas connection string
	const uri = "<connectionString>"

	// Connect to your Atlas cluster
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

	// Set the namespace
	coll := client.Database("<databaseName>").Collection("<collectionName>")
	indexName := "<indexName>"

	coll.SearchIndexes().DropOne(ctx, indexName)

	if err != nil {
		panic(err)
	}

	fmt.Println("Successfully dropped the Vector Search index")
}
