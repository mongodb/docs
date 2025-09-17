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
	const indexName = "defaultgo"
	opts := options.SearchIndexes().SetName(indexName).SetType("search")

	// Define the MongoDB Search index for the embeddedDocuments field
	searchIndexModel := mongo.SearchIndexModel{
		Definition: bson.D{
			{"mappings", bson.D{
				{"dynamic", true|false},
				{"fields", bson.D{
					{"<field-name>", bson.D{
						{"type", "embeddedDocuments"},
						{"dynamic", true|false},
						{"fields", bson.D{
							{"<field-name>", bson.D{
								<field-mapping-definition>
							}},
						}},
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
