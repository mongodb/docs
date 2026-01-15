package common

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"
)

var apiKey = os.Getenv("VOYAGE_API_KEY")

// Fetch embeddings using Voyage AI REST API
func GetEmbeddings(docs []string) [][]float32 {
	if apiKey == "" {
		log.Fatalf("VOYAGE_API_KEY environment variable is not set")
		return nil
	}

	url := "https://ai.mongodb.com/v1/embeddings"

	// Prepare request body according to the API specification
	requestBody := map[string]interface{}{
		"input":            docs,
		"model":            "voyage-3-large",
		"output_dimension": 1024,
	}

	requestBytes, err := json.Marshal(requestBody)
	if err != nil {
		log.Fatalf("failed to marshal request body: %v", err)
		return nil
	}

	// Create context with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	req, err := http.NewRequestWithContext(ctx, "POST", url, bytes.NewBuffer(requestBytes))
	if err != nil {
		log.Fatalf("failed to create HTTP request: %v", err)
		return nil
	}

	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", apiKey))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatalf("failed to make API request: %v", err)
		return nil
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := ioutil.ReadAll(resp.Body)
		log.Fatalf("unexpected status code %d: %s", resp.StatusCode, string(body))
		return nil
	}

	// Response structure according to the API specification
	var response struct {
		Object string `json:"object"`
		Data   []struct {
			Object    string    `json:"object"`
			Embedding []float32 `json:"embedding"`
			Index     int       `json:"index"`
		} `json:"data"`
		Model string `json:"model"`
		Usage struct {
			TotalTokens int `json:"total_tokens"`
		} `json:"usage"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		log.Fatalf("failed to parse API response: %v", err)
		return nil
	}

	// Extract embeddings from the response
	embeddings := make([][]float32, len(response.Data))
	for i, item := range response.Data {
		embeddings[i] = item.Embedding
	}

	return embeddings
}
