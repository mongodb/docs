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

	// Define the MongoDB Search index for the document field
	searchIndexModel := mongo.SearchIndexModel{
		Definition: bson.D{
			{"mappings", bson.D{
				{"dynamic", true|false | bson.D{ // "dynamic" can be a boolean or an object with "typeSet" name
					{"typeSet", "<typeSet-name>"},
				}},
				{"fields", bson.D{
					{"<field-name>", bson.D{
						{"type", "document"},
						{"dynamic", true|false | bson.D{ // "dynamic" can be a boolean or an object with "typeSet" name
							{"typeSet", "<typeSet-name>"},
						}},
						{"fields", bson.D{
							{"<sub-field-name>", bson.D{
								// <field-mapping-definition>
							}},
							 ... // additional sub-fields
						}},
					}},
					... // additional fields
				}},
			}},
			{"typeSets", bson.A{
				bson.D{
					{"name", "<typeSet-name>"},
					{"types", bson.A{
						bson.D{
							// <field-type-definition>
						},
						... // additional type definitions...
					}},
				},
				... // additional typeSets...
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
