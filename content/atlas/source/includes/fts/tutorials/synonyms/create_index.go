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

	coll := client.Database("sample_mflix").Collection("movies")
	const indexName = "default"
	opts := options.SearchIndexes().SetName(indexName).SetType("search")

	// Define the MongoDB Search index
	searchIndexModel := mongo.SearchIndexModel{
		Definition: bson.D{
			{"mappings", bson.D{
				{"dynamic", false},
				{"fields", bson.D{
					{"title", bson.D{
						{"analyzer", "lucene.english"},
						{"type", "string"},
					}},
				}},
			}},
			{"synonyms", bson.A{
				bson.D{
					{"analyzer", "lucene.english"},
					{"name", "transportSynonyms"},
					{"source", bson.D{
						{"collection", "transport_synonyms"},
					}},
				},
			}},
		},
		Options: opts,
	}

	// Create the index
	searchIndexName, err := coll.SearchIndexes().CreateOne(ctx, searchIndexModel)
	if err != nil {
		log.Fatalf("Failed to create the Atlas Search index: %v", err)
	}

	fmt.Println("New index name: " + searchIndexName)
}