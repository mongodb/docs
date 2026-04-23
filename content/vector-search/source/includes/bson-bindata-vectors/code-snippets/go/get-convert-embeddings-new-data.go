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
)

// Sample data for embedding
var data = []string{
	"The Great Wall of China is visible from space.",
	"The Eiffel Tower was completed in Paris in 1889.",
	"Mount Everest is the highest peak on Earth at 8,848m.",
	"Shakespeare wrote 37 plays and 154 sonnets during his lifetime.",
	"The Mona Lisa was painted by Leonardo da Vinci.",
}

func main() {
	apiKey := os.Getenv("VOYAGE_API_KEY")
	if apiKey == "" {
		log.Fatal("Ensure VOYAGE_API_KEY is set.")
	}

	model := "voyage-3-large"

	// Generate embeddings for float, int8, and ubinary
	floatEmbeddings, err := fetchEmbeddingsFromVoyage(data, apiKey, model, "float")
	if err != nil {
		log.Fatalf("Error fetching float embeddings: %v", err)
	}

	int8Embeddings, err := fetchEmbeddingsFromVoyage(data, apiKey, model, "int8")
	if err != nil {
		log.Fatalf("Error fetching int8 embeddings: %v", err)
	}

	ubinaryEmbeddings, err := fetchEmbeddingsFromVoyage(data, apiKey, model, "ubinary")
	if err != nil {
		log.Fatalf("Error fetching ubinary embeddings: %v", err)
	}

	// Convert to BSON and store in JSON file
	documents := convertEmbeddingsToBSON(data, floatEmbeddings, int8Embeddings, ubinaryEmbeddings)

	err = writeJSONToFile("embeddings.json", documents)
	if err != nil {
		log.Fatalf("Error writing embeddings to file: %v", err)
	}

	fmt.Println("Embeddings successfully stored in embeddings.json")
}

// Fetch embeddings using Voyage AI REST API
func fetchEmbeddingsFromVoyage(texts []string, apiKey string, model string, outputDType string) ([]map[string]interface{}, error) {
	url := "https://ai.mongodb.com/v1/embeddings"

	// Prepare request body
	requestBody := map[string]interface{}{
		"input":            texts,
		"model":            model,
		"output_dtype":     outputDType,
		"output_dimension": 1024,
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
func convertEmbeddingsToBSON(sentences []string, floatEmbeddings []map[string]interface{}, int8Embeddings []map[string]interface{}, ubinaryEmbeddings []map[string]interface{}) []bson.M {
	var documents []bson.M

	for i, sentence := range sentences {
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
			"text":               sentence,
			"embeddings_float32": floatVector.Binary(),
			"embeddings_int8":    int8Vector.Binary(),
			"embeddings_int1":    ubinaryVector.Binary(),
		}
		documents = append(documents, document)
	}

	return documents
}

// Write JSON file from in-memory BSON documents
func writeJSONToFile(filename string, documents []bson.M) error {
	file, err := os.Create(filename)
	if err != nil {
		return fmt.Errorf("failed to create file: %w", err)
	}
	defer file.Close()

	var jsonData []json.RawMessage
	for _, document := range documents {
		jsonBytes, err := bson.MarshalExtJSON(document, false, false)
		if err != nil {
			return fmt.Errorf("error marshaling BSON to JSON: %w", err)
		}
		jsonData = append(jsonData, jsonBytes)
	}

	marshaledData, err := json.MarshalIndent(jsonData, "", "  ")
	if err != nil {
		return fmt.Errorf("failed to marshal JSON: %w", err)
	}

	_, err = file.Write(marshaledData)
	if err != nil {
		return fmt.Errorf("failed to write JSON to file: %w", err)
	}

	return nil
}

// Convert a slice of interfaces to a slice of float32
func convertInterfaceToFloat32(data []interface{}) []float32 {
	f32s := make([]float32, len(data))
	for i, v := range data {
		f32s[i] = float32(v.(float64))
	}
	return f32s
}

// Convert a slice of interfaces to a slice of int8
func convertInterfaceToInt8(data []interface{}) []int8 {
	ints8 := make([]int8, len(data))
	for i, v := range data {
		switch val := v.(type) {
		case int:
			ints8[i] = int8(val)
		case float64:
			ints8[i] = int8(val)
		default:
			log.Fatalf("Unexpected type %T in int8 embedding at index %d", v, i)
		}
	}
	return ints8
}

// Convert a slice of interfaces to a slice of bytes
func convertInterfaceToBytes(data []interface{}) []byte {
	bytes := make([]byte, len(data))
	for i, v := range data {
		switch val := v.(type) {
		case int:
			bytes[i] = byte(val)
		case float64:
			bytes[i] = byte(val)
		default:
			log.Fatalf("Unexpected type %T in ubinary embedding at index %d", v, i)
		}
	}
	return bytes
}
