package common

import (
	"context"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/tmc/langchaingo/embeddings"
	"github.com/tmc/langchaingo/llms/ollama"
	"github.com/tmc/langchaingo/schema"
	"github.com/tmc/langchaingo/vectorstores/mongovector"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func RetrieveDocuments(query string) []schema.Document {
	ctx := context.Background()

	if err := godotenv.Load(); err != nil {
		log.Fatal("no .env file found")
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

	// Specify the database and collection
	coll := client.Database("sample_airbnb").Collection("listingsAndReviews")

	// Define the filter and update
	filter := bson.D{
		{Key: "embeddings", Value: bson.D{{Key: "$exists", Value: true}}},
		{Key: "pageContent", Value: bson.D{{Key: "$exists", Value: false}}},
		{Key: "metadata.listing_url", Value: bson.D{{Key: "$exists", Value: false}}},
	}

	update := bson.D{{
		Key: "$set", Value: bson.D{
			{Key: "pageContent", Value: "$summary"},
			{Key: "metadata.listing_url", Value: "$listing_url"},
		},
	}}

	// Perform the update
	_, err = coll.UpdateMany(ctx, filter, update)
	if err != nil {
		log.Fatal(err)
	}

	llm, err := ollama.New(ollama.WithModel("nomic-embed-text"))
	if err != nil {
		log.Fatalf("failed to create an embeddings client: %v", err)
	}

	embedder, err := embeddings.NewEmbedder(llm)
	if err != nil {
		log.Fatalf("failed to create an embedder: %v", err)
	}

	store := mongovector.New(coll, embedder, mongovector.WithPath("embeddings"))

	// Search for similar documents.
	docs, err := store.SimilaritySearch(context.Background(), query, 5)
	if err != nil {
		log.Fatalf("error performing similarity search: %v", err)
	}

	return docs
}
