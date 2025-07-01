package main

import (
        "context"
        "fmt"
        "log"
        "os"

        cohere "github.com/cohere-ai/cohere-go/v2"
        cohereclient "github.com/cohere-ai/cohere-go/v2/client"
        "go.mongodb.org/mongo-driver/v2/bson"
        "go.mongodb.org/mongo-driver/v2/mongo"
        "go.mongodb.org/mongo-driver/v2/mongo/options"
)

const (
	dbName          = "<DATABASE-NAME>"
	collectionName  = "<COLLECTION-NAME>"
	vectorIndexName = "<INDEX-NAME>"
	dataFieldName   = "<TEXT-FIELD-NAME>"
	queryText       = "<QUERY-TEXT>"
)

func main() {
	apiKey := os.Getenv("COHERE_API_KEY")
	mongodbURI := os.Getenv("MONGODB_URI")

	if apiKey == "" {
		log.Fatal("API key not found. Set COHERE_API_KEY in your environment.")
	}
	if mongodbURI == "" {
		log.Fatal("MongoDB URI not found. Set MONGODB_URI in your environment.")
	}

	embeddingsData, err := generateAndConvertEmbeddings(apiKey, queryText)
	if err != nil {
		log.Fatalf("Error generating embeddings: %v", err)
	}

	err = runVectorSearchQuery(mongodbURI, embeddingsData)
	if err != nil {
		log.Fatalf("Error running vector search query: %v", err)
	}
}

// Generate embeddings using Cohere's embed API from the query text
func generateAndConvertEmbeddings(apiKey, text string) (map[string]bson.Binary, error) {
	client := cohereclient.NewClient(cohereclient.WithToken(apiKey))

	model := "embed-english-v3.0"
	response, err := client.V2.Embed(context.TODO(), &cohere.V2EmbedRequest{
		Texts:     []string{text},
		Model:     model,
		InputType: cohere.EmbedInputTypeSearchQuery,
		EmbeddingTypes: []cohere.EmbeddingType{
			cohere.EmbeddingTypeFloat,
			cohere.EmbeddingTypeInt8,
			cohere.EmbeddingTypeUbinary,
		},
	})
	if err != nil {
		return nil, fmt.Errorf("failed to fetch embeddings: %w", err)
	}

	if response.Embeddings == nil || len(response.Embeddings.Float) == 0 {
		return nil, fmt.Errorf("no embeddings found in the API response")
	}

	return createBSONVectorEmbeddings(response.Embeddings), nil
}

// Convert embeddings to BSON vectors using MongoDB Go Driver
func createBSONVectorEmbeddings(embeddings *cohere.EmbedByTypeResponseEmbeddings) map[string]bson.Binary {
	bsonVectorEmbeddings := make(map[string]bson.Binary)

	// Convert float embeddings
	if len(embeddings.Float) > 0 {
		floatData := convertFloat64ToFloat32(embeddings.Float[0])
		floatVector := bson.NewVector(floatData) // Here, we are using bson.NewVector to create a BSON Vector.
		bsonVectorEmbeddings["float32"] = floatVector.Binary()
	}

	// Convert int8 embeddings
	if len(embeddings.Int8) > 0 {
		int8Data := convertIntToInt8(embeddings.Int8[0])
		int8Vector := bson.NewVector(int8Data) // Similarly, create BSON Vector for int8 data.
		bsonVectorEmbeddings["int8"] = int8Vector.Binary()
	}

	// Convert ubinary embeddings to a packed bit vector
	if len(embeddings.Ubinary) > 0 {
		int1Data := convertIntToBytes(embeddings.Ubinary[0])
		ubinaryVector, _ := bson.NewPackedBitVector(int1Data, 0) // Packed bit using bson.NewPackedBitVector
		bsonVectorEmbeddings["int1"] = ubinaryVector.Binary()
	}

	return bsonVectorEmbeddings
}

// Run $vectorSearch query using the embeddings
func runVectorSearchQuery(mongodbURI string, embeddingsData map[string]bson.Binary) error {
	ctx := context.Background()
	clientOptions := options.Client().ApplyURI(mongodbURI)
	client, err := mongo.Connect(clientOptions)
	if err != nil {
		return fmt.Errorf("failed to connect to MongoDB: %w", err)
	}
	defer func() { _ = client.Disconnect(ctx) }()

	db := client.Database(dbName)
	collection := db.Collection(collectionName)

	// Map the correct paths for embeddings
	pathMap := map[string]string{
		"float32": "embeddings_float32",
		"int8":    "embeddings_int8",
		"int1":    "embeddings_int1",
	}

	for pathKey, queryVector := range embeddingsData {
		path, ok := pathMap[pathKey]
		if !ok {
			return fmt.Errorf("invalid path key: %s", pathKey)
		}

		pipeline := mongo.Pipeline{
			{
				{"$vectorSearch", bson.D{
					{"queryVector", queryVector},
					{"index", vectorIndexName},
					{"path", path},
					{"numCandidates", 5},
					{"limit", 2},
				}},
			},
			{
				{"$project", bson.D{
					{"_id", 1},
					{dataFieldName, 1},
					{"score", bson.D{
						{"$meta", "vectorSearchScore"},
					}},
				}},
			},
		}

		cursor, err := collection.Aggregate(context.Background(), pipeline)
		if err != nil {
			return fmt.Errorf("failed to run vector search aggregation query: %w", err)
		}
		defer cursor.Close(ctx)

		var results []bson.M
		if err = cursor.All(context.Background(), &results); err != nil {
			return fmt.Errorf("failed to parse aggregation query results: %w", err)
		}

		fmt.Printf("Results from %v embeddings:\n", path)
		for _, result := range results {
			fmt.Println(result)
		}
	}

	return nil
}

// Utility functions to handle list conversion
func convertFloat64ToFloat32(f64s []float64) []float32 {
	f32s := make([]float32, len(f64s))
	for i, v := range f64s {
		f32s[i] = float32(v)
	}
	return f32s
}

func convertIntToInt8(ints []int) []int8 {
	ints8 := make([]int8, len(ints))
	for i, val := range ints {
		ints8[i] = int8(val)
	}
	return ints8
}

func convertIntToBytes(ints []int) []byte {
	bytes := make([]byte, len(ints))
	for i, val := range ints {
		bytes[i] = byte(val)
	}
	return bytes
}
