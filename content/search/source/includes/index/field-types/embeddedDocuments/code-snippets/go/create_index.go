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
				// "dynamic" can be a boolean or an object with "typeset" name
				{"dynamic", true}, // or false, or bson.D{{"typeset", "<type-set-name>"}}
				{"fields", bson.D{
					{"<field-name>", bson.D{
						{"type", "embeddedDocuments"},
						// "dynamic" can be a boolean or an object with "typeSet" name
						{"dynamic", true}, // or false, or bson.D{{"typeSet", "<type-set-name>"}}
						{"fields", bson.D{
							{"<field-name>", bson.D{
								// <field-mapping-definition>
							}},
							// ... additional fields
						}},
						{"storedSource", true}, // or false, or bson.D{{"include", bson.A{"<field-name>", /* ... */}}} or bson.D{{"exclude", bson.A{"<field-name>", /* ... */}}}
					}},
					// ... additional fields
				}},
			}},
			{"typeSets", bson.A{
				bson.D{
					{"name", "<type-set-name>"},
					{"types", bson.A{
						bson.D{
							{"type", "<field-type>"},
							// ... additional field type configuration
						},
						// ... additional types
					}},
				},
				// ... additional typeSets
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
