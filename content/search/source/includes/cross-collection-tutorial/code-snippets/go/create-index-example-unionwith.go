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

	// Get collections from sample_training database
	db := client.Database("sample_training")
	companiesCol := db.Collection("companies")
	inspectionsCol := db.Collection("inspections")

	const indexName = "default"
	opts := options.SearchIndexes().SetName(indexName).SetType("search")

	// Define the MongoDB Search index with dynamic mapping
	searchIndexModel := mongo.SearchIndexModel{
		Definition: bson.D{
			{"mappings", bson.D{
				{"dynamic", true},
			}},
		},
		Options: opts,
	}

	// Create the index on companies collection
	companiesIndexName, err := companiesCol.SearchIndexes().CreateOne(ctx, searchIndexModel)
	if err != nil {
		log.Fatalf("Failed to create the Atlas Search index on companies: %v", err)
	}
	fmt.Println("Index created on companies collection: " + companiesIndexName)

	// Create the index on inspections collection
	inspectionsIndexName, err := inspectionsCol.SearchIndexes().CreateOne(ctx, searchIndexModel)
	if err != nil {
		log.Fatalf("Failed to create the Atlas Search index on inspections: %v", err)
	}
	fmt.Println("Index created on inspections collection: " + inspectionsIndexName)
}
