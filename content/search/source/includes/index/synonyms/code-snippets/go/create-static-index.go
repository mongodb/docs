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

	// Replace the placeholder with your MongoDB deployment's connection string
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

	coll := client.Database("sample_mflix").Collection("movies")
	const indexName = "default"
	opts := options.SearchIndexes().SetName(indexName).SetType("search")

	// Create the search index definition

	searchIndexModel := mongo.SearchIndexModel{
		Definition: bson.M{
			"mappings": bson.M{
				"dynamic": false,
				"fields": bson.M{
					"plot": bson.M{
						"type":     "string",
						"analyzer": "lucene.english",
					},
				},
			},
			"synonyms": []bson.M{
				{
					"analyzer": "lucene.english",
					"name":     "my_synonyms",
					"source": bson.M{
						"collection": "synonymous_terms",
					},
				},
			},
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
