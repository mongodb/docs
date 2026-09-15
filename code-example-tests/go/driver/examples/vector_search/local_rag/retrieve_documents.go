//	:replace-start: {
//	  "terms": {
//	    "package local_rag": "package common",
//	    "utils.GetConnectionString()": "os.Getenv(\"MONGODB_URI\")",
//	    "EmbeddingsField": "\"embeddings\"",
//	    "VectorIndexName": "\"vector_index\""
//	  }
//	}
//
// :snippet-start: retrieve-documents
package local_rag

import (
	"context"
	"log"
	//:uncomment-start:
	//"os"
	//:uncomment-end:
	"driver-examples/utils" //:remove:

	//:uncomment-start:
	//"github.com/joho/godotenv"
	//:uncomment-end:
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

	// :remove-start:
	// The tests load environment variables through the suite's utils package,
	// which reads the .env file at the root of the Go suite.
	// :remove-end:
	// :uncomment-start:
	// if err := godotenv.Load(); err != nil {
	// 	log.Fatal("no .env file found")
	// }
	// :uncomment-end:

	// Connect to your MongoDB cluster
	uri := utils.GetConnectionString()
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
	coll := client.Database("sample_airbnb").Collection("listingsAndReviews")

	// Define the filter and update. The mongovector store reads the document
	// text from pageContent and any extra fields from metadata, so copy the
	// summary and listing URL into those fields.
	filter := bson.D{
		{Key: EmbeddingsField, Value: bson.D{{Key: "$exists", Value: true}}},
		{Key: "pageContent", Value: bson.D{{Key: "$exists", Value: false}}},
		{Key: "metadata.listing_url", Value: bson.D{{Key: "$exists", Value: false}}},
	}

	update := mongo.Pipeline{
		bson.D{{Key: "$set", Value: bson.D{
			{Key: "pageContent", Value: "$summary"},
			{Key: "metadata", Value: bson.D{{Key: "listing_url", Value: "$listing_url"}}},
		}}},
	}

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

	store := mongovector.New(coll, embedder,
		mongovector.WithIndex(VectorIndexName),
		mongovector.WithPath(EmbeddingsField))

	// Search for similar documents.
	docs, err := store.SimilaritySearch(context.Background(), query, 5)
	if err != nil {
		log.Fatalf("error performing similarity search: %v", err)
	}

	return docs
}

// :snippet-end:
// :replace-end:
