package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	ctx := context.Background()

	if err := godotenv.Load(); err != nil {
		log.Println("no .env file found")
	}
	// Connect to your Atlas cluster
	uri := os.Getenv("ATLAS_CONNECTION_STRING")
	if uri == "" {
		log.Fatal("set your 'ATLAS_CONNECTION_STRING' environment variable.")
	}
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(clientOptions)
	if err != nil {
		log.Fatalf("failed to connect to the server: %v", err)
	}
	defer func() { _ = client.Disconnect(ctx) }()

	// Set the namespace
	coll := client.Database("sample_airbnb").Collection("listingsAndReviews")
	indexName := "vector_index"
	opts := options.SearchIndexes().SetName(indexName).SetType("vectorSearch")

	type vectorDefinitionField struct {
		Type          string `bson:"type"`
		Path          string `bson:"path"`
		NumDimensions int    `bson:"numDimensions"`
		Similarity    string `bson:"similarity"`
	}

	type vectorDefinition struct {
		Fields []vectorDefinitionField `bson:"fields"`
	}

	indexModel := mongo.SearchIndexModel{
		Definition: vectorDefinition{
			Fields: []vectorDefinitionField{{
				Type:          "vector",
				Path:          "embeddings",
				NumDimensions: 768,
				Similarity:    "cosine"}},
		},
		Options: opts,
	}
	log.Println("Creating the index.")
	searchIndexName, err := coll.SearchIndexes().CreateOne(ctx, indexModel)
	if err != nil {
		log.Fatalf("failed to create the search index: %v", err)
	}

	// Await the creation of the index.
	log.Println("Polling to confirm successful index creation.")
	log.Println("NOTE: This may take up to a minute.")
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

	log.Println("Name of Index Created: " + searchIndexName)
}
