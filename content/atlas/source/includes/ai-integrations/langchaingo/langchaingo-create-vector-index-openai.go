package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"github.com/tmc/langchaingo/embeddings"
	"github.com/tmc/langchaingo/llms/openai"
	"github.com/tmc/langchaingo/schema"
	"github.com/tmc/langchaingo/vectorstores/mongovector"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

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
	// start-search-index-example
	// SearchIndexExists will return true if the provided index is defined for the
	// collection. This operation blocks until the search completes.
	if ok, _ := SearchIndexExists(context.Background(), coll, indexName); !ok {

		// Creates the vector store collection
		err = client.Database(databaseName).CreateCollection(context.Background(), collectionName)
		if err != nil {
			log.Fatalf("failed to create vector store collection: %v", err)
		}

		_, err = CreateVectorSearchIndex(context.Background(), coll, indexName, openAIEmbeddingDim, similarityAlgorithm)
		if err != nil {
			log.Fatalf("failed to create index: %v", err)
		}

		log.Println("Successfully created vector search index.")
	} else {
		log.Println("Vector search index already exists.")
	}
	// end-search-index-example
}

func isCollectionEmpty(coll *mongo.Collection) bool {
	count, err := coll.EstimatedDocumentCount(context.Background())
	if err != nil {
		log.Fatalf("Failed to count documents in the collection: %v", err)
	}
	return count == 0
}

// start-create-vector-search-index
// Checks if the search index exists
func SearchIndexExists(ctx context.Context, coll *mongo.Collection, idx string) (bool, error) {
	log.Println("Checking if search index exists.")

	view := coll.SearchIndexes()
	siOpts := options.SearchIndexes().SetName(idx).SetType("vectorSearch")
	cursor, err := view.List(ctx, siOpts)
	if err != nil {
		return false, fmt.Errorf("failed to list search indexes: %w", err)
	}

	for cursor.Next(ctx) {
		index := struct {
			Name      string `bson:"name"`
			Queryable bool   `bson:"queryable"`
		}{}
		if err := cursor.Decode(&index); err != nil {
			return false, fmt.Errorf("failed to decode search index: %w", err)
		}
		if index.Name == idx && index.Queryable {
			return true, nil
		}
	}

	if err := cursor.Err(); err != nil {
		return false, fmt.Errorf("cursor error: %w", err)
	}

	return false, nil
}

// Creates a vector search index. This function blocks until the index has been
// created.
func CreateVectorSearchIndex(
	ctx context.Context,
	coll *mongo.Collection,
	idxName string,
	openAIEmbeddingDim int,
	similarityAlgorithm string,
) (string, error) {
	type vectorField struct {
		Type          string `bson:"type,omitempty"`
		Path          string `bson:"path,omitempty"`
		NumDimensions int    `bson:"numDimensions,omitempty"`
		Similarity    string `bson:"similarity,omitempty"`
	}

	fields := []vectorField{
		{
			Type:          "vector",
			Path:          "embeddings",
			NumDimensions: openAIEmbeddingDim,
			Similarity:    similarityAlgorithm,
		},
		{
			Type: "filter",
			Path: "metadata.author",
		},
		{
			Type: "filter",
			Path: "metadata.type",
		},
	}

	def := struct {
		Fields []vectorField `bson:"fields"`
	}{
		Fields: fields,
	}

	log.Println("Creating vector search index...")

	view := coll.SearchIndexes()
	siOpts := options.SearchIndexes().SetName(idxName).SetType("vectorSearch")
	searchName, err := view.CreateOne(ctx, mongo.SearchIndexModel{Definition: def, Options: siOpts})
	if err != nil {
		return "", fmt.Errorf("failed to create the search index: %w", err)
	}

	// Awaits the creation of the index
	var doc bson.Raw
	for doc == nil {
		cursor, err := view.List(ctx, options.SearchIndexes().SetName(searchName))
		if err != nil {
			return "", fmt.Errorf("failed to list search indexes: %w", err)
		}

		if !cursor.Next(ctx) {
			break
		}

		name := cursor.Current.Lookup("name").StringValue()
		queryable := cursor.Current.Lookup("queryable").Boolean()
		if name == searchName && queryable {
			doc = cursor.Current
		} else {
			time.Sleep(5 * time.Second)
		}
	}

	return searchName, nil
}

// end-create-vector-search-index
