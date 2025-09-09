package common

import (
	"context"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/tmc/langchaingo/embeddings/voyageai"
	"github.com/tmc/langchaingo/schema"
	"github.com/tmc/langchaingo/vectorstores/mongovector"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func GetQueryResults(query string) []schema.Document {
	ctx := context.Background()

	if err := godotenv.Load(); err != nil {
		log.Fatal("no .env file found")
	}

	// Connect to your MongoDB cluster
	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		log.Fatal("set your 'MONGODB_URI' environment variable.")
	}
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(clientOptions)
	if err != nil {
		log.Fatalf("failed to connect to the server: %v", err)
	}
	defer func() { _ = client.Disconnect(ctx) }()

	// Specify the database and collection
	coll := client.Database("rag_db").Collection("test")

	embedder, err := voyageai.NewVoyageAI(
		voyageai.WithModel("voyage-3-large"),
	)

	if err != nil {
		log.Fatal("failed to create an embedder: %v", err)
	}

	store := mongovector.New(coll, embedder, mongovector.WithPath("embedding"))

	// Search for similar documents.
	docs, err := store.SimilaritySearch(context.Background(), query, 5)
	if err != nil {
		log.Fatal("error performing similarity search: %v", err)
	}

	return docs
}
