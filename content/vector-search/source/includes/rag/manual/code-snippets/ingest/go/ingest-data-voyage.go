package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"rag-mongodb/common"

	"github.com/joho/godotenv"
	"github.com/tmc/langchaingo/embeddings/voyageai"
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

	// Connect to your MongoDB cluster
	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		log.Fatal("set your 'MONGODB_URI' environment variable.")
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

	embedder, err := voyageai.NewVoyageAI(
		voyageai.WithModel("voyage-3-large"),
	)

	if err != nil {
		log.Fatal("failed to create an embedder: %v", err)
	}

	store := mongovector.New(coll, embedder, mongovector.WithPath("embedding"))

	// Add documents to the MongoDB collection.
	log.Println("Generating embeddings.")
	result, err := store.AddDocuments(context.Background(), docs)

	if err != nil {
		log.Fatalf("failed to insert documents: %v", err)
	}
	fmt.Printf("Successfully inserted %v documents\n", len(result))
}
