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

	// Define the Atlas Search index for the autocomplete field type
	searchIndexModel := mongo.SearchIndexModel{
		Definition: bson.D{
			{"mappings", bson.D{
				{"dynamic", bson.D{
					{"typeSet", "moviesStringIndex"},
				}},
				{"fields", bson.D{
					{"poster", bson.A{}},
					{"languages", bson.A{}},
					{"rated", bson.A{}},
					{"lastupdated", bson.A{}},
					{"fullplot", bson.A{}},
					{"awards", bson.A{}},
				}},
			}},
			{"typeSets", bson.A{
				bson.D{
					{"name", "moviesStringIndex"},
					{"types", bson.A{
						bson.D{
							{"type", "autocomplete"},
						},
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

	fmt.Println("Name of index created: " + searchIndexName)
}