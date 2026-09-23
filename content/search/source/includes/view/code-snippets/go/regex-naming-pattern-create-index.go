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

	// Replace the placeholder with your Atlas connection string
	const uri = "<connectionString>"

	// Connect to your Atlas cluster
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(clientOptions)
	if err != nil {
		log.Fatalf("failed to connect to the server: %v", err)
	}
	defer func() { _ = client.Disconnect(ctx) }()

	// Set the namespace
	coll := client.Database("sample_airbnb").Collection("listings_SearchableTypes")

	// Define the MongoDB Search index
	indexModel := mongo.SearchIndexModel{
		Definition: bson.D{
			{"analyzer", "lucene.standard"},
			{"searchAnalyzer", "lucene.standard"},
			{"mappings", bson.D{
				{"dynamic", false},
				{"fields", bson.D{
					{"searchable_types", bson.A{
						bson.D{
							{"type", "document"},
							{"dynamic", bson.D{
								{"typeSet", "tokenTypeSet"},
							}},
						},
					}},
				}},
			}},
			{"typeSets", bson.A{
				bson.D{
					{"name", "tokenTypeSet"},
					{"types", bson.A{
						bson.D{{"type", "token"}},
					}},
				},
			}},
		},
		Options: options.SearchIndexes().SetName("listingsSearchableTypes"),
	}

	// Create the index
	searchIndexName, err := coll.SearchIndexes().CreateOne(ctx, indexModel)
	if err != nil {
		log.Fatalf("failed to create the search index: %v", err)
	}
	log.Println("New search index named " + searchIndexName + " is building.")
}
