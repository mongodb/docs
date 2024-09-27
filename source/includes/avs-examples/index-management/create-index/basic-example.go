package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {

	ctx := context.TODO()

	// Replace the placeholder with your Atlas connection string
	const uri = "<connectionString>"

	// Connect to your Atlas cluster
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

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
	name, err := coll.SearchIndexes().CreateOne(ctx, indexModel)
	if err != nil {
		panic(err)
	}
	fmt.Println("Name of Index Created: " + name)
}
