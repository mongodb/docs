package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	ctx := context.Background()

	// Replace the placeholder with your Atlas connection string
	const uri = "<connection-string>"

	// Connect to your Atlas cluster
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(clientOptions)
	if err != nil {
		log.Fatalf("failed to connect to the server: %v", err)
	}
	defer func() { _ = client.Disconnect(ctx) }()

	// Set the namespace
	coll := client.Database("<databaseName>").Collection("<collectionName>")
	indexName := "<indexName>"

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
		Fields: []vectorDefinitionField{{
			Type:          "vector",
			Path:          "<fieldToIndex>",
			NumDimensions: <numberOfDimensions>,
			Similarity:    "euclidean | cosine | dotProduct"}},
	}
	err = coll.SearchIndexes().UpdateOne(ctx, indexName, definition)

	if err != nil {
		log.Fatalf("failed to update the index: %v", err)
	}

	fmt.Println("Successfully updated the search index")
}
