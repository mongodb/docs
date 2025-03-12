package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"rag-mongodb/common" // Module that contains the embedding function

	"github.com/joho/godotenv"
	"github.com/tmc/langchaingo/documentloaders"
	"github.com/tmc/langchaingo/textsplitter"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type DocumentToInsert struct {
	PageContent string    `bson:"pageContent"`
	Embedding   []float32 `bson:"embedding"`
}

func downloadReport(filename string) {
	_, err := os.Stat(filename)
	if err == nil {
		return
	}

	url := "https://investors.mongodb.com/node/12236"
	fmt.Println("Downloading ", url, " to ", filename)

	resp, err := http.Get(url)
	if err != nil {
		log.Fatalf("failed to connect to download the report: %v", err)
	}
	defer func() { _ = resp.Body.Close() }()

	f, err := os.Create(filename)
	if err != nil {
		return
	}
	defer func() { _ = f.Close() }()
	_, err = io.Copy(f, resp.Body)
	if err != nil {
		log.Fatalf("failed to copy the report: %v", err)
	}
}

func main() {
	ctx := context.Background()
	filename := "investor-report.html"
	downloadReport(filename)
	f, err := os.Open(filename)
	if err != nil {
		defer func() { _ = f.Close() }()
		log.Fatalf("failed to open the report: %v", err)
	}
	defer func() { _ = f.Close() }()

	html := documentloaders.NewHTML(f)
	split := textsplitter.NewRecursiveCharacter()
	split.ChunkSize = 400
	split.ChunkOverlap = 20
	docs, err := html.LoadAndSplit(context.Background(), split)
	if err != nil {
		log.Fatalf("failed to chunk the HTML into documents: %v", err)
	}
	fmt.Printf("Successfully chunked the HTML into %v documents.\n", len(docs))

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

	// Set the namespace
	coll := client.Database("rag_db").Collection("test")

	fmt.Println("Generating embeddings.")
	var pageContents []string
	for i := range docs {
		pageContents = append(pageContents, docs[i].PageContent)
	}
	embeddings := common.GetEmbeddings(pageContents)

	docsToInsert := make([]interface{}, len(embeddings))
	for i := range embeddings {
		docsToInsert[i] = DocumentToInsert{
			PageContent: pageContents[i],
			Embedding:   embeddings[i],
		}
	}

	result, err := coll.InsertMany(ctx, docsToInsert)

	if err != nil {
		log.Fatalf("failed to insert documents: %v", err)
	}
	fmt.Printf("Successfully inserted %v documents into Atlas\n", len(result.InsertedIDs))
}
