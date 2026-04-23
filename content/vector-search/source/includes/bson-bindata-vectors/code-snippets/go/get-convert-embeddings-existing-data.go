package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

const (
	batchSize       = 96
	dbName          = "sample_airbnb"
	collName        = "listingsAndReviews"
	model           = "voyage-3-large"
	outputDimension = 1024
)

func main() {
	apiKey := os.Getenv("VOYAGE_API_KEY")
	mongodbURI := os.Getenv("MONGODB_URI")

	if apiKey == "" || mongodbURI == "" {
		log.Fatal("Ensure VOYAGE_API_KEY and MONGODB_URI are set.")
	}

	summaries, err := fetchSummariesFromMongoDB(mongodbURI)
	if err != nil {
		log.Fatalf("Error fetching summaries: %v", err)
	}

	for start := 0; start < len(summaries); start += batchSize {
		end := start + batchSize
		if end > len(summaries) {
			end = len(summaries)
		}

		floatEmbeddings, err := fetchEmbeddingsFromVoyage(apiKey, summaries[start:end], "float")
		if err != nil {
			log.Fatalf("Error fetching float embeddings: %v", err)
		}

		int8Embeddings, err := fetchEmbeddingsFromVoyage(apiKey, summaries[start:end], "int8")
		if err != nil {
			log.Fatalf("Error fetching int8 embeddings: %v", err)
		}

		ubinaryEmbeddings, err := fetchEmbeddingsFromVoyage(apiKey, summaries[start:end], "ubinary")
		if err != nil {
			log.Fatalf("Error fetching ubinary embeddings: %v", err)
		}

		documents := convertEmbeddingsToBSON(summaries[start:end], floatEmbeddings, int8Embeddings, ubinaryEmbeddings)

		err = writeJSONToFile("embeddings.json", documents)
		if err != nil {
			log.Fatalf("Error writing embeddings to JSON: %v", err)
		}
	}

	fmt.Println("Embeddings successfully saved to embeddings.json")
}

// Fetch documents with the summary field from the collection
func fetchSummariesFromMongoDB(uri string) ([]string, error) {
	ctx := context.TODO()
	clientOpts := options.Client().ApplyURI(uri)

	client, err := mongo.Connect(clientOpts)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to MongoDB: %w", err)
	}
	defer func() {
		if err := client.Disconnect(ctx); err != nil {
			log.Fatalf("Failed to disconnect MongoDB client: %v", err)
		}
	}()

	collection := client.Database(dbName).Collection(collName)
	filter := bson.M{"summary": bson.M{"$nin": []interface{}{nil, ""}}}

	cursor, err := collection.Find(ctx, filter, options.Find().SetLimit(50))
	if err != nil {
		return nil, fmt.Errorf("error finding documents: %w", err)
	}
	defer cursor.Close(ctx)

	var summaries []string
	for cursor.Next(ctx) {
		var result struct {
			Summary string `bson:"summary"`
		}
		if err := cursor.Decode(&result); err != nil {
			return nil, fmt.Errorf("error decoding document: %w", err)
		}
		if result.Summary != "" {
			summaries = append(summaries, result.Summary)
		}
	}

	if err := cursor.Err(); err != nil {
		return nil, fmt.Errorf("cursor error: %w", err)
	}

	return summaries, nil
}

// Fetch embeddings using Voyage AI REST API
func fetchEmbeddingsFromVoyage(apiKey string, texts []string, outputDType string) ([]map[string]interface{}, error) {
	url := "https://ai.mongodb.com/v1/embeddings"

	requestBody := map[string]interface{}{
		"input":            texts,
		"model":            model,
		"output_dtype":     outputDType,
		"output_dimension": outputDimension,
		"input_type":       "document",
	}

	requestBytes, err := json.Marshal(requestBody)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request body: %w", err)
	}

	req, err := http.NewRequestWithContext(context.TODO(), "POST", url, bytes.NewBuffer(requestBytes))
	if err != nil {
		return nil, fmt.Errorf("failed to create HTTP request: %w", err)
	}

	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", apiKey))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to make API request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := ioutil.ReadAll(resp.Body)
		return nil, fmt.Errorf("unexpected status code %d: %s", resp.StatusCode, string(body))
	}

	var response struct {
		Data []map[string]interface{} `json:"data"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return nil, fmt.Errorf("failed to parse API response: %w", err)
	}

	return response.Data, nil
}

// Convert embeddings to BSON binary vectors
func convertEmbeddingsToBSON(summaries []string, floatEmbeddings []map[string]interface{}, int8Embeddings []map[string]interface{}, ubinaryEmbeddings []map[string]interface{}) []bson.M {
	var documents []bson.M

	for i, summary := range summaries {
		floatEmbedding := convertInterfaceToFloat32(floatEmbeddings[i]["embedding"].([]interface{}))
		int8Embedding := convertInterfaceToInt8(int8Embeddings[i]["embedding"].([]interface{}))
		ubinaryEmbedding := convertInterfaceToBytes(ubinaryEmbeddings[i]["embedding"].([]interface{}))

		floatVector := bson.NewVector(floatEmbedding)
		int8Vector := bson.NewVector(int8Embedding)
		ubinaryVector, err := bson.NewPackedBitVector(ubinaryEmbedding, 0)
		if err != nil {
			log.Fatalf("Error creating PackedBitVector: %v", err)
		}

		document := bson.M{
			"text":               summary,
			"embeddings_float32": floatVector.Binary(),
			"embeddings_int8":    int8Vector.Binary(),
			"embeddings_int1":    ubinaryVector.Binary(),
		}

		documents = append(documents, document)
	}

	return documents
}

// Write JSON file from in-memory BSON documents
func writeJSONToFile(filename string, docs []bson.M) error {
	file, err := os.Create(filename)
	if err != nil {
		return fmt.Errorf("failed to create file: %w", err)
	}
	defer file.Close()

	var jsonDocuments []json.RawMessage
	for _, document := range docs {
		jsonBytes, err := bson.MarshalExtJSON(document, false, false)
		if err != nil {
			log.Fatalf("Error: %v", err)
		}
		jsonDocuments = append(jsonDocuments, jsonBytes)
	}

	jsonData, err := json.MarshalIndent(jsonDocuments, "", "  ")
	if err != nil {
		return fmt.Errorf("failed to marshal JSON: %w", err)
	}

	_, err = file.Write(jsonData)
	if err != nil {
		return fmt.Errorf("failed to write JSON to file: %w", err)
	}

	return nil
}

// Converts slice of interface{} to []float32
func convertInterfaceToFloat32(data []interface{}) []float32 {
	f32s := make([]float32, len(data))
	for i, v := range data {
		f32s[i] = float32(v.(float64))
	}
	return f32s
}

// Converts slice of interface{} to []int8 safely
func convertInterfaceToInt8(data []interface{}) []int8 {
	ints8 := make([]int8, len(data))
	for i, v := range data {
		switch val := v.(type) {
		case float64:
			ints8[i] = int8(val)
		case int:
			ints8[i] = int8(val)
		default:
			log.Fatalf("Unexpected type %T in int8 embedding at index %d", v, i)
		}
	}
	return ints8
}

// Converts slice of interface{} to []byte safely
func convertInterfaceToBytes(data []interface{}) []byte {
	bytes := make([]byte, len(data))
	for i, v := range data {
		switch val := v.(type) {
		case float64:
			bytes[i] = byte(val)
		case int:
			bytes[i] = byte(val)
		default:
			log.Fatalf("Unexpected type %T in ubinary embedding at index %d", v, i)
		}
	}
	return bytes
}
