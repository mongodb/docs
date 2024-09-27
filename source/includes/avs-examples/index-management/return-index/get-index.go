package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
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

	// Specify the options for the index to retrieve
	indexName := "<indexName>"
	opts := options.SearchIndexes().SetName(indexName)

	// Get the index
	cursor, err := coll.SearchIndexes().List(ctx, opts)

	// Print the index details to the console as JSON
	var results []bson.M
	if err := cursor.All(ctx, &results); err != nil {
		log.Panic(err)
	}
	res, _ := json.Marshal(results)
	fmt.Println(string(res))
}
