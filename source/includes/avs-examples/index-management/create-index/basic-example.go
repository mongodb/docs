package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	ctx := context.Background()

	// Replace the placeholder with your Atlas connection string
	const uri = "<connectionString>"

	// Connect to your Atlas cluster
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatalf("failed to connect to the server: %v", err)
	}
	defer func() { _ = client.Disconnect(ctx) }()

	// Set the namespace
	coll := client.Database("sample_mflix").Collection("embedded_movies")

	// Define the index details
	type vectorDefinitionField struct {
		Type          string `bson:"type"`
		Path          string `bson:"path"`
		NumDimensions int    `bson:"numDimensions"`
		Similarity    string `bson:"similarity"`
	}

	type vectorDefinition struct {
		Fields []vectorDefinitionField `bson:"fields"`
	}

	indexName := "vector_index"
	opts := options.SearchIndexes().SetName(indexName).SetType("vectorSearch")

	indexModel := mongo.SearchIndexModel{
		Definition: vectorDefinition{
			Fields: []vectorDefinitionField{{
				Type:          "vector",
				Path:          "plot_embedding",
				NumDimensions: 1536,
				Similarity:    "euclidean"}},
		},
		Options: opts,
	}

	// Create the index
	searchIndexName, err := coll.SearchIndexes().CreateOne(ctx, indexModel)
	if err != nil {
		log.Fatalf("failed to create the search index: %v", err)
	}
	log.Println("New search index named " + searchIndexName + " is building.")

	// Await the creation of the index.
	log.Println("Polling to check if the index is ready. This may take up to a minute.")
	searchIndexes := coll.SearchIndexes()
	var doc bson.Raw
	for doc == nil {
		cursor, err := searchIndexes.List(ctx, options.SearchIndexes().SetName(searchIndexName))
		if err != nil {
			fmt.Errorf("failed to list search indexes: %w", err)
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

	log.Println(searchIndexName + " is ready for querying.")
}
