package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// start-autoembedding-index-structs
// Defines the structs for the index definition
type autoEmbeddingField struct {
	Type     string `bson:"type"`     // "autoEmbed"
	Modality string `bson:"modality"` // "text"
	Path     string `bson:"path"`     // e.g. "plot"
	Model    string `bson:"model"`    // e.g. "voyage-4"
}

type filterField struct {
	Type string `bson:"type"` // "filter"
	Path string `bson:"path"`
}

type autoEmbeddingDefinition struct {
	Fields []any `bson:"fields"`
}

// end-autoembedding-index-structs

func main() {
	ctx := context.Background()
	uri := os.Getenv("MONGODB_URI")

	// Connects to MongoDB
	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}
	defer client.Disconnect(ctx)

	// start-autoembedding-index-create
	// Gets collection reference
	coll := client.Database("sample_mflix").Collection("movies")
	// Sets the index name and type to "vectorSearch"
	const indexName = "auto_embedding_index"

	opts := options.SearchIndexes().
		SetName(indexName).
		SetType("vectorSearch")

	// Specifies the index definition
	def := autoEmbeddingDefinition{
		Fields: []any{
			autoEmbeddingField{
				Type:     "autoEmbed",
				Modality: "text",
				Path:     "plot",
				Model:    "voyage-4",
			},
			// Optional filter fields
			filterField{
				Type: "filter",
				Path: "runtime",
			},
			filterField{
				Type: "filter",
				Path: "year",
			},
		},
	}

	indexModel := mongo.SearchIndexModel{
		Definition: def,
		Options:    opts,
	}

	// Creates the index on the movies collection
	searchIndexName, err := coll.SearchIndexes().CreateOne(ctx, indexModel)
	if err != nil {
		log.Fatalf("Failed to create the MongoDB Vector Search auto-embedding index: %v", err)
	}
	fmt.Println("Created MongoDB Vector Search auto-embedding index:", searchIndexName)
	// end-autoembedding-index-create
}
