package main  
  
import (  
	"context"  
	"encoding/json"  
	"fmt"  
	"log"  
	"os"  
  
	cohere "github.com/cohere-ai/cohere-go/v2"  
	cohereclient "github.com/cohere-ai/cohere-go/v2/client"  
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
	apiKey := os.Getenv("COHERE_API_KEY")  
	if apiKey == "" {  
		log.Fatal("Ensure COHERE_API_KEY is set.")  
	}  
  
	client := cohereclient.NewClient(cohereclient.WithToken(apiKey))  
  
	embeddings, err := fetchEmbeddingsFromCohere(client)  
	if err != nil {  
		log.Fatalf("Error fetching embeddings: %v", err)  
	}  
  
	documents := convertEmbeddingsToBSON(data, embeddings)  
  
	err = writeJSONToFile("embeddings.json", documents)  
	if err != nil {  
		log.Fatalf("Error writing embeddings to file: %v", err)  
	}  
  
	fmt.Println("Embeddings successfully stored in embeddings.json")  
}  
  
// Fetch embeddings using Cohere API  
func fetchEmbeddingsFromCohere(client *cohereclient.Client) (*cohere.EmbedByTypeResponse, error) {  
	model := "embed-english-v3.0"  
	response, err := client.V2.Embed(context.TODO(), &cohere.V2EmbedRequest{  
		Texts:     data,  
		Model:     model,  
		InputType: cohere.EmbedInputTypeSearchDocument,  
		EmbeddingTypes: []cohere.EmbeddingType{  
			cohere.EmbeddingTypeFloat,  
			cohere.EmbeddingTypeInt8,  
			cohere.EmbeddingTypeUbinary,  
		},  
	})  
	if err != nil {  
		return nil, fmt.Errorf("failed to fetch embeddings: %w", err)  
	}  
	return response, nil  
}  
  
// Convert embeddings to BSON binary vectors  
func convertEmbeddingsToBSON(sentences []string, embeddings *cohere.EmbedByTypeResponse) []bson.M {  
	var documents []bson.M  
  
	for i, sentence := range sentences {  
		float32Emb := convertFloat64ToFloat32(embeddings.Embeddings.Float[i])  
		int8Emb := convertIntToInt8(embeddings.Embeddings.Int8[i])  
		ubinaryEmb := convertIntToBytes(embeddings.Embeddings.Ubinary[i])  
  
		floatVector := bson.NewVector(float32Emb)  
		int8Vector := bson.NewVector(int8Emb)  
		ubinaryVector, err := bson.NewPackedBitVector(ubinaryEmb, 0)  
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
  
// Convert a slice of float64 to a slice of float32  
func convertFloat64ToFloat32(f64s []float64) []float32 {  
	f32s := make([]float32, len(f64s))  
	for i, v := range f64s {  
		f32s[i] = float32(v)  
	}  
	return f32s  
}  
  
// Convert a slice of int to a slice of int8  
func convertIntToInt8(ints []int) []int8 {  
	ints8 := make([]int8, len(ints))  
	for i, val := range ints {  
		ints8[i] = int8(val)  
	}  
	return ints8  
}  
  
// Convert a slice of int to a slice of bytes  
func convertIntToBytes(ints []int) []byte {  
	bytes := make([]byte, len(ints))  
	for i, val := range ints {  
		bytes[i] = byte(val)  
	}  
	return bytes  
}  
