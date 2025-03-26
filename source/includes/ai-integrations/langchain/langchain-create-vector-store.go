package main

import (
	"context"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/tmc/langchaingo/embeddings"
	"github.com/tmc/langchaingo/llms/openai"
	"github.com/tmc/langchaingo/schema"
	"github.com/tmc/langchaingo/vectorstores/mongovector"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// start-create-vector-store
// Defines the document structure
type Document struct {
	PageContent string            `bson:"text"`
	Embedding   []float32         `bson:"embedding"`
	Metadata    map[string]string `bson:"metadata"`
}

func main() {
	const (
		openAIEmbeddingModel = "text-embedding-3-small"
		openAIEmbeddingDim   = 1536
		similarityAlgorithm  = "dotProduct"
		indexName            = "vector_index"
		databaseName         = "langchaingo_db"
		collectionName       = "test"
	)

	if err := godotenv.Load(); err != nil {
		log.Fatal("No .env file found")
	}

	// Loads the MongoDB URI from environment
	uri := os.Getenv("ATLAS_CONNECTION_STRING")
	if uri == "" {
		log.Fatal("Set your 'ATLAS_CONNECTION_STRING' environment variable in the .env file")
	}

	// Loads the API key from environment
	apiKey := os.Getenv("OPENAI_API_KEY")
	if apiKey == "" {
		log.Fatal("Set your OPENAI_API_KEY environment variable in the .env file")
	}

	// Connects to MongoDB Atlas
	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatalf("Failed to connect to server: %v", err)
	}

	defer func() {
		if err := client.Disconnect(context.Background()); err != nil {
			log.Fatalf("Error disconnecting the client: %v", err)
		}
	}()

	log.Println("Connected to MongoDB Atlas.")

	// Selects the database and collection
	coll := client.Database(databaseName).Collection(collectionName)

	// Creates an OpenAI LLM embedder client
	llm, err := openai.New(openai.WithEmbeddingModel(openAIEmbeddingModel))
	if err != nil {
		log.Fatalf("Failed to create an embedder client: %v", err)
	}

	// Creates an embedder from the embedder client
	embedder, err := embeddings.NewEmbedder(llm)
	if err != nil {
		log.Fatalf("Failed to create an embedder: %v", err)
	}

	// Creates a new MongoDB Atlas vector store
	store := mongovector.New(coll, embedder, mongovector.WithIndex(indexName), mongovector.WithPath("embeddings"))

	// Checks if the collection is empty, and if empty, adds documents to the MongoDB Atlas database vector store
	if isCollectionEmpty(coll) {
		documents := []schema.Document{
			{
				PageContent: "Proper tuber planting involves site selection, proper timing, and exceptional care. Choose spots with well-drained soil and adequate sun exposure. Tubers are generally planted in spring, but depending on the plant, timing varies. Always plant with the eyes facing upward at a depth two to three times the tuber's height. Ensure 4 inch spacing between small tubers, expand to 12 inches for large ones. Adequate moisture is needed, yet do not overwater. Mulching can help preserve moisture and prevent weed growth.",
				Metadata: map[string]any{
					"author": "A",
					"type":   "post",
				},
			},
			{
				PageContent: "Successful oil painting necessitates patience, proper equipment, and technique. Begin with a carefully prepared, primed canvas. Sketch your composition lightly before applying paint. Use high-quality brushes and oils to create vibrant, long-lasting artworks. Remember to paint 'fat over lean,' meaning each subsequent layer should contain more oil to prevent cracking. Allow each layer to dry before applying another. Clean your brushes often and avoid solvents that might damage them. Finally, always work in a well-ventilated space.",
				Metadata: map[string]any{
					"author": "B",
					"type":   "post",
				},
			},
			{
				PageContent: "For a natural lawn, selection of the right grass type suitable for your climate is crucial. Balanced watering, generally 1 to 1.5 inches per week, is important; overwatering invites disease. Opt for organic fertilizers over synthetic versions to provide necessary nutrients and improve soil structure. Regular lawn aeration helps root growth and prevents soil compaction. Practice natural pest control and consider overseeding to maintain a dense sward, which naturally combats weeds and pest.",
				Metadata: map[string]any{
					"author": "C",
					"type":   "post",
				},
			},
		}

		_, err := store.AddDocuments(context.Background(), documents)

		if err != nil {
			log.Fatalf("Error adding documents: %v", err)
		}

		log.Printf("Successfully added %d documents to the collection.\n", len(documents))
	} else {
		log.Println("Documents already exist in the collection, skipping document addition.")
	}

}

func isCollectionEmpty(coll *mongo.Collection) bool {
	count, err := coll.EstimatedDocumentCount(context.Background())
	if err != nil {
		log.Fatalf("Failed to count documents in the collection: %v", err)
	}
	return count == 0
}

// end-create-vector-store
