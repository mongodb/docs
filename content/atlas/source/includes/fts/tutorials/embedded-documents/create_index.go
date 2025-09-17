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

	coll := client.Database("local_school_district").Collection("schools")
	const indexName = "embedded-documents-tutorial"
	opts := options.SearchIndexes().SetName(indexName).SetType("search")

	// Define the Atlas Search index for embedded documents
	searchIndexModel := mongo.SearchIndexModel{
		Definition: bson.D{
			{"mappings", bson.D{
				{"dynamic", true},
				{"fields", bson.D{
					{"clubs", bson.D{
						{"dynamic", true},
						{"fields", bson.D{
							{"sports", bson.D{
								{"dynamic", true},
								{"type", "embeddedDocuments"},
							}},
						}},
						{"type", "document"},
					}},
					{"teachers", bson.A{
						bson.D{
							{"dynamic", true},
							{"fields", bson.D{
								{"classes", bson.D{
									{"dynamic", true},
									{"type", "embeddedDocuments"},
								}},
							}},
							{"type", "embeddedDocuments"},
						},
						bson.D{
							{"dynamic", true},
							{"fields", bson.D{
								{"classes", bson.D{
									{"dynamic", true},
									{"fields", bson.D{
										{"grade", bson.D{
											{"type", "token"},
										}},
									}},
									{"type", "document"},
								}},
							}},
							{"type", "document"},
						},
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