package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	ctx := context.Background()
	uri := "<connection-string>"
	client, err := mongo.Connect(options.Client().
		ApplyURI(uri))
	if err != nil {
		panic(err)
	}

	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	coll := client.Database("<database>").Collection("<collection>")
	const indexName = "default"
	opts := options.SearchIndexes().SetName(indexName).SetType("search")

	// Define the Atlas Search index for the token field
	searchIndexModel := mongo.SearchIndexModel{
		Definition: bson.D{
			{"mappings", bson.D{
				{"dynamic", false},
				{"fields", bson.D{
					{"<field-name>", bson.D{
						{"type", "token"},
						{"normalizer", "lowercase|none"}, // Optional: specify a normalizer
					}},
				}},
			}},
		},
		Options: opts,
	}

	// Create the index
	searchIndexName, err := coll.SearchIndexes().CreateOne(ctx, searchIndexModel)
	if err != nil {
		log.Fatalf("Failed to create the Atlas Search index: %v", err)
	}

	fmt.Println("Name of index created: " + searchIndexName)
}
