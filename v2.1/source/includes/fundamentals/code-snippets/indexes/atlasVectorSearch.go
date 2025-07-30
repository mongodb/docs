package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	ctx := context.Background()

	// Retrieves your Atlas connection string
	uri := os.Getenv("MONGODB_ATLAS_URI")
	if uri == "" {
		log.Fatal("MONGODB_ATLAS_URI environment variable is not set")
	}

	// Connect to your Atlas cluster
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatalf("Failed to connect to the server: %v", err)
	}
	defer func() {
		if err := client.Disconnect(ctx); err != nil {
			log.Fatalf("Failed to disconnect: %v", err)
		}
	}()

	// Set the namespace
	coll := client.Database("sample_mflix").Collection("embedded_movies")

	// start-create-vector-search
	// Defines the structs used for the index definition
	type vectorDefinitionField struct {
		Type          string `bson:"type"`
		Path          string `bson:"path"`
		NumDimensions int    `bson:"numDimensions"`
		Similarity    string `bson:"similarity"`
		Quantization  string `bson:"quantization"`
	}

	type vectorDefinition struct {
		Fields []vectorDefinitionField `bson:"fields"`
	}

	// Sets the index name and type to "vectorSearch"
	const indexName = "vector_search_index"
	opts := options.SearchIndexes().SetName(indexName).SetType("vectorSearch")

	// Defines the index definition
	vectorSearchIndexModel := mongo.SearchIndexModel{
		Definition: vectorDefinition{
			Fields: []vectorDefinitionField{{
				Type:          "vector",
				Path:          "plot_embedding",
				NumDimensions: 1536,
				Similarity:    "dotProduct",
				Quantization:  "scalar"}},
		},
		Options: opts,
	}

	// Creates the index
	searchIndexName, err := coll.SearchIndexes().CreateOne(ctx, vectorSearchIndexModel)
	if err != nil {
		log.Fatalf("Failed to create the Atlas Vector Search index: %v", err)
	}
	// end-create-vector-search

	// Creates an Atlas Search index
	// start-create-atlas-search
	// Sets the index name and type to "search"
	const indexName = "search_index"
	opts := options.SearchIndexes().SetName(indexName).SetType("search")

	// Defines the index definition
	searchIndexModel := mongo.SearchIndexModel{
		Definition: bson.D{
			{Key: "mappings", Value: bson.D{
				{Key: "dynamic", Value: false},
				{Key: "fields", Value: bson.D{
					{Key: "plot", Value: bson.D{
						{Key: "type", Value: "string"},
					}},
				}},
			}},
		},
		Options: opts,
	}

	// Creates the index
	searchIndexName, err := coll.SearchIndexes().CreateOne(ctx, searchIndexModel)
	if err != nil {
		log.Fatalf("Failed to create the Atlas Search index: %v", err)
	}
	// end-create-atlas-search

	// start-list-index
	// Specifies the index to retrieve
	const indexName = "myIndex"
	opts := options.SearchIndexes().SetName(indexName)

	// Retrieves the details of the specified index
	cursor, err := coll.SearchIndexes().List(ctx, opts)

	// Prints the index details to the console as JSON
	var results []bson.D
	if err := cursor.All(ctx, &results); err != nil {
		log.Fatalf("Failed to unmarshal results to bson: %v", err)
	}
	res, err := json.Marshal(results)
	if err != nil {
		log.Fatalf("Failed to marshal results to json: %v", err)
	}
	fmt.Println(res)
	// end-list-index

	// start-update-index
	// Specifies the index name and the new index definition
	const indexName = "vector_search_index"

	type vectorDefinitionField struct {
		Type          string `bson:"type"`
		Path          string `bson:"path"`
		NumDimensions int    `bson:"numDimensions"`
		Similarity    string `bson:"similarity"`
	}

	type vectorDefinition struct {
		Fields []vectorDefinitionField `bson:"fields"`
	}

	definition := vectorDefinition{
		Fields: []vectorDefinitionField{
			{
				Type:          "vector",
				Path:          "plot_embedding",
				NumDimensions: 1536,
				Similarity:    "cosine",
				Quantization:  "scalar",
			},
		},
	}

	// Updates the specified index
	err := coll.SearchIndexes().UpdateOne(ctx, indexName, definition)
	if err != nil {
		log.Fatalf("Failed to update the index: %v", err)
	}
	// end-update-index

	// start-delete-index
	// Deletes the specified index
	err := coll.SearchIndexes().DropOne(ctx, "myIndex")
	if err != nil {
		log.Fatalf("Failed to delete the index: %v", err)
	}
	// end-delete-index

}
