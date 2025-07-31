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

	// Retrieves your Atlas connection string
	const uri = "<connection-string>"

	// Connect to your Atlas cluster
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(clientOptions)
	if err != nil {
		log.Fatalf("Failed to connect to the server: %v", err)
	}
	defer func() {
		if err := client.Disconnect(ctx); err != nil {
			log.Fatalf("Failed to disconnect: %v", err)
		}
	}()

	// Set the namespace
	coll := client.Database("<database>").Collection("<collection>")
	opts := options.SearchIndexes().SetName("default")

	// Define your search index
	index := mongo.SearchIndexModel{
		Definition: bson.D{
			{"mappings", bson.D{
				{"dynamic", true | false},
				{"fields", bson.D{
					{"<field-name>", bson.D{
						{"type", "date"},
					}},
				}},
			}},
		},
		Options: opts,
	}

	// Create the index
	result, err := coll.SearchIndexes().CreateOne(ctx, index)
	if err != nil {
		log.Fatalf("Failed to create search index: %v", err)
	}
	log.Printf("New index name: %v", result)
}
