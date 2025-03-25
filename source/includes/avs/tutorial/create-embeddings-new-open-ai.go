package main

import (
	"context"
	"fmt"
	"log"
	"my-embeddings-project/common"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

var data = []string{
	"Titanic: The story of the 1912 sinking of the largest luxury liner ever built",
	"The Lion King: Lion cub and future king Simba searches for his identity",
	"Avatar: A marine is dispatched to the moon Pandora on a unique mission",
}

type TextWithEmbedding struct {
	Text      string
	Embedding []float64
}

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
	coll := client.Database("sample_db").Collection("embeddings")

	embeddings := common.GetEmbeddings(data)
	docsToInsert := make([]interface{}, len(data))
	for i, movie := range data {
		docsToInsert[i] = TextWithEmbedding{
			Text:      movie,
			Embedding: embeddings[i],
		}
	}

	result, err := coll.InsertMany(ctx, docsToInsert)

	if err != nil {
		log.Fatalf("failed to insert documents: %v", err)
	}
	fmt.Printf("Successfully inserted %v documents into Atlas\n", len(result.InsertedIDs))
}
