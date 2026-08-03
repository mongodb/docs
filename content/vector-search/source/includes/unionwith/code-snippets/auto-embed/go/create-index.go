package main

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	ctx := context.Background()

	// Replace the placeholder with your connection string
	const uri = "<connectionString>"

	// Connect to your cluster
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(clientOptions)
	if err != nil {
		log.Fatalf("failed to connect to the server: %v", err)
	}
	defer func() { _ = client.Disconnect(ctx) }()

	// Set the namespace
	coll := client.Database("sample_mflix").Collection("embedded_movies")

	// Define the index details
	type autoEmbedField struct {
		Type          string `bson:"type"`
		Modality      string `bson:"modality"`
		Path          string `bson:"path"`
		Model         string `bson:"model"`
		NumDimensions int    `bson:"numDimensions"`
	}

	type vectorField struct {
		Type          string `bson:"type"`
		Path          string `bson:"path"`
		NumDimensions int    `bson:"numDimensions"`
		Similarity    string `bson:"similarity"`
	}

	type vectorDefinition struct {
		Fields []any `bson:"fields"`
	}

	// Define the auto-embed index model
	autoEmbedName := "multiple-auto-embed-search"
	autoEmbedOpts := options.SearchIndexes().SetName(autoEmbedName).SetType("vectorSearch")
	autoEmbedIndexModel := mongo.SearchIndexModel{
		Definition: vectorDefinition{
			Fields: []any{
				autoEmbedField{
					Type:          "autoEmbed",
					Modality:      "text",
					Path:          "fullplot",
					Model:         "voyage-4",
					NumDimensions: 2048,
				},
				autoEmbedField{
					Type:          "autoEmbed",
					Modality:      "text",
					Path:          "title",
					Model:         "voyage-4",
					NumDimensions: 2048,
				},
			},
		},
		Options: autoEmbedOpts,
	}

	// Define the vector index model
	vectorName := "multiple-models-search"
	vectorOpts := options.SearchIndexes().SetName(vectorName).SetType("vectorSearch")
	vectorIndexModel := mongo.SearchIndexModel{
		Definition: vectorDefinition{
			Fields: []any{
				vectorField{
					Type:          "vector",
					Path:          "plot_embedding",
					NumDimensions: 1536,
					Similarity:    "dotProduct",
				},
			},
		},
		Options: vectorOpts,
	}

	// Create the indexes
	log.Println("Creating the indexes.")
	searchIndexes := coll.SearchIndexes()
	autoEmbedResult, err := searchIndexes.CreateOne(ctx, autoEmbedIndexModel)
	if err != nil {
		log.Fatalf("failed to create the search index: %v", err)
	}

	vectorResult, err := searchIndexes.CreateOne(ctx, vectorIndexModel)
	if err != nil {
		log.Fatalf("failed to create the search index: %v", err)
	}

	// Await the creation of the indexes.
	log.Println("Polling to confirm successful index creation.")
	log.Println("NOTE: This may take up to a minute.")
	for _, searchIndexName := range []string{autoEmbedResult, vectorResult} {
		var doc bson.Raw
		for doc == nil {
			cursor, err := searchIndexes.List(ctx, options.SearchIndexes().SetName(searchIndexName))
			if err != nil {
				log.Fatalf("failed to list search indexes: %v", err)
			}

			if !cursor.Next(ctx) {
				break
			}

			name := cursor.Current.Lookup("name").StringValue()
			queryable := cursor.Current.Lookup("queryable").Boolean()
			if name == searchIndexName && queryable {
				doc = cursor.Current
			} else {
				time.Sleep(5 * time.Second)
			}
		}

		log.Println("Name of Index Created: " + searchIndexName)
	}
}
