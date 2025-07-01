package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"rag-mongodb/common"

	"github.com/joho/godotenv"
	"github.com/tmc/langchaingo/embeddings/huggingface"
	"github.com/tmc/langchaingo/vectorstores/mongovector"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	filename := "investor-report.html"
	common.DownloadReport(filename)
	docs := common.ProcessFile(filename)

	if err := godotenv.Load(); err != nil {
		log.Fatal("no .env file found")
	}

	// Connect to your Atlas cluster
	uri := os.Getenv("ATLAS_CONNECTION_STRING")
	if uri == "" {
		log.Fatal("set your 'ATLAS_CONNECTION_STRING' environment variable.")
	}

	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatalf("failed to connect to server: %v", err)
	}

	defer func() {
		if err := client.Disconnect(context.Background()); err != nil {
			log.Fatalf("error disconnecting the client: %v", err)
		}
	}()

	coll := client.Database("rag_db").Collection("test")

	embedder, err := huggingface.NewHuggingface(
		huggingface.WithModel("mixedbread-ai/mxbai-embed-large-v1"),
		huggingface.WithTask("feature-extraction"))

	if err != nil {
		log.Fatal("failed to create an embedder: %v", err)
	}

	store := mongovector.New(coll, embedder, mongovector.WithPath("embedding"))

	// Add documents to the MongoDB Atlas Database vector store.
	log.Println("Generating embeddings.")
	result, err := store.AddDocuments(context.Background(), docs)

	if err != nil {
		log.Fatalf("failed to insert documents: %v", err)
	}
	fmt.Printf("Successfully inserted %v documents into Atlas\n", len(result))
}
