package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

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
	model           = "voyage-3-large"
	outputDimension = 1024
	candidates      = <NUMBER-OF-CANDIDATES-TO-CONSIDER>
	numDocs         = <NUMBER-OF-DOCUMENTS-TO-RETURN>
)

func main() {
	apiKey := os.Getenv("VOYAGE_API_KEY")
	mongodbURI := os.Getenv("MONGODB_URI")

	if apiKey == "" {
		log.Fatal("API key not found. Set VOYAGE_API_KEY in your environment.")
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

// Generate embeddings using Voyage AI's embedding API from the query text
func generateAndConvertEmbeddings(apiKey, text string) (map[string]bson.Binary, error) {
	embeddingFormats := []string{"float", "int8", "ubinary"}
	embeddingsData := make(map[string]bson.Binary)

	for _, outputDType := range embeddingFormats {
		response := fetchEmbeddingsFromVoyageAPI(apiKey, text, outputDType)
		embedding := createBSONVectorEmbeddings(outputDType, response)
		embeddingsData[outputDType] = embedding
	}

	return embeddingsData, nil
}

// Fetch embeddings using Voyage AI Embedding REST API
func fetchEmbeddingsFromVoyageAPI(apiKey, text, outputDType string) map[string]interface{} {
	url := "https://ai.mongodb.com/v1/embeddings"

	requestBody := map[string]interface{}{
		"input":            []string{text},
		"model":            model,
		"output_dtype":     outputDType,
		"output_dimension": outputDimension,
		"input_type":       "query",
	}

	requestBytes, err := json.Marshal(requestBody)
	if err != nil {
		log.Fatalf("Failed to marshal request body: %v", err)
	}

	req, err := http.NewRequestWithContext(context.TODO(), "POST", url, bytes.NewBuffer(requestBytes))
	if err != nil {
		log.Fatalf("Failed to create HTTP request: %v", err)
	}

	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", apiKey))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatalf("Failed to make API request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		log.Fatalf("Unexpected status code %d: %s", resp.StatusCode, string(body))
	}

	var response struct {
		Data []map[string]interface{} `json:"data"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		log.Fatalf("Failed to parse API response: %v", err)
	}

	if len(response.Data) == 0 {
		log.Fatalf("No embeddings found in API response")
	}

	return response.Data[0]
}

// Convert embeddings to BSON vectors using MongoDB Go Driver
func createBSONVectorEmbeddings(dataType string, rawEmbedding map[string]interface{}) bson.Binary {
	embeddingArray := rawEmbedding["embedding"].([]interface{})

	switch dataType {
	case "float":
		floatData := convertInterfaceToFloat32(embeddingArray)
		floatVector := bson.NewVector(floatData)
		return floatVector.Binary()
	case "int8":
		int8Data := convertInterfaceToInt8(embeddingArray)
		int8Vector := bson.NewVector(int8Data)
		return int8Vector.Binary()
	case "ubinary":
		int1Data := convertInterfaceToBytes(embeddingArray)
		ubinaryVector, err := bson.NewPackedBitVector(int1Data, 0)
		if err != nil {
			log.Fatalf("Error creating PackedBitVector: %v", err)
		}
		return ubinaryVector.Binary()
	default:
		log.Fatalf("Unknown data type: %s", dataType)
		return bson.Binary{}
	}
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

	pathMap := map[string]string{
		"float":   "embeddings_float32",
		"int8":    "embeddings_int8",
		"ubinary": "embeddings_int1",
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
					{"numCandidates", candidates},
					{"limit", numDocs},
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

// Converts []interface{} to []float32 safely
func convertInterfaceToFloat32(data []interface{}) []float32 {
	f32s := make([]float32, len(data))
	for i, v := range data {
		switch val := v.(type) {
		case float64:
			f32s[i] = float32(val)
		case int:
			f32s[i] = float32(val)
		default:
			log.Fatalf("Unexpected type %T in float32 conversion at index %d", v, i)
		}
	}
	return f32s
}

// Converts []interface{} to []int8 safely
func convertInterfaceToInt8(data []interface{}) []int8 {
	ints8 := make([]int8, len(data))
	for i, v := range data {
		switch val := v.(type) {
		case float64:
			ints8[i] = int8(val)
		case int:
			ints8[i] = int8(val)
		default:
			log.Fatalf("Unexpected type %T in int8 conversion at index %d", v, i)
		}
	}
	return ints8
}

// Converts []interface{} to []byte (uint8) safely
func convertInterfaceToBytes(data []interface{}) []byte {
	bytesOut := make([]byte, len(data))
	for i, v := range data {
		switch val := v.(type) {
		case float64:
			bytesOut[i] = byte(val)
		case int:
			bytesOut[i] = byte(val)
		default:
			log.Fatalf("Unexpected type %T in byte conversion at index %d", v, i)
		}
	}
	return bytesOut
}
